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
    return "light"; // Default: light theme as specified in PLAN-01 and TASK-01
  });

  const [a11yContrast, setA11yContrastState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_contrast") || localStorage.getItem("a11y_contrast");
      return saved === "high" || saved === "high-contrast";
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
    const targetScheme = resolvedTheme === "dark" ? "only dark" : "only light";
    root.style.colorScheme = targetScheme;

    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute("content", targetScheme);
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", resolvedTheme === "dark" ? "#111113" : "#ffffff");
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
    setThemeState((currentTheme) => {
      const active = currentTheme === "system" ? getSystemTheme() : currentTheme;
      const nextTheme: Theme = active === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("user_theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
      }
      return nextTheme;
    });
  }, []);

  const toggleA11yContrast = useCallback(() => {
    setA11yContrastState((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        if (next) {
          localStorage.setItem("user_contrast", "high");
          localStorage.setItem("a11y_contrast", "high-contrast");
        } else {
          localStorage.setItem("user_contrast", "standard");
          localStorage.removeItem("a11y_contrast");
        }
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
