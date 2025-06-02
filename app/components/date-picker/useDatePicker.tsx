import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  subMonths,
  addMonths,
  setMonth,
  setYear,
} from "date-fns";

export const useDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const prevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const nextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  const selectDate = (date: Date) => setSelectedDate(date);

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth((prev) => setMonth(prev, monthIndex));
    setShowMonthSelector(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth((prev) => setYear(prev, year));
    setShowYearSelector(false);
  };

  return {
    selectedDate,
    currentMonth,
    showMonthSelector,
    showYearSelector,
    calendarDays,
    prevMonth,
    nextMonth,
    selectDate,
    handleMonthSelect,
    handleYearSelect,
    setShowMonthSelector,
    setShowYearSelector,
  };
};
