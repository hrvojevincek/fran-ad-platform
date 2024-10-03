export const formatMetricName = (metric: string) => {
  if (metric === "all") return "All Metrics";
  return metric
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
