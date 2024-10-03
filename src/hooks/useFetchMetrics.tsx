import { useState, useEffect } from "react";

interface Metrics {
  dailyImpressions: number;
  ad_requests: number;
  revenue: number;
}

export function useFetchMetrics() {
  const [data, setData] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("http://localhost:4000/metrics");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { data, isLoading, error };
}
