import { useTheme } from "../../lib/useTheme";

const themeOrder = ["system", "light", "dark"] as const;
type Theme = (typeof themeOrder)[number];

const themeIcons: Record<Theme, string> = {
  light: "\u2600\uFE0F",
  dark: "\uD83C\uDF19",
  system: "\uD83D\uDCBB",
};

const themeLabels: Record<Theme, string> = {
  light: "ライトモード",
  dark: "ダークモード",
  system: "システム設定に従う",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-cafe-700 transition-colors text-lg leading-none cursor-pointer"
      aria-label={`テーマ切替: 現在${themeLabels[theme]}`}
      title={themeLabels[theme]}
    >
      <span aria-hidden="true">{themeIcons[theme]}</span>
    </button>
  );
}
