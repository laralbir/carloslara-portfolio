import React from "react";
import {
  Server,
  Bot,
  Database,
  Cloud,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CoreSkillCategory {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  tagKey: string;
  summaryKey: string;
  primaryPills: string[];
  secondaryPills: string[];
}

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();

  const coreCategories: CoreSkillCategory[] = [
    {
      id: "ai",
      icon: <Bot className="w-5 h-5 text-primary" />,
      titleKey: "skills.catAi",
      tagKey: "skills.tagAi",
      summaryKey: "skills.summaryAi",
      primaryPills: [
        "Claude Code CLI",
        "Model Context Protocol (MCP)",
        "Spec-Driven Development (SDD)",
        "Google Antigravity",
      ],
      secondaryPills: ["Test-Driven Development (TDD)", "AI Code Review", "Prompt Architecture"],
    },
    {
      id: "backend",
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      titleKey: "skills.catArch",
      tagKey: "skills.tagArch",
      summaryKey: "skills.summaryArch",
      primaryPills: [
        "Node.js & TypeScript",
        "AWS SQS & SNS (Fan-out / DLQ)",
        "Arquitectura Hexagonal & DDD",
        "APIs RESTful",
      ],
      secondaryPills: ["Idempotencia & Resiliencia", "Microservicios", "PHP Moderno"],
    },
    {
      id: "data",
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      titleKey: "skills.catData",
      tagKey: "skills.tagData",
      summaryKey: "skills.summaryData",
      primaryPills: [
        "PostgreSQL & SQL Avanzado",
        "MongoDB (Sharding & Agregación)",
        "Microsoft SQL Server",
        "Redis (Distributed Caching & Locks)",
      ],
      secondaryPills: ["Optimización de Índices", "Transacciones ACID", "Pub/Sub"],
    },
    {
      id: "cloud",
      icon: <Cloud className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      titleKey: "skills.catCloud",
      tagKey: "skills.tagCloud",
      summaryKey: "skills.summaryCloud",
      primaryPills: [
        "AWS Cloud (EC2, S3, IAM, SQS)",
        "Cloudflare Workers & Pages",
        "Docker & Contenedores",
        "CI/CD Automatizado & Vitest",
      ],
      secondaryPills: ["Linux / Ubuntu", "Edge Computing", "0 Reverts Culture"],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("skills.tag") || "ARSENAL TECNOLÓGICO NUCLEICO"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {t("skills.title") || "Competencias Técnicas Clave"}
            <span className="block bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent mt-1">
              {t("skills.titleHighlight") || "Herramientas de Maestría"}
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("skills.subtitle") ||
              "Lo verdaderamente esencial: un stack consolidado tras más de 20 años resolviendo arquitecturas críticas y liderando ingeniería con IA."}
          </p>
        </div>

        {/* 2x2 Grid of Core Mastery Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 sm:p-8 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md hover:border-primary/50 transition-all card-hover flex flex-col justify-between text-left shadow-lg group"
            >
              <div>
                {/* Header Tag with Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                      {cat.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
                        {t(cat.tagKey) || cat.id}
                      </span>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {t(cat.titleKey)}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Synthesis summary */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {t(cat.summaryKey)}
                </p>

                {/* Primary Core Pillars */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block">
                    {t("skills.coreTech") || "TECNOLOGÍAS PRINCIPALES:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.primaryPills.map((pill) => (
                      <span
                        key={pill}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-primary/10 border border-primary/25 text-foreground hover:border-primary/50 transition-all"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Secondary complementary capabilities */}
              <div className="pt-4 border-t border-border/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
                  {t("skills.compSkills") || "COMPETENCIAS COMPLEMENTARIAS:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.secondaryPills.map((pill) => (
                    <span
                      key={pill}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-background/80 border border-border/50 text-muted-foreground"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
