import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { formatMetricName } from "@/utils/formatNames";

const SelectGraphButton = ({
  selectedMetric,
  setSelectedMetric,
}: {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
}) => {
  return (
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
          <DropdownMenuItem onSelect={() => setSelectedMetric("impressions")}>
            Impressions
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSelectedMetric("ad_requests")}>
            Ad Requests
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSelectedMetric("revenue")}>
            Revenue
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectGraphButton;
