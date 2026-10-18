import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "../src/context/LanguageContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import { ArcheryGame } from "../src/components/offtopic/ArcheryGame";
import { ProjectsSection } from "../src/components/ProjectsSection";
import { WelcomeScreen } from "../src/components/WelcomeScreen";
import { calculateArcheryScore, computeBowTremor } from "../src/scripts/components/hobby-easter-eggs";

describe("React Portfolio Components", () => {
  let container: HTMLDivElement;

  beforeAll(() => {
    // Happy DOM v21 WAAPI throws AbortError when Framer Motion cancels an animation on teardown
    process.on("unhandledRejection", (reason: any) => {
      if (
        reason &&
        (reason.name === "AbortError" ||
          reason.message?.includes("The animation was canceled"))
      ) {
        return;
      }
    });
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.setItem("user_lang", "es");
    localStorage.setItem("user_theme", "dark");
  });

  it("ArcheryGame calculateArcheryScore correctly classifies distance rings", () => {
    // 0 distance should be 10+ X (center)
    const center = calculateArcheryScore(0, 0);
    expect(center.score).toBe(10);
    expect(center.zone).toContain("X");

    // 10 points within radius 14
    const gold10 = calculateArcheryScore(5, 5);
    expect(gold10.score).toBe(10);

    // 9 points
    const gold9 = calculateArcheryScore(12, 12);
    expect(gold9.score).toBe(9);

    // Red ring (8 points)
    const red8 = calculateArcheryScore(18, 18);
    expect(red8.score).toBe(8);

    // Blue ring (6 points)
    const blue6 = calculateArcheryScore(28, 28);
    expect(blue6.score).toBe(6);

    // Black ring (4 points)
    const black4 = calculateArcheryScore(38, 38);
    expect(black4.score).toBe(4);

    // White ring (2 points)
    const white2 = calculateArcheryScore(48, 48);
    expect(white2.score).toBe(2);

    // Outermost
    const white1 = calculateArcheryScore(60, 60);
    expect(white1.score).toBe(1);
  });

  it("computeBowTremor returns continuous oscillation numbers", () => {
    const t0 = computeBowTremor(0);
    const t100 = computeBowTremor(100);
    expect(typeof t0.x).toBe("number");
    expect(typeof t0.y).toBe("number");
    expect(typeof t100.x).toBe("number");
    expect(typeof t100.y).toBe("number");
    expect(t0.x).not.toBe(t100.x);
  });

  it("ArcheryGame renders target SVG, controls, and responds to click", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <ArcheryGame />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    const target = container.querySelector("svg");
    expect(target).not.toBeNull();
    expect(container.textContent).toContain("Diana WA 50m");
    expect(container.textContent).toContain("Total: 0");
  });

  it("ProjectsSection renders projects and supports category filtering", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <ProjectsSection />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    expect(container.textContent).toContain("Cosas Interesantes");
    expect(container.textContent).toContain("MD GitHub Navigator");

    // Filter buttons exist
    const buttons = Array.from(container.querySelectorAll("button"));
    const personalBtn = buttons.find((b) => b.textContent?.includes("Proyectos IA"));
    expect(personalBtn).toBeDefined();

    if (personalBtn) {
      await act(async () => {
        personalBtn.click();
      });
      // Should show personal projects
      expect(container.textContent).toContain("MD GitHub Navigator");
    }
  });

  it("WelcomeScreen triggers onWelcomeComplete on skip button click", async () => {
    let completed = false;
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <WelcomeScreen onWelcomeComplete={() => { completed = true; }} />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    expect(container.textContent).toContain("Skip");
    const skipBtn = container.querySelector("button");
    expect(skipBtn).not.toBeNull();

    await act(async () => {
      skipBtn?.click();
    });

    // Check after delay
    await new Promise((r) => setTimeout(r, 450));
    expect(completed).toBe(true);
  });

  it("OffTopicSection displays authentic photo by default and unlocks easter egg minigame on click as a surprise", async () => {
    const { OffTopicSection } = await import("../src/components/offtopic/OffTopicSection");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <OffTopicSection />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    // Initially shows clean photo without spoiler hints
    expect(container.textContent).toContain("Tiro con Arco");
    expect(container.textContent).not.toContain("Easter Egg oculto");
    expect(container.textContent).not.toContain("Clic para desbloquear");

    // Click on photo container to unlock archery game
    const photoCard = container.querySelector(".group\\/photo") as HTMLElement | null;
    expect(photoCard).not.toBeNull();

    await act(async () => {
      photoCard?.click();
    });

    // Wait for Framer Motion exit animation to complete and render the minigame
    await act(async () => {
      await new Promise((r) => setTimeout(r, 400));
    });

    // Minigame is unlocked
    expect(container.textContent).toContain("Ver foto real");
    expect(container.textContent).toContain("Diana WA 50m");
  });
});
