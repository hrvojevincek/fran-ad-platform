// src/components/Dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchMetrics } from "@/hooks/useFetchMetrics";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Header from "../components/Header";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchOvertime } from "@/hooks/useFetchOvertime";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { formatMetricName } from "@/utils/formatNames";

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedMetric, setSelectedMetric] = useState<string>("all");

  const { data: metrics, isLoading, error } = useFetchMetrics();

  const {
    data: overTime,
    isLoading: isLoadingData,
    error: errorData,
  } = useFetchOvertime();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6 grid">
        <h1 className="text-2xl font-bold">Summary Metrics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-1">
                Impressions
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="size-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    The total number of times an ad was shown to users today.
                    This metric helps gauge the reach and visibility of your
                    ads.
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {metrics?.dailyImpressions.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-1">
                Ad Requests
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="size-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    The number of times an ad request was made to the ad
                    network. This metric indicates how many times users have
                    interacted with your ads.
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {metrics?.ad_requests.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-1">
                Revenue
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="size-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    The total earnings generated from ad impressions today. This
                    reflects the revenue from displayed ads, providing a clear
                    view of ad monetization performance.
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${metrics?.revenue.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
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
                    <DropdownMenuTrigger>
                      <Button
                        variant={"outline"}
                        className="text-right ml-auto"
                      >
                        {formatMetricName(selectedMetric)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => setSelectedMetric("all")}
                      >
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
                  data={overTime}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
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
                  {(selectedMetric === "all" ||
                    selectedMetric === "revenue") && (
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
      </main>
    </div>
  );
}
