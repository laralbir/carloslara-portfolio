import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");

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
    "// Cloudflare Edge & AWS Event-Driven verified.",
    "console.log('⚡ Spec-Driven Development: 0 Hallucinations');",
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
                className="px-6 py-3.5 rounded-xl font-semibold border border-primary/40 text-foreground hover:border-primary hover:bg-primary/5 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>{t("hero.ctaContact") || "¿Hablamos?"}</span>
              </a>

              <a
                href="/cv.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl font-mono text-xs font-semibold border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>{t("hero.ctaCv") || "CV (Markdown)"}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Code Window & Floating Avatar */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              {/* Terminal Code Card */}
              <div className="bg-card/90 border border-border/80 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
                {/* Window header */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-border/40 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>agentic-architect.ts</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Code Terminal Output */}
                <div className="font-mono text-[11px] sm:text-xs bg-background/80 rounded-xl p-3 sm:p-4 border border-border/40 min-h-[260px] sm:min-h-[300px] flex flex-col justify-start overflow-x-auto text-left leading-relaxed">
                  {codeSnippets.map((line, idx) => {
                    const isPassed = idx < currentCodeLine;
                    const isCurrent = idx === currentCodeLine;

                    if (!isPassed && !isCurrent) return null;

                    return (
                      <div
                        key={idx}
                        className={`min-h-[1.25rem] transition-opacity duration-150 ${
                          line.startsWith("import")
                            ? "text-cyan-400 font-semibold"
                            : line.startsWith("const") || line.startsWith("await")
                            ? "text-primary font-semibold"
                            : line.includes("//")
                            ? "text-muted-foreground italic"
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

                {/* Photo Avatar Badge anchored on edge */}
                <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src="/assets/carlos-lara.webp"
                        alt="Carlos Lara Albir"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-primary/50 shadow-md"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/assets/carlos-lara.jpg";
                        }}
                      />
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-foreground">Carlos Lara Albir</div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-muted-foreground">
                        20+ YOE · Valencia, Spain
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-0.5 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-[10px] font-mono text-primary font-bold">
                      100% IA Agéntica
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground">
                      SDD Verified
                    </span>
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
    </section>
  );
};
