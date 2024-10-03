import { Line, ResponsiveContainer } from "recharts";

import { formatMetricName } from "@/utils/formatNames";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  CartesianGrid,
  Legend,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState } from "react";

interface OverTimeData {
  date: string;
  impressions: number;
  ad_requests: number;
  revenue: number;
}

const Graph = ({ overTime }: { overTime: OverTimeData[] | null }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>("all");

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Performance Over Time</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Overall Graph</div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className="text-right ml-auto">
                    {formatMetricName(selectedMetric)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setSelectedMetric("all")}>
                    All Metrics
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelectedMetric("impressions")}
                  >
                    Impressions
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelectedMetric("ad_requests")}
                  >
                    Ad Requests
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelectedMetric("revenue")}
                  >
                    Revenue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart
              data={overTime || []}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Graph;
