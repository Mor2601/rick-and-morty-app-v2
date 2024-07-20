import { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { PaginationResponse, Location, Character, Episode } from '../types';

interface UseFetchResult<T> {
  data: PaginationResponse<T> | null;
  error: string | null;
  loading: boolean;
}

const useFetch = <T extends Location[] | Character[] | Episode[]>(request: string, query: string): UseFetchResult<T> => {
  const [data, setData] = useState<PaginationResponse<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData(request, query);
        console.log('result:', result);
        setData(result as PaginationResponse<T>);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [request, query]);

  return { data, error, loading };
};

export default useFetch;
