"use client";

import * as React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface CalendarEvent {
  id: string;
  title: string;
  start_date: Date;
  end_date: Date;
  color?: string;
  all_day?: boolean;
}

export interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  selectedDate?: Date;
  className?: string;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ events = [], onDateClick, onEventClick, selectedDate, className }, ref) => {
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    });

    const navigateToPreviousMonth = () => {
      setCurrentDate(subMonths(currentDate, 1));
    };

    const navigateToNextMonth = () => {
      setCurrentDate(addMonths(currentDate, 1));
    };

    const getEventsForDate = (date: Date) => {
      return events.filter(event => {
        if (event.all_day) {
          return isSameDay(date, event.start_date);
        }
        return (
          isSameDay(date, event.start_date) ||
          (date >= event.start_date && date <= event.end_date)
        );
      });
    };

    return (
      <div ref={ref} className={cn("p-4", className)}>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={navigateToPreviousMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={navigateToNextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isDayToday = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[100px] p-1 border border-gray-700 cursor-pointer transition-colors",
                  {
                    "bg-gray-900": isCurrentMonth,
                    "bg-gray-800": !isCurrentMonth,
                    "bg-blue-900/50": isSelected,
                    "hover:bg-gray-700": isCurrentMonth,
                    "hover:bg-gray-600": !isCurrentMonth,
                  }
                )}
                onClick={() => onDateClick?.(day)}
              >
                <div
                  className={cn(
                    "text-sm font-medium mb-1",
                    {
                      "text-white": isCurrentMonth,
                      "text-gray-500": !isCurrentMonth,
                      "text-blue-400": isDayToday,
                    }
                  )}
                >
                  {format(day, "d")}
                </div>

                {/* Events for this day */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs p-1 rounded text-white cursor-pointer truncate",
                        "hover:opacity-80 transition-opacity"
                      )}
                      style={{ backgroundColor: event.color || "#3B82F6" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-400 p-1">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar };