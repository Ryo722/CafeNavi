import { useTranslation } from "../../lib/i18n";

export function LocaleToggle() {
  const { locale, setLocale, t } = useTranslation();

  const toggleLocale = () => {
    setLocale(locale === "ja" ? "en" : "ja");
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="px-2 py-1 text-xs font-medium rounded-md bg-cafe-700 text-cafe-100 hover:bg-cafe-600 transition-colors cursor-pointer"
      aria-label={t("locale.switchTo")}
    >
      {locale === "ja" ? "EN" : "JA"}
    </button>
  );
}
