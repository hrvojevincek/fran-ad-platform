import { useFetchOvertime } from "@/hooks/useFetchOvertime";
import { getFilteredData, sortOverTimeData } from "@/utils/graphUtils";
import { useMemo, useState } from "react";
import { Loader } from "lucide-react"; // Make sure to import the Loader
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DateRangePicker from "./DateRangePicker";
import SelectGraphButton from "./SelectGraphButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Graph = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("overall");

  const { data: overTime, isLoading, error } = useFetchOvertime();

  const sortedOverTime = sortOverTimeData(overTime || []);
  const filteredData = useMemo(
    () => getFilteredData(sortedOverTime, dateRange),
    [sortedOverTime, dateRange]
  );

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Performance Over Time</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Overall Graph</div>
            <div className="flex space-x-2">
              <DateRangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <SelectGraphButton
                selectedMetric={selectedMetric}
                setSelectedMetric={setSelectedMetric}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[450px] flex items-center justify-center">
              <Loader className="animate-spin size-6 text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="h-[450px] flex items-center justify-center">
              <p className="text-xl text-red-500">Error loading graph data</p>
            </div>
          ) : filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={450}>
              <LineChart
                data={filteredData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {(selectedMetric === "all" ||
                  selectedMetric === "impressions") && (
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#8884d8"
                    name="Impressions"
                  />
                )}
                {(selectedMetric === "all" ||
                  selectedMetric === "ad_requests") && (
                  <Line
                    type="monotone"
                    dataKey="ad_requests"
                    stroke="#82ca9d"
                    name="Ad Requests"
                  />
                )}
                {(selectedMetric === "all" || selectedMetric === "revenue") && (
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ffc658"
                    name="Revenue"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-[450px]">
              <p className="text-xl text-gray-500">
                No data available for the selected date range
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Graph;
