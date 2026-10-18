import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitPullRequest,
  ShieldCheck,
  CheckCircle,
  FileCode2,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";

export const SddSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      phase: "FASE 01",
      role: "@analyst",
      gate: "Gate 1 · Análisis",
      title: "Elicitación de Requisitos & Dominio",
      desc: "Especificación formal de objetivos de negocio, números auditados sin humo, restricciones de latencia y casos de uso antes de escribir una sola línea de código.",
      artifact: "specs/01-analisis/SPEC-01.md",
      highlight: "Cero ambigüedad",
    },
    {
      phase: "FASE 02",
      role: "@planner",
      gate: "Gate 2 · Plan de Arquitectura",
      title: "Diseño Técnico & Decisiones ADR",
      desc: "Selección rigurosa de patrones (Event-Driven, Hexagonal), diseño de interfaces, diagramas de secuencia C4 y justificación de stack tecnológico.",
      artifact: "specs/02-plan/PLAN-01.md",
      highlight: "ADRs documentadas",
    },
    {
      phase: "FASE 03",
      role: "@tasker",
      gate: "Gate 3 · Backlog Atómico",
      title: "Desglose Atómico con DoD Estricto",
      desc: "Descomposición de la arquitectura en paquetes de trabajo y tareas atómicas. Cada tarea cuenta con Criterios de Aceptación (AC) y Definición de Terminado verificable.",
      artifact: "specs/03-task/TASK-01.md",
      highlight: "Criterios DoD claros",
    },
    {
      phase: "FASE 04",
      role: "@implementer",
      gate: "Gate 4 · Producción ⚡",
      title: "TDD (Red -> Green -> Refactor)",
      desc: "Desarrollo guiado por pruebas unitarias previas con Vitest, auditoría de seguridad Opengrep, 100/100 Lighthouse y despliegue continuo con 0 reverts.",
      artifact: "tests/*.test.ts & src/",
      highlight: "0 Reverts auditados",
    },
  ];

  return (
    <section id="sdd" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>METODOLOGÍA SDD (SPEC-DRIVEN DEVELOPMENT)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            El Código es el{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Resultado Final
            </span>
            , no el Punto de Partida
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Cómo orquesto agentes autónomos (Claude Code, Antigravity) con ingeniería de software rigurosa para garantizar 0 alucinaciones y código 100% verificado.
          </p>
        </div>

        {/* 4 Phase Stepper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                activeStep === idx
                  ? "bg-card/90 border-primary shadow-xl shadow-primary/10"
                  : "bg-card/40 border-border/60 hover:border-primary/40"
              }`}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                  {step.phase}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {step.role}
                </span>
              </div>

              <h3 className="text-base font-bold text-foreground mb-2">
                {step.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {step.desc}
              </p>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>{step.highlight}</span>
                </span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    activeStep === idx ? "text-primary translate-x-1" : "text-muted-foreground"
                  }`}
                />
              </div>

              {activeStep === idx && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Active Phase Deep Dive Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card/80 border border-primary/30 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 text-left">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-primary font-semibold">
                ARTEFACTO DE REFERENCIA · {steps[activeStep].phase}
              </div>
              <h4 className="text-lg font-bold text-foreground mt-0.5">
                {steps[activeStep].gate} — {steps[activeStep].artifact}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                Todos los documentos de especificación viven en el repositorio para garantizar trazabilidad y reproducibilidad total.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/laralbir/carloslara-portfolio/tree/main/specs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold font-mono bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-2 whitespace-nowrap shadow-md"
          >
            <span>Ver Specs en GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
