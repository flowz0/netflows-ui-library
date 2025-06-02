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
        className={`px-2 py-1 rounded transition
          ${index === selectedMonthIndex
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100"}`}
      >
        {month}
      </button>
    ))}
  </div>
);
