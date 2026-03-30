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
  "aria-label"?: string;
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
  "aria-label": ariaLabel,
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
          className="flex-1 h-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-cafe-400 focus-visible:ring-offset-2 focus-visible:outline-none rounded-full"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={ariaLabel}
        />
        {showValue && (
          <span className="text-cafe-700 font-bold text-lg min-w-[2ch] text-center">
            {value}
          </span>
        )}
      </div>
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-stone-500">{leftLabel}</span>
          <span className="text-xs text-stone-500">{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
