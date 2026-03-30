type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  showValue?: boolean;
  id?: string;
};

export function Slider({
  value,
  onChange,
  min = 1,
  max = 5,
  step = 1,
  leftLabel,
  rightLabel,
  showValue = true,
  id,
}: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 cursor-pointer"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        {showValue && (
          <span className="text-cafe-700 dark:text-cafe-300 font-bold text-lg min-w-[2ch] text-center">
            {value}
          </span>
        )}
      </div>
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-stone-500 dark:text-dark-text-muted">{leftLabel}</span>
          <span className="text-xs text-stone-500 dark:text-dark-text-muted">{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
