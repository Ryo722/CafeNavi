type Option = {
  value: string;
  label: string;
};

type SceneSelectorProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function SceneSelector({
  options,
  selected,
  onChange,
}: SceneSelectorProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3" role="group" aria-label="Select options">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={`
              p-4 rounded-xl text-sm font-medium text-left
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
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
