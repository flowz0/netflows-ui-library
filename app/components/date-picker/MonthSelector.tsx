type Props = {
  onSelect: (monthIndex: number) => void;
  selectedMonthIndex: number;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MonthSelector = ({ onSelect, selectedMonthIndex }: Props) => (
  <div className="grid grid-cols-3 gap-2 text-sm">
    {months.map((month, index) => (
      <button
        key={month}
        onClick={() => onSelect(index)}
        className={`px-2 py-2 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer
          ${index === selectedMonthIndex
            ? "bg-neutral-100 text-neutral-900"
            : "text-neutral-200 hover:bg-neutral-700"}`}
      >
        {month}
      </button>
    ))}
  </div>
);
