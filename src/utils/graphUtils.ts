export interface OverTimeData {
  date: string;
  impressions: number;
  ad_requests: number;
  revenue: number;
}

export const sortOverTimeData = (
  overTime: OverTimeData[] | null
): OverTimeData[] => {
  return (
    overTime?.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ) || []
  );
};

export const getFilteredData = (
  sortedOverTime: OverTimeData[],
  dateRange: string
): OverTimeData[] => {
  if (!sortedOverTime.length) return [];

  // If dateRange is "overall", return all data
  if (dateRange === "overall") return sortedOverTime;

  const now = new Date();
  const filterDate = new Date();

  switch (dateRange) {
    case "last3days":
      filterDate.setDate(now.getDate() - 3);
      break;
    case "last7days":
      filterDate.setDate(now.getDate() - 7);
      break;
    case "lastMonth":
      filterDate.setMonth(now.getMonth() - 1);
      break;
    default:
      return sortedOverTime; // This will catch "overall" and any unexpected values
  }

  const filteredData = sortedOverTime.filter((item) => {
    const itemDate = new Date(item.date);
    if (isNaN(itemDate.getTime())) {
      const [day, month, year] = item.date.split("-");
      const formattedDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      return formattedDate >= filterDate;
    }
    return itemDate >= filterDate;
  });

  return filteredData;
};
