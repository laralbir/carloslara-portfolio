import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light" | "system";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  a11yContrast: boolean;
  toggleA11yContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): "dark" | "light" {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = (localStorage.getItem("user_theme") || localStorage.getItem("theme")) as Theme | null;
      if (saved && (saved === "dark" || saved === "light" || saved === "system")) {
        return saved;
      }
    }
    return "dark"; // Default to dark for cosmic developer portfolio
  });

  const [a11yContrast, setA11yContrastState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_contrast") === "high";
    }
    return false;
  });

  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(getSystemTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    }

    if (a11yContrast) {
      root.setAttribute("data-a11y", "high-contrast");
      root.classList.add("a11y-contrast");
    } else {
      root.removeAttribute("data-a11y");
      root.classList.remove("a11y-contrast");
    }
  }, [resolvedTheme, a11yContrast]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const toggleA11yContrast = useCallback(() => {
    setA11yContrastState((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("user_contrast", next ? "high" : "standard");
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        a11yContrast,
        toggleA11yContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
