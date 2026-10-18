import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ExperienceItemConfig {
  id: string;
  technologies: string[];
}

export const ExperienceTimeline: React.FC = () => {
  const { t, tArray } = useLanguage();

  const experiences: ExperienceItemConfig[] = [
    {
      id: "avantio",
      technologies: ["Node.js", "TypeScript", "AWS SQS/SNS", "PHP Moderno", "MongoDB", "SQL Server", "Claude Code", "MCP", "SDD"],
    },
    {
      id: "orca",
      technologies: ["SQL Server", "MySQL", "PHP", "Business Intelligence", "Stored Procedures", "ETL"],
    },
    {
      id: "blue",
      technologies: ["PHP", "MySQL", "JavaScript", "PLM Industrial", "Arquitectura Cliente-Servidor", "Linux"],
    },
    {
      id: "binn",
      technologies: ["Node.js", "REST APIs", "AWS Cloud", "Linux / DevOps"],
    },
    {
      id: "early",
      technologies: ["Bases de Datos Relacionales", "Sistemas Bare-Metal", "Algoritmia"],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("experience.tag") || "TRAYECTORIA & BATALLAS GANADAS"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("experience.titlePrefix") || "20+ Años de Backend "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {t("experience.titleHighlight") || "en Producción Real"}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("experience.subtitle") ||
              "Una trayectoria forjada desde el bare-metal hasta las arquitecturas distribuidas orientadas a eventos y la inteligencia artificial agéntica."}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-primary/30 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, idx) => {
            const company = t(`experience.${exp.id}.company`);
            const role = t(`experience.${exp.id}.role`);
            const period = t(`experience.${exp.id}.period`);
            const points = tArray(`experience.${exp.id}.points`);

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-10 text-left"
              >
                {/* Timeline Dot Marker */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary shadow-lg shadow-primary/20">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-md hover:border-primary/40 transition-all shadow-xl">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-foreground">
                        {company}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{period}</span>
                      </span>
                    </div>
                  </div>

                  {/* Role */}
                  <h3 className="text-base sm:text-lg font-semibold text-primary mb-3">
                    {role}
                  </h3>

                  {/* Highlights List */}
                  <ul className="space-y-2 mb-6">
                    {points.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-background/80 border border-border/50 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
