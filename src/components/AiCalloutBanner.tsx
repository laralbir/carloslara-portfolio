import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Info,
  X,
  FileCode2,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const AiCalloutBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const scrollToSdd = () => {
    setIsModalOpen(false);
    const sddElement = document.getElementById("sdd");
    if (sddElement) {
      sddElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Agentic AI Development Disclosure"
      className="relative z-20 px-4 sm:px-6 lg:px-8 py-6 mt-2 sm:-mt-6 mb-4 max-w-7xl mx-auto w-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card/95 via-primary/[0.07] to-cyan-500/[0.08] dark:from-card/90 dark:via-primary/[0.12] dark:to-cyan-950/40 border border-primary/30 shadow-xl backdrop-blur-xl p-5 sm:p-7 transition-all hover:border-primary/50">
        {/* Subtle decorative glow accents without negative overflow margins */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Main Info Box */}
          <div className="flex items-start gap-4 sm:gap-5 flex-1">
            {/* Glowing Bot Icon */}
            <div className="relative shrink-0 mt-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-cyan-500 to-emerald-400 p-[1px] shadow-lg shadow-primary/20">
                <div className="w-full h-full rounded-[11px] bg-background/90 flex items-center justify-center text-primary">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>

            {/* Content & Badges */}
            <div className="space-y-2.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {/* Main 100% Agentic AI Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-mono text-xs font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t("aiCallout.tag") || "100% IA Agéntica & SDD"}</span>
                </div>

                {/* 0 Hallucinations Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  {t("aiCallout.badgeZero") || "0 Alucinaciones"}
                </span>

                {/* 100% Verified Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  {t("aiCallout.badgeVerified") || "100% Verificado"}
                </span>

                {/* Cloudflare Edge Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-semibold">
                  Cloudflare Edge ⚡
                </span>
              </div>

              {/* Message */}
              <p className="text-sm sm:text-[15px] text-foreground/90 font-sans leading-relaxed max-w-3xl">
                {t("aiCallout.message") ||
                  "Esta web no la piqué a mano línea a línea: la modelé, especifiqué y programé con agentes autónomos (Claude Code + Antigravity) siguiendo Spec-Driven Development estricto. Cero alucinaciones, 100% código verificado."}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-card border border-border/80 hover:border-primary/50 text-foreground hover:text-primary transition-all shadow-sm cursor-pointer"
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
            >
              <Info className="w-4 h-4 text-primary" />
              <span>{t("aiCallout.infoBtn") || "Cómo se hizo (SDD)"}</span>
            </button>

            <a
              href="https://github.com/laralbir/carloslara-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-primary-foreground shadow-md transition-all cursor-pointer"
            >
              <span>{t("aiCallout.action") || "Cotillea las specs y commits en GitHub ➔"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* SDD Explainer Interactive Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sdd-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-background/80 backdrop-blur-md"
        >
          {/* Modal Backdrop click listener */}
          <div
            className="fixed inset-0"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-card border border-border/80 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden text-left"
          >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3
                    id="sdd-modal-title"
                    className="text-lg sm:text-xl font-bold text-foreground"
                  >
                    {t("aiCallout.modalTitle") || "Cómo se parió esta web con IA & SDD"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {t("aiCallout.modalDesc") ||
                  "En Spec-Driven Development (SDD), el código no es donde empieza el trabajo: es el resultado final de pensar y especificar muy bien el problema. Nada de 'pruébate esto a ver si compila'; aquí cada commit responde a una tarea atómica con criterios de aceptación claros."}
              </p>

              {/* 4 Steps Breakdown */}
              <div className="mt-6 space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-background/70 border-l-4 border-l-primary border border-border/40 text-foreground">
                  <span className="font-bold text-primary mr-1.5">[FASE 01]</span>
                  {t("aiCallout.modalStep1") ||
                    "01. Análisis: Quién soy, números reales sin humo, qué busco y especificaciones claras."}
                </div>
                <div className="p-3.5 rounded-xl bg-background/70 border-l-4 border-l-cyan-400 border border-border/40 text-foreground">
                  <span className="font-bold text-cyan-400 mr-1.5">[FASE 02]</span>
                  {t("aiCallout.modalStep2") ||
                    "02. Plan: Arquitectura técnica, i18n, estilos sin librerías pesadas y despliegue continuo en Cloudflare Pages."}
                </div>
                <div className="p-3.5 rounded-xl bg-background/70 border-l-4 border-l-amber-400 border border-border/40 text-foreground">
                  <span className="font-bold text-amber-400 mr-1.5">[FASE 03]</span>
                  {t("aiCallout.modalStep3") ||
                    "03. Task: Despiece en tareas pequeñas con Definition of Done (DoD) estricto."}
                </div>
                <div className="p-3.5 rounded-xl bg-background/70 border-l-4 border-l-emerald-400 border border-border/40 text-foreground">
                  <span className="font-bold text-emerald-400 mr-1.5">[FASE 04]</span>
                  {t("aiCallout.modalStep4") ||
                    "04. Implement: Código limpio, tests automáticos, 100/100 en Lighthouse y push continuo."}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-8 pt-5 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={scrollToSdd}
                  className="w-full sm:w-auto text-xs font-mono text-primary hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileCode2 className="w-4 h-4" />
                  <span>Explorar sección SDD interactiva</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/laralbir/carloslara-portfolio/tree/preview/specs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md cursor-pointer"
                >
                  <span>{t("aiCallout.modalLink") || "Ver las carpetas de especificaciones en GitHub ➔"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
        </div>
      )}
    </section>
  );
};
