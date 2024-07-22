import { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { PaginationResponse, Location, Character, Episode } from '../types';
import { isValidUrl } from '../types/typeGuards';
interface UseFetchResult<T> {
  data: PaginationResponse<T> | null;
  error: string | null;
  loading: boolean;
}
/**
 * generic custom hook for fetching the data for the location
 * or characters or epispode it return response that contain the result and 
 * pagination information
 * @param request 
 * @returns {Location[] | Character[] | Episode[]} - Array of location, character, or episode objects.
 */
const useFetch = <T extends Location[] | Character[] | Episode[]>(request: string): UseFetchResult<T> => {
  const [data, setData] = useState<PaginationResponse<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(isValidUrl(request)){
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData(request);
        
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
  }
  }, [request]);

  return { data, error, loading };
};

export default useFetch;
