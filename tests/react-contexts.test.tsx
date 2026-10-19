import { describe, it, expect, beforeEach } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider, useLanguage } from "../src/context/LanguageContext";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";

describe("React Contexts: Language & Theme", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-a11y");
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  it("LanguageProvider provides translations and updates language", async () => {
    localStorage.setItem("user_lang", "es");
    let contextValue: any = null;

    const TestComponent = () => {
      contextValue = useLanguage();
      return <div>{contextValue.t("hero.titleHighlight")}</div>;
    };

    const root = createRoot(container);
    await act(async () => {
      root.render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );
    });

    expect(contextValue.language).toBe("es");
    expect(contextValue.t("hero.titleHighlight")).toBe("Agentic Engineer");
    expect(document.documentElement.lang).toBe("es");

    // Change language to English
    await act(async () => {
      contextValue.setLanguage("en");
    });

    expect(contextValue.language).toBe("en");
    expect(localStorage.getItem("user_lang")).toBe("en");
    expect(document.documentElement.lang).toBe("en");

    // Change language to Valencian
    await act(async () => {
      contextValue.setLanguage("va");
    });

    expect(contextValue.language).toBe("va");
    expect(localStorage.getItem("user_lang")).toBe("va");
    expect(document.documentElement.lang).toBe("ca-ES");
  });

  it("ThemeProvider toggles dark/light theme and high contrast", async () => {
    let contextValue: any = null;

    const TestComponent = () => {
      contextValue = useTheme();
      return <div>Theme: {contextValue.resolvedTheme}</div>;
    };

    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
    });

    // Default is light (as specified in PLAN-01 and TASK-01)
    expect(contextValue.resolvedTheme).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.style.colorScheme).toContain("light");

    // Toggle theme to dark
    await act(async () => {
      contextValue.toggleTheme();
    });

    expect(contextValue.resolvedTheme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.style.colorScheme).toContain("dark");
    expect(localStorage.getItem("user_theme")).toBe("dark");

    // Toggle high-contrast
    expect(contextValue.a11yContrast).toBe(false);
    await act(async () => {
      contextValue.toggleA11yContrast();
    });

    expect(contextValue.a11yContrast).toBe(true);
    expect(document.documentElement.getAttribute("data-a11y")).toBe("high-contrast");
    expect(document.documentElement.classList.contains("a11y-contrast")).toBe(true);
    expect(localStorage.getItem("user_contrast")).toBe("high");

    // Simulate page reload / revisit on another day:
    // Unmount current root and mount a completely fresh ThemeProvider
    root.unmount();
    container.innerHTML = "";

    let reloadedContext: any = null;
    const ReloadedTestComponent = () => {
      reloadedContext = useTheme();
      return <div>Reloaded Theme: {reloadedContext.resolvedTheme}</div>;
    };

    const newRoot = createRoot(container);
    await act(async () => {
      newRoot.render(
        <ThemeProvider>
          <ReloadedTestComponent />
        </ThemeProvider>
      );
    });

    // Both dark theme and high contrast MUST be remembered from localStorage
    expect(reloadedContext.resolvedTheme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(reloadedContext.a11yContrast).toBe(true);
    expect(document.documentElement.getAttribute("data-a11y")).toBe("high-contrast");
    expect(document.documentElement.classList.contains("a11y-contrast")).toBe(true);
  });
});
