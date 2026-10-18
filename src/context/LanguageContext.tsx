import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import esData from "../i18n/es.json";
import enData from "../i18n/en.json";
import vaData from "../i18n/va.json";

export type Language = "es" | "en" | "va";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tArray: (key: string) => string[];
  languages: { code: Language; label: string; flag: string }[];
}

const translations: Record<Language, any> = {
  es: esData,
  en: enData,
  va: vaData,
};

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "es", label: "Castellano", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "va", label: "Valencià", flag: "🦇" },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return typeof current === "string" ? current : undefined;
}

function getNestedArray(obj: any, path: string): string[] | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return Array.isArray(current) ? current : undefined;
}

export function resolveInitialLanguage(): Language {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("user_lang") as Language | null;
    if (saved && (saved === "es" || saved === "en" || saved === "va")) {
      return saved;
    }
    const navLang = (navigator.language || (navigator.languages && navigator.languages[0]) || "").toLowerCase();
    if (navLang.startsWith("es")) return "es";
    if (navLang.startsWith("ca") || navLang.startsWith("va")) return "va";
    return "en";
  }
  return "es";
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(resolveInitialLanguage);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_lang", newLang);
      document.documentElement.lang = newLang === "va" ? "ca-ES" : newLang;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language === "va" ? "ca-ES" : language;
    }
  }, [language]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let value = getNestedValue(translations[language], key);
      // Fallback to Spanish if translation is missing in the current language
      if (!value && language !== "es") {
        value = getNestedValue(translations.es, key);
      }
      // Fallback to English if still missing
      if (!value && language !== "en") {
        value = getNestedValue(translations.en, key);
      }
      if (!value) {
        return key;
      }

      if (params) {
        let interpolated = value;
        for (const [paramKey, paramVal] of Object.entries(params)) {
          interpolated = interpolated.replace(
            new RegExp(`{{${paramKey}}}|{${paramKey}}`, "g"),
            String(paramVal)
          );
        }
        return interpolated;
      }

      return value;
    },
    [language]
  );

  const tArray = useCallback(
    (key: string): string[] => {
      let arr = getNestedArray(translations[language], key);
      if (!arr && language !== "es") {
        arr = getNestedArray(translations.es, key);
      }
      if (!arr && language !== "en") {
        arr = getNestedArray(translations.en, key);
      }
      return arr || [];
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        tArray,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
