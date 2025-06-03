import { useEffect, useRef } from "react";

type Props = {
  onSelect: (year: number) => void;
  selectedYear: number;
};

export const YearSelector = ({ onSelect, selectedYear }: Props) => {
  const years = Array.from({ length: 201 }, (_, i) => i + 1900);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(
        `[data-year="${selectedYear}"]`
      );
      if (selectedEl) {
        (selectedEl as HTMLButtonElement).scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }
    }
  }, [selectedYear]);

  return (
    <div
      ref={listRef}
      className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto text-sm"
    >
      {years.map((year) => (
        <button
          key={year}
          data-year={year}
          onClick={() => onSelect(year)}
          className={`px-2 py-2 rounded text-center transition cursor-pointer
            ${year === selectedYear
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100"}`}
        >
          {year}
        </button>
      ))}
    </div>
  );
};
