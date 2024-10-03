import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface DateRangePickerProps {
  dateRange: string;
  setDateRange: (range: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  setDateRange,
}) => {
  const options = [
    { value: "overall", label: "All Data" },
    { value: "last3days", label: "Last 3 Days" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "lastMonth", label: "Last Month" },
  ];

  const selectedOption =
    options.find((option) => option.value === dateRange) || options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedOption.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setDateRange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateRangePicker;
