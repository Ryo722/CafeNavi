import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Locale, Translations } from "./types";
import { ja } from "./ja";
import { en } from "./en";

const STORAGE_KEY = "cafenavi_locale";

const translations: Record<Locale, Translations> = { ja, en };

function detectDefaultLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ja" || stored === "en") return stored;
  } catch {
    // localStorage unavailable
  }

  const browserLang = navigator.language;
  if (browserLang.startsWith("ja")) return "ja";
  return "en";
}

function interpolate(
  template: string,
  params?: Record<string, string>,
): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? _);
}

export type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectDefaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
  }, []);

  // Update document lang attribute
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      const value = translations[locale][key];
      if (typeof value === "string") return interpolate(value, params);
      // Fallback to ja, then to key itself
      const fallback = translations.ja[key];
      if (typeof fallback === "string") return interpolate(fallback, params);
      return key;
    },
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}
