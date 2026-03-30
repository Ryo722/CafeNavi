import { useContext } from "react";
import { LocaleContext } from "./context";
import type { LocaleContextValue } from "./context";

export function useTranslation(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LocaleProvider");
  }
  return ctx;
}
