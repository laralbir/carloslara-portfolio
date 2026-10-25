import React from "react";
import { Mail, FileText, Bot, ShieldCheck, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-primary-foreground font-mono text-sm font-bold">
                CL
              </div>
              <span className="text-lg font-bold tracking-tight">Carlos Lara Albir</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {t("footer.desc") ||
                "Agentic Engineer & Senior Backend Architect. Diseñando sistemas distribuidos resilientes, sincronización en tiempo real y flujos agénticos guiados por Spec-Driven Development (SDD)."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/laralbir"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/carlos-lara-albir-687277a4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@carloslara.dev"
                className="p-2 rounded-lg bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Email Carlos Lara"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-4">
              {t("footer.navTitle") || "Navegación"}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  {t("nav.home") || "Perfil"}
                </a>
              </li>
              <li>
                <a href="#sdd" className="hover:text-primary transition-colors">
                  {t("nav.aiSdd") || "IA & SDD"}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors">
                  {t("nav.projects") || "Proyectos"}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary transition-colors">
                  {t("nav.skills") || "Stack Tecnológico"}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-primary transition-colors">
                  {t("nav.experience") || "Trayectoria"}
                </a>
              </li>
              <li>
                <a href="#offtopic" className="hover:text-primary transition-colors">
                  {t("nav.offtopic") || "Aficiones"}
                </a>
              </li>
            </ul>
          </div>

          {/* AI & Machine-Readable Resumes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-4 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-primary" />
              <span>{t("footer.aiTitle") || "Machine-Readable (AI)"}</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono text-xs">
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>/llms.txt (AI Brief)</span>
                </a>
              </li>
              <li>
                <a
                  href="/llms-full.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>/llms-full.txt (Full Corpus)</span>
                </a>
              </li>
              <li>
                <a
                  href="/cv.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>/cv.md (Markdown CV)</span>
                </a>
              </li>
              <li className="pt-2 flex flex-col gap-1.5">
                <div className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/80 bg-background/50 px-2 py-1 rounded border border-border/40">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>0 LLM Hallucinations</span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 font-mono">
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span>100% Autonomous AI Agents</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; {currentYear} Carlos Lara Albir. {t("footer.rights") || "Todos los derechos reservados."}</span>
            <span className="hidden sm:inline text-border">·</span>
            <span className="inline-flex items-center gap-1.5 text-primary font-mono font-medium">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t("footer.builtWith") || "Diseñado y desarrollado al 100% con IA agéntica y Spec-Driven Development."}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{t("footer.edgePowered") || "GitHub Pages"}</span>
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              aria-label={t("footer.backToTop") || "Volver arriba"}
            >
              <span>{t("footer.backToTop") || "Subir"}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
