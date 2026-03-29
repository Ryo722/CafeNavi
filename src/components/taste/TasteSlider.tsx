import { Slider } from "../ui/Slider";

type TasteSliderProps = {
  questionId: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
  description?: string;
};

export function TasteSlider({
  questionId,
  value,
  onChange,
  leftLabel,
  rightLabel,
  description,
}: TasteSliderProps) {
  return (
    <div className="space-y-3">
      {description && (
        <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
      )}
      <Slider
        id={questionId}
        value={value}
        onChange={onChange}
        min={1}
        max={5}
        step={1}
        leftLabel={leftLabel}
        rightLabel={rightLabel}
      />
    </div>
  );
}
