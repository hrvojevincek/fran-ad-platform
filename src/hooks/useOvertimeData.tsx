import { useState, useEffect } from "react";

interface OverTimeData {
  date: string;
  impressions: number;
  ad_requests: number;
  revenue: number;
}

export function useFetchOvertime() {
  const [data, setData] = useState<OverTimeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOvertime = async () => {
      try {
        const response = await fetch("http://localhost:4000/overTime");
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

    fetchOvertime();
  }, []);

  return { data, isLoading, error };
}
