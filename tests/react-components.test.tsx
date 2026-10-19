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

  it("EducationSection renders official academic degrees and leadership background", async () => {
    const { EducationSection } = await import("../src/components/EducationSection");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <EducationSection />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    expect(container.textContent).toContain("Especialización en IA y Big Data");
    expect(container.textContent).toContain("Ingeniería Informática");
    expect(container.textContent).toContain("Desarrollo de Aplicaciones Informáticas");
    expect(container.textContent).toContain("Tiro con Arco");
    expect(container.textContent).toContain("Campeones Universitarios de España");
  });

  it("SkillsSection renders essential core pillars and high-impact technologies", async () => {
    const { SkillsSection } = await import("../src/components/SkillsSection");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <SkillsSection />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    expect(container.textContent).toContain("Claude Code CLI");
    expect(container.textContent).toContain("Model Context Protocol (MCP)");
    expect(container.textContent).toContain("Node.js & TypeScript");
    expect(container.textContent).toContain("AWS SQS & SNS");
    expect(container.textContent).toContain("PostgreSQL");
    expect(container.textContent).toContain("Cloudflare Workers");
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

    // Clicking on a project article opens the expanded modal
    const projectCard = container.querySelector("article");
    expect(projectCard).not.toBeNull();

    await act(async () => {
      projectCard?.click();
    });

    expect(container.textContent).toContain("EL PROBLEMA DE NEGOCIO");
    expect(container.textContent).toContain("LA SOLUCIÓN TÉCNICA");
    expect(container.textContent).toContain("EL RESULTADO / MÉTRICA");
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

    expect(container.textContent).toMatch(/Skip|Saltar/i);
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

    // Archery photo has scale zoom to hide corner stand
    const archeryImg = container.querySelector("img[src*='archery-real']") as HTMLImageElement | null;
    expect(archeryImg).not.toBeNull();
    expect(archeryImg?.className).toContain("scale-[1.16]");

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
    expect(container.textContent).toMatch(/Ver foto real|View real photo|Veure foto real/i);
    expect(container.textContent).toContain("Diana WA 50m");
  });

  it("AiCalloutBanner prominently discloses 100% Agentic AI and opens SDD modal", async () => {
    const { MotionConfig } = await import("framer-motion");
    const { AiCalloutBanner } = await import("../src/components/AiCalloutBanner");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <MotionConfig reducedMotion="always">
          <ThemeProvider>
            <LanguageProvider>
              <AiCalloutBanner />
            </LanguageProvider>
          </ThemeProvider>
        </MotionConfig>
      );
    });

    // Contains 100% agentic disclosure and zero hallucinations badge
    expect(container.textContent).toContain("100% IA Agéntica & SDD");
    expect(container.textContent).toContain("0 Alucinaciones");
    expect(container.textContent).toContain("100% Verificado");
    expect(container.textContent).toContain("Claude Code + Antigravity");

    // Modal is initially not in DOM
    expect(document.querySelector("#sdd-modal-title")).toBeNull();

    // Click "Cómo se hizo (SDD)"
    const infoBtn = container.querySelector("button[aria-haspopup='dialog']") as HTMLButtonElement | null;
    expect(infoBtn).not.toBeNull();

    await act(async () => {
      infoBtn?.click();
    });

    // Modal is opened with SDD title and 4 gates
    const modalTitle = document.querySelector("#sdd-modal-title");
    expect(modalTitle).not.toBeNull();
    expect(document.body.textContent).toContain("FASE 01");
    expect(document.body.textContent).toContain("FASE 02");
    expect(document.body.textContent).toContain("FASE 03");
    expect(document.body.textContent).toContain("FASE 04");

    // Click close button
    const closeBtn = container.querySelector("button[aria-label='Cerrar modal']") as HTMLButtonElement | null;
    expect(closeBtn).not.toBeNull();

    await act(async () => {
      closeBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector("#sdd-modal-title")).toBeNull();
  });

  it("ExperienceTimeline renders real <strong> DOM elements and never exposes literal <strong> tags as text", async () => {
    const { ExperienceTimeline } = await import("../src/components/ExperienceTimeline");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <ExperienceTimeline />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    // Verify no literal HTML tags leak into visible text
    expect(container.textContent).not.toContain("<strong>");
    expect(container.textContent).not.toContain("</strong>");
    expect(container.textContent).toContain("Servicios Taurinos Serolo");

    // Verify that <strong> is rendered as a proper HTML element
    const strongElements = container.querySelectorAll("strong");
    expect(strongElements.length).toBeGreaterThan(0);
    const seroloStrong = Array.from(strongElements).find((s) =>
      s.textContent?.includes("Servicios Taurinos Serolo")
    );
    expect(seroloStrong).toBeDefined();
    expect(seroloStrong?.textContent).toContain("Servicios Taurinos Serolo (2006–2009):");
  });

  it("HeroSection renders avatar with object-top framing and opens enlarged modal with interactive fun facts on click", async () => {
    const { MotionConfig } = await import("framer-motion");
    const { HeroSection } = await import("../src/components/HeroSection");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <MotionConfig reducedMotion="always">
          <ThemeProvider>
            <LanguageProvider>
              <HeroSection />
            </LanguageProvider>
          </ThemeProvider>
        </MotionConfig>
      );
    });

    // Check avatar image has object-top framing
    const avatarImg = container.querySelector("img[alt='Carlos Lara Albir']") as HTMLImageElement | null;
    expect(avatarImg).not.toBeNull();
    expect(avatarImg?.className).toContain("object-top");

    // Check Hero CTA buttons have consistent styling, solid surfaces, and defined borders
    const projectsBtn = container.querySelector("a[href='#projects']") as HTMLAnchorElement | null;
    const contactBtn = container.querySelector("a[href='#contact']") as HTMLAnchorElement | null;
    const cvBtn = container.querySelector("a[href='/cv.md']") as HTMLAnchorElement | null;

    expect(projectsBtn).not.toBeNull();
    expect(contactBtn).not.toBeNull();
    expect(cvBtn).not.toBeNull();

    // Verify all 3 have consistent text-sm and font-semibold
    expect(projectsBtn?.className).toContain("text-sm");
    expect(projectsBtn?.className).toContain("font-semibold");
    expect(contactBtn?.className).toContain("text-sm");
    expect(contactBtn?.className).toContain("font-semibold");
    expect(cvBtn?.className).toContain("text-sm");
    expect(cvBtn?.className).toContain("font-semibold");

    // Verify contact and CV buttons have solid/card surface and clear borders
    expect(contactBtn?.className).toContain("bg-card");
    expect(contactBtn?.className).toContain("border-primary");
    expect(cvBtn?.className).toContain("bg-card");
    expect(cvBtn?.className).toContain("border-slate-300");

    // Modal is initially not in DOM
    expect(document.querySelector("#photo-modal-title")).toBeNull();

    // Click on avatar button
    const avatarBtn = container.querySelector("button[aria-label*='Carlos Lara Albir']") as HTMLButtonElement | null;
    expect(avatarBtn).not.toBeNull();

    await act(async () => {
      avatarBtn?.click();
    });

    // Modal is now open
    const modalTitle = document.querySelector("#photo-modal-title");
    expect(modalTitle).not.toBeNull();
    expect(modalTitle?.textContent).toContain("Carlos Lara Albir");
    expect(document.body.textContent).toContain("DETRÁS DEL CÓDIGO");
    expect(document.body.textContent).toContain("Tiro con Arco");

    // 20+ YOE badge has high-contrast styling with white text on dark surface
    const yoeBadge = document.querySelector(".relative .absolute.-bottom-2.-right-2");
    expect(yoeBadge).not.toBeNull();
    expect(yoeBadge?.textContent).toContain("20+ YOE");
    expect(yoeBadge?.className).toContain("text-white");
    expect(yoeBadge?.className).not.toContain("text-emerald-600");

    // Click "Ver otra curiosidad" or next fact button
    const nextBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Ver otra curiosidad") || b.textContent?.includes("Next fun fact")
    );
    expect(nextBtn).toBeDefined();

    await act(async () => {
      nextBtn?.click();
    });

    // Fact changed to motorcycle trips
    expect(document.body.textContent).toMatch(/Rutas en Moto|Motorcycle Trips|Rutes en Moto/);

    // Close modal
    const closeBtn = container.querySelector("#photo-modal-close-btn") as HTMLButtonElement | null;
    expect(closeBtn).not.toBeNull();

    await act(async () => {
      closeBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await new Promise((r) => setTimeout(r, 400));
    });

    expect(container.querySelector("#photo-modal-title")).toBeNull();
  });

  it("ContactSection renders 4 contact cards in a responsive grid of 1 row (desktop) and max 2 rows (tablet)", async () => {
    const { ContactSection } = await import("../src/components/ContactSection");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <LanguageProvider>
            <ContactSection />
          </LanguageProvider>
        </ThemeProvider>
      );
    });

    // Check grid layout classes: 1 row on desktop (lg:grid-cols-4), max 2 rows on tablet (sm:grid-cols-2)
    const grid = container.querySelector(".grid") as HTMLElement | null;
    expect(grid).not.toBeNull();
    expect(grid?.className).toContain("lg:grid-cols-4");
    expect(grid?.className).toContain("sm:grid-cols-2");

    // Heading title is rendered in black without text-transparent gradient
    const heading = container.querySelector("#contact h2") as HTMLHeadingElement | null;
    expect(heading).not.toBeNull();
    expect(heading?.className).toContain("text-black");
    expect(heading?.textContent).toMatch(/¿Nos conocemos\?|Let's get in touch|Ens coneixem\?/);
    expect(heading?.querySelector(".bg-clip-text")).toBeNull();

    // All 4 cards are present
    expect(container.textContent).toContain("info@carloslara.dev");
    expect(container.textContent).toContain("carlos-lara-albir");
    expect(container.textContent).toContain("laralbir");
    expect(container.textContent).toContain("Valencia, España");

    // Copy email button exists and works
    const copyBtn = container.querySelector("#copy-email-btn") as HTMLButtonElement | null;
    expect(copyBtn).not.toBeNull();

    // Mock clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {},
      },
      writable: true,
      configurable: true,
    });

    await act(async () => {
      copyBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(copyBtn?.textContent).toMatch(/Copiado|Copied/i);
  });

  it("StarBackground renders light celestial pastel stars, meteors and atmospheric halos in light theme", async () => {
    const { StarBackground } = await import("../src/components/StarBackground");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ThemeProvider>
          <StarBackground />
        </ThemeProvider>
      );
    });

    const bgContainer = container.querySelector("[data-testid='star-background']");
    expect(bgContainer).not.toBeNull();

    // Check light ambient halos have lighter tones (teal-300 / cyan-300 / indigo-300) instead of dark 500 tones
    const halos = container.querySelectorAll(".blur-3xl");
    expect(halos.length).toBe(3);
    expect(halos[0].className).toContain("bg-teal-300");
    expect(halos[1].className).toContain("bg-cyan-300");
    expect(halos[2].className).toContain("bg-indigo-300");

    // Check stars have lighter pastel classes
    const stars = container.querySelectorAll(".star");
    expect(stars.length).toBeGreaterThan(0);
    const starClasses = Array.from(stars).map((s) => s.className).join(" ");
    expect(starClasses).toMatch(/bg-teal-400|bg-cyan-400|bg-indigo-300/);
    expect(starClasses).not.toContain("bg-teal-600");
    expect(starClasses).not.toContain("bg-cyan-600");
    expect(starClasses).not.toContain("bg-indigo-600");

    // Check meteors have initial opacity-0, 215deg angle and animation-fill-mode both to prevent horizontal frozen bars on load
    const meteors = container.querySelectorAll(".meteor");
    expect(meteors.length).toBeGreaterThan(0);
    meteors.forEach((meteor) => {
      expect(meteor.className).toContain("opacity-0");
      expect(meteor.className).toContain("[transform:rotate(215deg)]");
      expect((meteor as HTMLElement).style.animationFillMode).toBe("both");
    });
  });

  it("MotoThrottle renders grand solid alpine mountains with green slopes and pine trees without transparencies", async () => {
    const { MotoThrottle } = await import("../src/components/offtopic/MotoThrottle");
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <LanguageProvider>
          <MotoThrottle />
        </LanguageProvider>
      );
    });

    const mountainsSvg = container.querySelector(".moto-mountains");
    expect(mountainsSvg).not.toBeNull();

    // Check SVG contains green slopes and conifer pine trees
    const svgHtml = mountainsSvg?.innerHTML || "";
    expect(svgHtml).toMatch(/#15803d|#166534/);
    expect(svgHtml).toMatch(/#064e3b|#065f46|#022c22/);

    // Verify mountain polygons do NOT have opacity attributes causing transparency
    const polygons = mountainsSvg?.querySelectorAll("polygon");
    expect(polygons && polygons.length > 0).toBe(true);
    polygons?.forEach((poly) => {
      expect(poly.getAttribute("opacity")).toBeNull();
    });
  });
});


