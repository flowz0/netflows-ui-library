"use client";

import { useRef, useEffect } from "react";
import { useDatePicker } from "./useDatePicker";
import { MonthSelector } from "./MonthSelector";
import { YearSelector } from "./YearSelector";
import { format, isToday, isSameMonth, isSameDay } from "date-fns";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

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
    <div ref={datePickerRef} className="bg-neutral-800 rounded-lg py-5 px-4 max-w-80 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth}>
          <FaArrowLeft className="text-neutral-300 w-4 h-4 cursor-pointer transition-colors duration-300 ease-in-out hover:text-neutral-100" />
        </button>
        <div className="flex gap-1">
          <button
            onClick={() => {
              setShowMonthSelector((prev) => !prev);
              setShowYearSelector(false);
            }}
            className="bg-neutral-700 text-neutral-200 rounded-lg px-2 py-1 font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-neutral-600"
          >
            {showMonthSelector ? <IoIosClose className="w-6 h-6" /> : format(currentMonth, "MMMM")}
          </button>
          <button
            onClick={() => {
              setShowYearSelector((prev) => !prev);
              setShowMonthSelector(false);
            }}
            className="bg-neutral-700 text-neutral-200 rounded-lg px-2 py-1 font-semibold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-neutral-600"
          >
            {showYearSelector ? <IoIosClose className="w-6 h-6" /> : format(currentMonth, "yyyy")}
          </button>
        </div>
        <button onClick={nextMonth}>
          <FaArrowRight className="text-neutral-300 w-4 h-4 cursor-pointer transition-colors duration-300 ease-in-out hover:text-neutral-100" />
        </button>
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
          <div className="grid grid-cols-7 gap-2 text-center font-semibold text-sm text-neutral-200 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {calendarDays.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => selectDate(day)}
                  className={`p-2 rounded-full transition cursor-pointer 
                    ${isToday(day) ? "bg-neutral-100 text-neutral-900" : ""}
                    ${selectedDate && isSameDay(day, selectedDate)
                      ? "bg-neutral-500 text-neutral-100"
                      : "hover:bg-neutral-700"}
                    ${!isCurrentMonth ? "text-neutral-600" : "text-neutral-100"}
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
        <p className="mt-6 text-center text-sm text-neutral-500">
          Selected: {format(selectedDate, "PPP")}
        </p>
      )}
    </div>
  );
};
