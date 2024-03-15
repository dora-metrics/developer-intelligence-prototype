"use client"

import { useState, useEffect } from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import 'react-day-picker/dist/style.css';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

export function getDaysBetweenDates(dateRange) {
  console.log('DateRange value in getDaysBetweenDates', dateRange)
  let differenceInMs = 0;

  if (dateRange?.from) {
    if (dateRange.to instanceof Date) {
      differenceInMs = dateRange.to.getTime() - dateRange.from.getTime();
    }
  }

  return convertMsToDays(differenceInMs + 1);
}

function convertMsToDays(ms) {
  const msInOneSecond = 1000
  const secondsInOneMinute = 60
  const minutesInOneHour = 60
  const hoursInOneDay = 24

  const minutesInOneDay = hoursInOneDay * minutesInOneHour
  const secondsInOneDay = secondsInOneMinute * minutesInOneDay
  const msInOneDay = msInOneSecond * secondsInOneDay

  return Math.ceil(ms / msInOneDay)
}

function isComplete(date) {
  if (date?.from) {
    if (date.to) {
      console.log("Date is complete")
      return true
    }
  }
  console.log("Date is not complete")
  return false
}

export function DateRangeSelector({activeDateRange, setActiveDateRange}) {

  const [dateRange, setDateRange] = useState(() => activeDateRange || null);

  // when dateRange is updated, cache it in the browser so that the selected range survives a restart
  useEffect(() => {
    if (dateRange && typeof window !== 'undefined') {
      localStorage.setItem('dateRange', JSON.stringify(dateRange));
    }
  }, [dateRange]); // Removed setDateRange from the dependency array

  useEffect(() => {
    console.log('Date range value after update:', dateRange);
  }, [dateRange]);

  // This handler will prevent errors when only 'to' or 'from' are selected
  const handleApplyClick = function () {
    if (isComplete(dateRange) && isValidDateRange(dateRange)) { // Add isValidDateRange check
      console.log("Handle Apply Click", dateRange)
      // Set "to" date to end of day (23:59:59,999) instead of start
      dateRange.to.setHours(23, 59, 59, 999)
      setActiveDateRange(dateRange);
    }
  };
  
  // Function to check if the date range is valid
  const isValidDateRange = (dateRange) => {
    if (dateRange?.from && dateRange?.to) {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      return fromDate < toDate;
    }
    return false;
  };

  return (
    <div className="flex items-center gap-4">
      {/* <Badge variant="outline">Custom</Badge> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal rounded-full", !dateRange && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {/* {footer} */}
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(new Date(dateRange.from), "LLL dd, y")} -{" "}
                  {format(new Date(dateRange.to), "LLL dd, y")}
                </>
              ) : (
                format(new Date(dateRange.from), "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mr-16 rounded-2xl" align="start">

          <div className="flex">
            {/* <div className="flex flex-col gap-2 p-4">
              <Button className="rounded-full" variant="ghost" size="sm">Today</Button>
              <Button className="rounded-full" variant="ghost" size="sm">Yesterday</Button>
              <Button className="rounded-full" variant="ghost" size="sm">This week</Button>
              <Button className="rounded-full" variant="ghost" size="sm">Last week</Button>
              <Button className="rounded-full" variant="ghost" size="sm">Last 7 days</Button>
              <Button className="rounded-full" variant="ghost" size="sm">Last 28 days</Button>
              <Button className="rounded-full" variant="ghost" size="sm">Last 30 days</Button>
              <Button className="rounded-full" variant="ghost" size="sm">Last 90 days</Button>
              <Button className="rounded-full" variant="ghost" size="sm">Last 12 months</Button>
              <Button className="rounded-full" variant="secondary" size="sm">Custom</Button>
            </div> */}
            <Calendar initialFocus mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={setDateRange} numberOfMonths={1} min={2} />
          </div>
          <div className="flex items-center justify-between p-4 mx-4 border-t">
            <div className="text-sm"><strong className="font-semibold">Range:</strong> {getDaysBetweenDates(dateRange)} days</div>
            <div className="flex items-center gap-2">
              <Button className="rounded-full" variant="secondary">Cancel</Button>
              <Button className="rounded-full" onClick={handleApplyClick}>Apply</Button>
            </div>
          </div>

        </PopoverContent>
      </Popover>
    </div>
  )
}
