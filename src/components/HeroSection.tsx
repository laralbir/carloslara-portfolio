import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  Code,
  Mail,
  Download,
  Briefcase,
  Terminal,
  MousePointerClick,
  Sparkles,
  Layers,
  Cpu,
  X,
  Maximize2,
  ChevronRight,
  RotateCcw,
  MapPin,
  Gamepad2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ZxSpectrumArcade } from "./ZxSpectrumArcade";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isArcadeMode, setIsArcadeMode] = useState(false);
  const [arcadeInitialGame, setArcadeInitialGame] = useState<"invaders" | "arkanoid" | "enduro">("invaders");
  const [portraitTilt, setPortraitTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 30 });

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setPortraitTilt({
      rotateX: (0.5 - y) * 14,
      rotateY: (x - 0.5) * 14,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const resetPortraitTilt = () => {
    setPortraitTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 30 });
  };

  const factKeys = ["archery", "moto", "hifi", "ai", "origins"] as const;

  // Keyboard accessibility: Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPhotoModalOpen) {
        setIsPhotoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPhotoModalOpen]);

  // Listen for DevTools console easter egg command: window.zxSpectrum('invaders' | 'arkanoid')
  useEffect(() => {
    const handleLaunchZx = (e: Event) => {
      const customEvent = e as CustomEvent<{ game?: "invaders" | "arkanoid" | "enduro" }>;
      if (customEvent.detail?.game === "arkanoid") {
        setArcadeInitialGame("arkanoid");
      } else if (customEvent.detail?.game === "enduro") {
        setArcadeInitialGame("enduro");
      } else {
        setArcadeInitialGame("invaders");
      }
      setIsArcadeMode(true);
    };
    window.addEventListener("launch-zx-spectrum", handleLaunchZx);
    return () => window.removeEventListener("launch-zx-spectrum", handleLaunchZx);
  }, []);

  // Prevent background scroll jitter when modal is open
  useEffect(() => {
    if (isPhotoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPhotoModalOpen]);

  const codeSnippets = [
    "import { AgenticArchitect } from '@carlos/core';",
    "",
    "const architect = new AgenticArchitect({",
    "  name: 'Carlos Lara Albir',",
    "  title: 'Agentic Engineer & Senior Backend Architect',",
    "  experience: '20+ years mission-critical systems',",
    "  pillars: ['Distributed EDA', 'Claude Code & MCP', 'Strict SDD'],",
    "  metrics: { devVelocity: '10x', auditedReverts: 0 },",
    "  status: 'Open to Senior / Staff opportunities'",
    "});",
    "",
    "await architect.orchestrateProduction();",
    "// GitHub Pages & AWS Event-Driven verified.",
    "console.log('⚡ Spec-Driven Development: 0 Hallucinations');",
    "await mcpServer.connect('diagnostics-25-tools');",
    "await sqsFifo.publish({ channel: 'OTA_SYNC', sla: '99.99%' });",
    "// 🕹️ Easter Egg: Click [ZX 48K] to play ASCII Invaders / Arkanoid!",
  ];

  const achievements = [
    { number: "20+", label: t("hero.metricYears") || "Años en Producción", icon: <ShieldCheck className="h-4 w-4 text-emerald-400" /> },
    { number: "10x", label: t("hero.metricVelocity") || "Velocidad de Desarrollo", icon: <TrendingUp className="h-4 w-4 text-cyan-400" /> },
    { number: "0", label: t("hero.metricReverts") || "Reverts Auditados", icon: <Award className="h-4 w-4 text-amber-400" /> },
    { number: "99.99%", label: t("hero.metricUptime") || "Disponibilidad SLA", icon: <Zap className="h-4 w-4 text-primary" /> },
  ];

  useEffect(() => {
    const currentLine = codeSnippets[currentCodeLine];
    if (displayedCode.length < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, displayedCode.length + 1));
      }, 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (currentCodeLine < codeSnippets.length - 1) {
          setCurrentCodeLine((prev) => prev + 1);
          setDisplayedCode("");
        } else {
          setTimeout(() => {
            setCurrentCodeLine(0);
            setDisplayedCode("");
          }, 4500);
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [displayedCode, currentCodeLine]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent via-background/25 to-primary/5 py-12 lg:py-20"
    >
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,187,167,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,187,167,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,187,167,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,187,167,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-primary/15 dark:bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/15 dark:bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Bio & CTAs */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t("hero.badge") || "Buscando mi próximo gran reto · Senior / Staff / Tech Lead"}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="block text-foreground">{t("hero.titlePrefix") || "Carlos Lara Albir"}</span>
              <span className="block bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent mt-2">
                Agentic Engineer
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground mt-1">
                &amp; Senior Backend Architect
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground mt-6 leading-relaxed max-w-2xl">
              {t("hero.subtitle") ||
                "Más de 20 años diseñando arquitecturas distribuidas de alta concurrencia que no se caen con tráfico real. Hoy multiplico esa experiencia con ingeniería agéntica e IA: Claude Code en la terminal, servidores MCP propios y Spec-Driven Development estricto."}
            </p>

            {/* Audited Achievements Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-6 sm:my-8">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-xl bg-card/60 border border-border/60 backdrop-blur-sm hover:border-primary/40 transition-all text-center group"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    {item.icon}
                    <span className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                      {item.number}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary to-cyan-600 text-primary-foreground shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Code className="h-4 w-4" />
                <span>{t("hero.ctaProjects") || "Ver Proyectos"}</span>
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-semibold bg-card/90 dark:bg-card/70 backdrop-blur-md border border-primary/50 text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] shadow-sm transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>{t("hero.ctaContact") || "¿Hablamos?"}</span>
              </a>

              <a
                href="/cv.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-semibold bg-card/90 dark:bg-card/70 backdrop-blur-md border border-slate-300 dark:border-border text-foreground hover:border-primary/60 hover:text-primary hover:scale-[1.02] active:scale-[0.98] shadow-sm transition-all text-sm flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Download className="h-4 w-4 text-primary" />
                <span>{t("hero.ctaCv") || "CV (Markdown)"}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Avant-Garde Holographic Monolith Portrait + Overlapping Dark Terminal */}
          <motion.div
            className="flex-1 w-full max-w-xl lg:max-w-none flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-xl flex flex-col sm:block">
              {/* Avant-Garde Large Interactive Portrait Monolith */}
              <div
                data-testid="hero-portrait-card"
                onMouseMove={handlePortraitMouseMove}
                onMouseLeave={resetPortraitTilt}
                style={{
                  transform: `perspective(1100px) rotateX(${portraitTilt.rotateX}deg) rotateY(${portraitTilt.rotateY}deg)`,
                  transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="relative z-10 w-64 sm:w-72 md:w-80 mx-auto sm:mx-0 sm:ml-auto sm:mr-4 mb-5 sm:mb-0 group/avatar"
              >
                {/* Ambient Chromatic Aura */}
                <div className="absolute -inset-2.5 rounded-[2rem] bg-gradient-to-tr from-primary/40 via-cyan-400/30 to-emerald-400/40 blur-2xl opacity-75 group-hover/avatar:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="relative w-full block text-left rounded-[1.75rem] p-[2px] bg-gradient-to-br from-primary via-cyan-400 to-emerald-500 shadow-[0_20px_50px_rgba(0,187,167,0.28)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden transition-transform duration-300"
                  aria-label={t("hero.photoModal.openAria") || "Ampliar foto de perfil y ver datos curiosos de Carlos Lara Albir"}
                  title={t("hero.photoModal.openTooltip") || "Clic para ampliar foto y ver datos curiosos"}
                >
                  <div className="relative rounded-[calc(1.75rem-2px)] overflow-hidden bg-slate-950 aspect-[4/5]">
                    {/* High-Impact Portrait with Soft Bottom Fade Mask */}
                    <img
                      src="/assets/carlos-lara.webp"
                      alt="Carlos Lara Albir"
                      className="w-full h-full object-cover object-top scale-[1.03] group-hover/avatar:scale-110 transition-transform duration-700 ease-out [-webkit-mask-image:linear-gradient(to_bottom,black_76%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_76%,transparent_100%)]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/assets/carlos-lara.jpg";
                      }}
                    />

                    {/* Subtle Cyberpunk Scanline & Specular Glare Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                      style={{
                        background: `radial-gradient(circle at ${portraitTilt.glareX}% ${portraitTilt.glareY}%, rgba(255,255,255,0.45), transparent 60%)`,
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,187,167,0.06)_50%)] bg-[size:100%_4px] opacity-60" />

                    {/* Corner Architectural Reticles (Viewfinder HUD) */}
                    <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/80 rounded-tl-sm pointer-events-none" />
                    <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-sm pointer-events-none" />
                    <span className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-sm pointer-events-none" />
                    <span className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/60 rounded-br-sm pointer-events-none" />

                    {/* Top Telemetry Pill */}
                    <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-primary/40 text-[10px] font-mono text-primary font-bold tracking-wider uppercase shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ID // ARCHITECT
                      </span>
                      <span className="p-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15 text-white/90 group-hover/avatar:bg-primary group-hover/avatar:text-slate-950 transition-colors shadow-md">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Bottom HUD Identity Bar */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex items-end justify-between gap-2">
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1.5 group-hover/avatar:text-primary transition-colors">
                          <span>Carlos Lara Albir</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-mono text-cyan-300/90">
                          20+ YOE · Valencia, ES
                        </div>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="px-2 py-0.5 rounded-md bg-primary/20 border border-primary/50 text-[10px] font-mono text-primary font-bold">
                          + INFO
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Terminal Code Card (Overlapping Docked Console on Desktop) */}
              <div
                data-testid="hero-terminal-card"
                className="dark relative z-20 sm:-mt-28 sm:mr-20 bg-card/95 text-foreground border border-border/80 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
              >
                {/* Window header */}
                <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-border/40 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{isArcadeMode ? "zx-spectrum-48k.rom" : "agentic-architect.ts"}</span>
                  </div>
                  <button
                    type="button"
                    data-testid="terminal-arcade-toggle"
                    onClick={() => setIsArcadeMode((prev) => !prev)}
                    className={`px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      isArcadeMode
                        ? "bg-amber-400 text-black border-amber-300 shadow-[0_0_12px_rgba(245,217,10,0.45)]"
                        : "bg-slate-900/90 hover:bg-primary/20 text-amber-300 border-amber-400/40 hover:border-amber-400"
                    }`}
                    title="Easter Egg: Jugar a Space Invaders / Arkanoid / Enduro en ASCII (ZX Spectrum 48K)"
                  >
                    <Gamepad2 className="w-3 h-3" />
                    <span>{isArcadeMode ? "EXIT ROM" : "ZX 48K"}</span>
                  </button>
                </div>

                {/* Code Terminal Output OR ZX Spectrum 48K ASCII Arcade */}
                {isArcadeMode ? (
                  <ZxSpectrumArcade
                    initialMode={arcadeInitialGame}
                    onExit={() => setIsArcadeMode(false)}
                  />
                ) : (
                  <div
                    data-testid="terminal-scroll-body"
                    className="terminal-scroll-container font-mono text-[11px] sm:text-xs bg-background/85 rounded-xl p-3 sm:p-3.5 border border-border/40 h-[305px] sm:h-[310px] max-h-[305px] sm:max-h-[310px] overflow-y-auto overflow-x-auto flex flex-col-reverse text-left leading-relaxed"
                  >
                    <div className="flex flex-col justify-start">
                      {codeSnippets.map((line, idx) => {
                        const isPassed = idx < currentCodeLine;
                        const isCurrent = idx === currentCodeLine;

                        if (!isPassed && !isCurrent) return null;

                        return (
                          <div
                            key={idx}
                            className={`min-h-[1.2rem] transition-opacity duration-150 ${
                              line.startsWith("import")
                                ? "text-cyan-400 font-semibold"
                                : line.startsWith("const") || line.startsWith("await")
                                ? "text-primary font-semibold"
                                : line.includes("//")
                                ? "text-slate-400 italic"
                                : line.includes("console.log")
                                ? "text-emerald-400"
                                : line.includes("'")
                                ? "text-amber-300"
                                : "text-foreground"
                            }`}
                          >
                            {isPassed ? line : displayedCode}
                            {isCurrent && (
                              <span className="ml-0.5 inline-block w-2 h-3.5 bg-primary animate-pulse" />
                            )}
                            {line === "" && "\u00A0"}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Terminal Footer Status Bar */}
                <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between gap-2 text-[10px] font-mono">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {isArcadeMode
                        ? "Sinclair ZX Spectrum 48K · ASCII CRT"
                        : "MCP & Claude Code Ready"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-medium">SDD Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center pointer-events-none opacity-70">
        <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Photo Enlarge & Fun Facts Modal */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsPhotoModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-card/95 border border-border/80 rounded-2xl shadow-2xl p-5 sm:p-7 backdrop-blur-xl my-auto text-left"
            >
              {/* Close Button */}
              <button
                id="photo-modal-close-btn"
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                aria-label={t("hero.photoModal.close") || "Cerrar modal"}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag / Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-mono text-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("hero.photoModal.badge") || "DETRÁS DEL CÓDIGO"}</span>
              </div>

              {/* Profile Card Header with High-Res Image */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-6">
                <div className="relative shrink-0">
                  <img
                    src="/assets/carlos-lara.webp"
                    alt="Carlos Lara Albir"
                    className="w-32 h-44 sm:w-40 sm:h-52 rounded-2xl object-cover object-top border-2 border-primary/50 shadow-xl"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/assets/carlos-lara.jpg";
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-slate-900 dark:bg-black border border-emerald-500/70 shadow-lg flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-white font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>20+ YOE</span>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 id="photo-modal-title" className="text-xl sm:text-2xl font-bold text-foreground">
                    {t("hero.photoModal.title") || "Carlos Lara Albir"}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-primary mt-1">
                    {t("hero.photoModal.role") || "Agentic Engineer & Senior Backend Architect"}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-muted-foreground mt-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{t("hero.photoModal.location") || "Valencia, España · 20+ Años en Producción"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {t("hero.photoModal.tagline") || "Sistemas distribuidos de alta concurrencia + desarrollo agéntico con IA (Claude Code, MCP y SDD)."}
                  </p>
                </div>
              </div>

              {/* Interactive Fun Facts Section */}
              <div className="border-t border-border/40 pt-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                    <span>💡</span>
                    <span>{t("hero.photoModal.curiositiesTitle") || "¿SABÍAS QUÉ...? · DATOS CURIOSOS"}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {currentFactIndex + 1} / {factKeys.length}
                  </span>
                </div>

                {/* Fact Selector Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {factKeys.map((key, idx) => {
                    const isActive = idx === currentFactIndex;
                    const tag = t(`hero.photoModal.facts.${key}.tag`);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCurrentFactIndex(idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                            : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                {/* Active Fact Card */}
                {(() => {
                  const activeKey = factKeys[currentFactIndex];
                  const title = t(`hero.photoModal.facts.${activeKey}.title`);
                  const desc = t(`hero.photoModal.facts.${activeKey}.desc`);
                  return (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-muted/30 border border-border/60">
                      <div className="text-xs sm:text-sm font-bold text-foreground mb-1">
                        {title}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })()}

                {/* Footer Buttons */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentFactIndex((prev) => (prev + 1) % factKeys.length)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t("hero.photoModal.nextButton") || "Ver otra curiosidad"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-all cursor-pointer"
                  >
                    {t("hero.photoModal.close") || "Cerrar"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
