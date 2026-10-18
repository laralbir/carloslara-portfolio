import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Target,
  Download,
  FileText,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"vision" | "architecture" | "methodology">("vision");

  const pillars = [
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: t("strengths.pillar1.title") || "Arquitectura Distribuida & Event-Driven",
      subtitle: `${t("strengths.pillar1.level")} · ${t("strengths.pillar1.years")}`,
      desc: t("strengths.pillar1.desc"),
    },
    {
      icon: <Cpu className="h-6 w-6 text-cyan-400" />,
      title: t("strengths.pillar2.title") || "Backend de Misión Crítica & Microservicios",
      subtitle: `${t("strengths.pillar2.level")} · ${t("strengths.pillar2.years")}`,
      desc: t("strengths.pillar2.desc"),
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: t("strengths.pillar3.title") || "Ingeniería Agéntica & Tooling con IA",
      subtitle: `${t("strengths.pillar3.level")} · ${t("strengths.pillar3.years")}`,
      desc: t("strengths.pillar3.desc"),
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-400" />,
      title: t("strengths.pillar4.title") || "Modelado de Datos, Rendimiento & BI",
      subtitle: `${t("strengths.pillar4.level")} · ${t("strengths.pillar4.years")}`,
      desc: t("strengths.pillar4.desc"),
    },
  ];

  const tabContent = {
    vision: {
      title:
        t("strengths.tabs.visionTitle") ||
        "Uniendo 20 años de artesanía backend con la era agéntica",
      p1:
        t("strengths.tabs.visionP1") ||
        "Llevo programando y levantando arquitecturas desde antes de que existiera la nube como la conocemos hoy. He visto modas nacer y morir, pero los fundamentos permanecen: desacoplamiento, idempotencia, resiliencia y claridad de dominio.",
      p2:
        t("strengths.tabs.visionP2") ||
        "Hoy no peleo contra las herramientas de Inteligencia Artificial: las integro en el corazón de mi flujo diario a través de Claude Code y el protocolo MCP, logrando un ritmo de entrega de 10x sin sacrificar ni un ápice de rigor técnico.",
    },
    architecture: {
      title:
        t("strengths.tabs.archTitle") ||
        "Arquitecturas que escalan bajo fuego real",
      p1:
        t("strengths.tabs.archP1") ||
        "Mi enfoque se basa en Clean Architecture y Event-Driven Design. Cada servicio posee responsabilidades atómicas, comunica eventos asíncronos mediante AWS EventBridge o SQS, y garantiza que un pico inesperado nunca tumbe el core del negocio.",
      p2:
        t("strengths.tabs.archP2") ||
        "Desde bases de datos SQL relacionales altamente normalizadas hasta NoSQL optimizado para alta lectura, selecciono la herramienta precisa para cada necesidad de negocio.",
    },
    methodology: {
      title:
        t("strengths.tabs.sddTitle") ||
        "Spec-Driven Development: Cero alucinaciones, 100% código verificado",
      p1:
        t("strengths.tabs.sddP1") ||
        "Bajo la metodología SDD, el código es el subproducto de una especificación impecable. Antes de tirar una sola línea, completamos Análisis, Plan de Arquitectura y Desglose Atómico de Tareas.",
      p2:
        t("strengths.tabs.sddP2") ||
        "Cada pull request pasa por pruebas automatizadas TDD (Red -> Green -> Refactor), análisis de seguridad y verificación de rendimiento antes de llegar a producción.",
    },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("strengths.tag") || "PILARES TÉCNICOS"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("strengths.title") || "Áreas de Fuerza & Especialización"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("strengths.subtitle") ||
              "Lo que de verdad domino tras más de 20 años en la trinchera: arquitecturas que no se caen, código limpio y productividad exponencial con IA."}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-md hover:border-primary/50 transition-all group"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-background/80 border border-border/50 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-primary/90 mt-1 mb-2 font-medium">
                    {pillar.subtitle}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive Interactive Tabs */}
        <div className="bg-card/70 border border-border/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex flex-wrap gap-2 border-b border-border/40 pb-4 mb-6">
            <button
              onClick={() => setActiveTab("vision")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "vision"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              {t("strengths.tabs.visionTab") || "🎯 Visión & Trayectoria"}
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "architecture"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              {t("strengths.tabs.archTab") || "⚡ Filosofía de Arquitectura"}
            </button>
            <button
              onClick={() => setActiveTab("methodology")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "methodology"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              {t("strengths.tabs.sddTab") || "🛠️ SDD & Flujos Agénticos"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-left space-y-4 max-w-4xl"
            >
              <h3 className="text-xl font-bold text-foreground">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tabContent[activeTab].p1}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tabContent[activeTab].p2}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Download Resumes Bar */}
          <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t("strengths.tabs.atsResume") || "Formatos preparados para evaluadores técnicos y motores ATS/IA"}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/cv.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-mono border border-border hover:border-primary/40 bg-card text-foreground flex items-center gap-1.5 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>cv.md</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>

              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-mono border border-border hover:border-primary/40 bg-card text-foreground flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>llms.txt</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
