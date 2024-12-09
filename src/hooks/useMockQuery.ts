import { useCallback, useEffect, useState } from "react";

interface UseMockQueryOptions {
  delay?: number; // Delay in milliseconds before returning the data
  error?: { message: string } | null; // Simulate an error
}

interface UseMockQueryResult<T> {
  data: T | null;
  loading: boolean;
  error?: { message: string } | null;
  refetch: () => void;
}

/**
 * Only for usage in development. This hook simulates a query with a delay before returning the data.
 * @param mockData
 * @param options
 * @returns mockData after a delay
 */
export function useMockQuery<T>(
  mockData: T,
  options?: UseMockQueryOptions
): UseMockQueryResult<T> {
  const { delay = 1500, error } = options ?? {};
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    setData(null);
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [mockData, delay]);

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}
