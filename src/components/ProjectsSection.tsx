import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  ExternalLink,
  Server,
  Bot,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  CheckCircle,
  X,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectItem {
  id: string;
  category: "enterprise" | "personal";
  titleKey: string;
  tagKey: string;
  problemKey: string;
  solutionKey: string;
  impactKey: string;
  githubUrl?: string;
  demoUrl?: string;
  tags: string[];
  featured?: boolean;
}

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "enterprise" | "personal">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    // Personal / AI First (highlights latest work)
    {
      id: "personal4",
      category: "personal",
      titleKey: "projects.personal4.title",
      tagKey: "projects.personal4.tag",
      problemKey: "projects.personal4.problem",
      solutionKey: "projects.personal4.solution",
      impactKey: "projects.personal4.impact",
      githubUrl: "https://github.com/laralbir/md-gh-navigator",
      tags: ["Android Kotlin", "Jetpack Compose", "Antigravity Agents", "Mermaid", "SDD"],
      featured: true,
    },
    {
      id: "case1",
      category: "enterprise",
      titleKey: "projects.case1.title",
      tagKey: "projects.case1.tag",
      problemKey: "projects.case1.problem",
      solutionKey: "projects.case1.solution",
      impactKey: "projects.case1.impact",
      tags: ["Model Context Protocol (MCP)", "Next.js", "Hexagonal", "MongoDB", "SQL Server"],
      featured: true,
    },
    {
      id: "case3",
      category: "enterprise",
      titleKey: "projects.case3.title",
      tagKey: "projects.case3.tag",
      problemKey: "projects.case3.problem",
      solutionKey: "projects.case3.solution",
      impactKey: "projects.case3.impact",
      tags: ["AWS SQS", "AWS SNS", "TypeScript", "Event-Driven EDA", "PCI-DSS"],
      featured: true,
    },
    {
      id: "case2",
      category: "enterprise",
      titleKey: "projects.case2.title",
      tagKey: "projects.case2.tag",
      problemKey: "projects.case2.problem",
      solutionKey: "projects.case2.solution",
      impactKey: "projects.case2.impact",
      tags: ["Timeline Diag", "Calendar Sync", "Conflict Detection", "Algorithm"],
    },
    {
      id: "personal1",
      category: "personal",
      titleKey: "projects.personal1.title",
      tagKey: "projects.personal1.tag",
      problemKey: "projects.personal1.problem",
      solutionKey: "projects.personal1.solution",
      impactKey: "projects.personal1.impact",
      githubUrl: "https://github.com/laralbir",
      tags: ["Google Gemma Edge AI", "Android Kotlin", "On-Device LLM", "Offline"],
    },
    {
      id: "personal2",
      category: "personal",
      titleKey: "projects.personal2.title",
      tagKey: "projects.personal2.tag",
      problemKey: "projects.personal2.problem",
      solutionKey: "projects.personal2.solution",
      impactKey: "projects.personal2.impact",
      githubUrl: "https://github.com/laralbir",
      tags: ["Reverse Engineering", "Embedded Linux", "SquashFS", "Claude Code"],
    },
    {
      id: "personal3",
      category: "personal",
      titleKey: "projects.personal3.title",
      tagKey: "projects.personal3.tag",
      problemKey: "projects.personal3.problem",
      solutionKey: "projects.personal3.solution",
      impactKey: "projects.personal3.impact",
      githubUrl: "https://github.com/laralbir",
      tags: ["Python / Flask", "PyWebView", "Kodi JSON-RPC", "Spotify API", "VU-Meter"],
    },
    {
      id: "case4",
      category: "enterprise",
      titleKey: "projects.case4.title",
      tagKey: "projects.case4.tag",
      problemKey: "projects.case4.problem",
      solutionKey: "projects.case4.solution",
      impactKey: "projects.case4.impact",
      tags: ["AWS SQS", "AWS SNS Fan-out", "Redis Cache", "High Concurrency"],
    },
  ];

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CASOS DE ESTUDIO &amp; PROYECTOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Cosas Interesantes{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              que He Construido
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Problemas complejos resueltos con arquitectura limpia, sistemas desacoplados e innovación agéntica.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-card/60 border border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Todos ({projects.length})
          </button>
          <button
            onClick={() => setFilter("enterprise")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === "enterprise"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-card/60 border border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Backend de Empresa &amp; EDA</span>
          </button>
          <button
            onClick={() => setFilter("personal")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === "personal"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-card/60 border border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Proyectos IA &amp; Hardware</span>
          </button>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((proj) => (
              <motion.article
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-md hover:border-primary/50 transition-all flex flex-col justify-between text-left group relative overflow-hidden"
              >
                <div>
                  {/* Category & Tags Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                      {t(proj.tagKey)}
                    </span>
                    {proj.featured && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
                        ★ Destacado
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">
                    {t(proj.titleKey)}
                  </h3>

                  {/* Problem / Solution / Impact Structured Snippets */}
                  <div className="space-y-3 mb-6 text-xs sm:text-sm leading-relaxed">
                    <div className="p-3 rounded-xl bg-background/50 border border-border/40">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-1 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Problema / Reto:</span>
                      </div>
                      <p className="text-muted-foreground">{t(proj.problemKey)}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-background/50 border border-border/40">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold mb-1 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Solución Arquitectónica:</span>
                      </div>
                      <p className="text-muted-foreground">{t(proj.solutionKey)}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-500/30">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold mb-1 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Impacto Auditado:</span>
                      </div>
                      <p className="text-emerald-950 dark:text-emerald-200 font-medium">{t(proj.impactKey)}</p>
                    </div>
                  </div>
                </div>

                {/* Footer with Tags and Buttons */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mb-4">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-background/80 border border-border/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-semibold text-primary hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Ver ficha detallada</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-card border border-border/60 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 text-xs font-mono"
                        aria-label={`Ver código de ${t(proj.titleKey)} en GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-background/80 text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-xs font-mono text-primary font-semibold mb-2">
                  {t(selectedProject.tagKey)}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t(selectedProject.titleKey)}
                </h3>

                <div className="space-y-4 text-sm leading-relaxed mb-6">
                  <div>
                    <h4 className="font-mono text-xs text-amber-700 dark:text-amber-400 font-semibold mb-1">
                      EL PROBLEMA DE NEGOCIO:
                    </h4>
                    <p className="text-muted-foreground">{t(selectedProject.problemKey)}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-cyan-700 dark:text-cyan-400 font-semibold mb-1">
                      LA SOLUCIÓN TÉCNICA:
                    </h4>
                    <p className="text-muted-foreground">{t(selectedProject.solutionKey)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-500/30">
                    <h4 className="font-mono text-xs text-emerald-800 dark:text-emerald-400 font-bold mb-1">
                      EL RESULTADO / MÉTRICA:
                    </h4>
                    <p className="text-emerald-950 dark:text-emerald-200 font-medium">{t(selectedProject.impactKey)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-background border border-border text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold font-mono bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-2"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Ver Repositorio GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-card text-foreground cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
