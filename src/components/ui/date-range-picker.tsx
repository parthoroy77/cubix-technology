"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const DateRangePicker = ({ className, onChange }: { className?: ClassValue; onChange: (date: DateRange) => void }) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "h-8 w-fit max-w-2xs justify-start text-center text-sm font-medium shadow-none",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
