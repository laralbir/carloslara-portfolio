import React from "react";
import {
  GraduationCap,
  Brain,
  Award,
  Layers,
  Code2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface EducationItem {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  institutionKey: string;
  descKey: string;
  tag: string;
  badge?: string;
  chips: string[];
}

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();

  const educationItems: EducationItem[] = [
    {
      id: "ai",
      icon: <Brain className="w-5 h-5 text-primary" />,
      titleKey: "education.aiDegree.title",
      institutionKey: "education.aiDegree.institution",
      descKey: "education.aiDegree.desc",
      tag: "IA & Analítica Avanzada",
      badge: "En curso (2026) · Oficial",
      chips: ["Machine Learning", "Deep Learning", "Streaming Pipelines", "Redes Neuronales"],
    },
    {
      id: "cs",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      titleKey: "education.csDegree.title",
      institutionKey: "education.csDegree.institution",
      descKey: "education.csDegree.desc",
      tag: "Ingeniería del Software",
      badge: "UPV (+80% créditos superados)",
      chips: ["Sistemas Distribuidos", "Arquitectura de Software", "Algoritmia", "Estructuras de Datos"],
    },
    {
      id: "dai",
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      titleKey: "education.daiDegree.title",
      institutionKey: "education.daiDegree.institution",
      descKey: "education.daiDegree.desc",
      tag: "Desarrollo de Software",
      badge: "Titulación Técnica Oficial",
      chips: ["Diseño Orientado a Objetos", "Bases de Datos Relacionales", "Ingeniería de Sistemas", "Patrones"],
    },
    {
      id: "leadership",
      icon: <Award className="w-5 h-5 text-amber-400" />,
      titleKey: "education.archery.title",
      institutionKey: "education.archery.institution",
      descKey: "education.archery.desc",
      tag: "Liderazgo & Alto Rendimiento",
      badge: "Consejo Superior de Deportes (CSD)",
      chips: ["Gestión bajo Presión", "Foco Milimétrico", "Liderazgo de Equipos", "Consistencia Técnica"],
    },
  ];

  return (
    <section id="education" className="py-20 px-4 relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-primary/10 border border-primary/20 text-primary mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Formación &amp; Disciplina</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            <span>{t("education.title") || "Background & Disciplina"}</span>
            <span className="block bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent mt-1">
              Curiosidad Continua &amp; Rendimiento
            </span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("education.subtitle") ||
              "Curiosidad técnica constante, bases formales de ingeniería y disciplina deportiva de alto rendimiento."}
          </p>
        </div>

        {/* 2x2 Grid of Education & Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationItems.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg hover:border-primary/40 transition-all card-hover flex flex-col justify-between text-left group"
            >
              <div>
                {/* Header Tag & Institution Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.tag}</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-primary/10 border border-primary/20 text-primary font-semibold">
                    {t(item.institutionKey)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(item.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {t(item.descKey)}
                </p>

                {/* Special badges for Archery leadership */}
                {item.id === "leadership" && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                      <span>{t("education.archery.champBadge")}</span>
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-primary/10 border border-primary/30 text-primary flex items-center gap-1.5">
                      <span>{t("education.archery.focusBadge")}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Competency Chips */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                {item.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-background/80 border border-border/60 text-muted-foreground"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
