import { useState, useEffect } from 'react';
import { fetchMultipleData } from '../services/api';
import { Location, Character, Episode } from '../types';
import { isValidUrl } from '../types/typeGuards';
interface UseFetchMultipleResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
/**
 * generic custom hook for fetching data for multiple location or characters or episode
 *  
 * @param request 
 * @returns {Location[] | Character[] | Episode[]} - Array of location, character, or episode objects.
 */
const useFetchMultiple = <T extends Location[] | Character[] | Episode[]>(request: string): UseFetchMultipleResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(isValidUrl(request)){
    const fetchDataAsync = async () => {
      try {
        const result = await fetchMultipleData(request);
        setData(result as T);
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

export default useFetchMultiple;
