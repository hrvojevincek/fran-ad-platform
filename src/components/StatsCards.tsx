import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useFetchMetrics } from "@/hooks/useFetchMetrics";
import { Loader } from "lucide-react";

const StatsCards = () => {
  const { data: metrics, isLoading, error } = useFetchMetrics();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Summary Metrics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-1">
              Impressions
              <Tooltip>
                <TooltipTrigger>
                  <InfoCircledIcon className="size-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  The total number of times an ad was shown to users today. This
                  metric helps gauge the reach and visibility of your ads.
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader className="animate-spin size-6 text-muted-foreground" />
              </div>
            ) : (
              <p className="text-3xl font-bold">
                {metrics?.dailyImpressions.toLocaleString()}
              </p>
            )}
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
                  The number of times an ad request was made to the ad network.
                  This metric indicates how many times users have interacted
                  with your ads.
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader className="animate-spin size-6 text-muted-foreground" />
              </div>
            ) : (
              <p className="text-3xl font-bold">
                {metrics?.ad_requests.toLocaleString()}
              </p>
            )}
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
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader className="animate-spin size-6 text-muted-foreground" />
              </div>
            ) : (
              <p className="text-3xl font-bold">
                ${metrics?.revenue.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsCards;
