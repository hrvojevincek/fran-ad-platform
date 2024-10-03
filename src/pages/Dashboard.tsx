// src/components/Dashboard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useFetchMetrics } from "@/hooks/useFetchMetrics";
import Header from "../components/Header";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const { data: metrics, isLoading, error } = useFetchMetrics();

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                Impressions
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    The total number of times an ad was shown to users today.
                    This metric helps gauge the reach and visibility of your
                    ads.
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>HOLA</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {metrics?.dailyImpressions.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                Ad Requests
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    The number of times an ad request was made to the ad
                    network. This metric indicates how many times users have
                    interacted with your ads.
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>HOLA</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {metrics?.ad_requests.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1">
                Revenue
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    The total earnings generated from ad impressions today. This
                    reflects the revenue from displayed ads, providing a clear
                    view of ad monetization performance.
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>HOLA</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${metrics?.revenue.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Overall Graph</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
