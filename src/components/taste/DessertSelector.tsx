type Option = {
  value: string;
  label: string;
};

type DessertSelectorProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function DessertSelector({
  options,
  selected,
  onChange,
}: DessertSelectorProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={`
              p-3 rounded-xl text-sm font-medium text-left
              transition-all duration-200 cursor-pointer
              border-2
              ${
                isSelected
                  ? "border-cafe-500 bg-cafe-50 text-cafe-800 shadow-sm"
                  : "border-cafe-100 bg-white text-stone-600 hover:border-cafe-300 hover:bg-cafe-50"
              }
            `}
            aria-pressed={isSelected}
          >
            <span className="block">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
