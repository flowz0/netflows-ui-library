"use client";

import { useRef, useEffect } from "react";
import { useDatePicker } from "./useDatePicker";
import { MonthSelector } from "./MonthSelector";
import { YearSelector } from "./YearSelector";
import { format, isToday, isSameMonth, isSameDay } from "date-fns";

export const DatePicker = () => {
  const {
    selectedDate,
    currentMonth,
    showMonthSelector,
    showYearSelector,
    setShowMonthSelector,
    setShowYearSelector,
    calendarDays,
    prevMonth,
    nextMonth,
    selectDate,
    handleMonthSelect,
    handleYearSelect,
  } = useDatePicker();

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowMonthSelector(false);
        setShowYearSelector(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMonthSelector(false);
        setShowYearSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowMonthSelector, setShowYearSelector]);

  return (
    <div ref={datePickerRef} className="w-80 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth}>&lt;</button>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowMonthSelector((prev) => !prev);
              setShowYearSelector(false);
            }}
            className="font-semibold"
          >
            {format(currentMonth, "MMMM")}
          </button>
          <button
            onClick={() => {
              setShowYearSelector((prev) => !prev);
              setShowMonthSelector(false);
            }}
            className="font-semibold"
          >
            {format(currentMonth, "yyyy")}
          </button>
        </div>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      {showMonthSelector ? (
        <MonthSelector
          onSelect={handleMonthSelect}
          selectedMonthIndex={currentMonth.getMonth()}
        />
      ) : showYearSelector ? (
        <YearSelector
          onSelect={handleYearSelect}
          selectedYear={currentMonth.getFullYear()}
        />
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm text-gray-700 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {calendarDays.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => selectDate(day)}
                  className={`p-1 rounded-full transition 
                    ${isToday(day) ? "bg-blue-100" : ""}
                    ${selectedDate && isSameDay(day, selectedDate)
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-200"}
                    ${!isCurrentMonth ? "text-gray-400" : ""}
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </>
      )}

      {selectedDate && (
        <p className="mt-4 text-center text-sm text-gray-600">
          Selected: {format(selectedDate, "PPP")}
        </p>
      )}
    </div>
  );
};
