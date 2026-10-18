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
      title: "Sistemas Distribuidos & Alta Concurrencia",
      subtitle: "Event-Driven EDA · AWS SQS / SNS / EventBridge · Microservicios",
      desc: "Más de dos décadas proyectando infraestructuras tolerantes a fallos, colas asíncronas desacopladas y pipelines de ingesta intensiva con cero degradación de latencia.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-cyan-400" />,
      title: "Ingeniería Agéntica & Flujos IA Reales",
      subtitle: "Claude Code CLI · MCP Servers · Cero Código al Azar",
      desc: "Pionero en desarrollo aumentado con agentes autónomos. No uso la IA como un simple chatbot, sino como un equipo de especialistas orquestados bajo especificaciones formales.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: "Fiabilidad Auditada & 0 Reverts",
      subtitle: "341 PRs Merged · TDD Estricto · Arquitectura Hexagonal",
      desc: "Diseño con principios Domain-Driven Design (DDD) y tipado estricto. La calidad no es negociable cuando el software procesa transacciones críticas de clientes reales.",
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-400" />,
      title: "Sincronización en Tiempo Real & Motores OTA",
      subtitle: "211 Instancias en 11 Días · Conectividad Crítica",
      desc: "Especialista en resolver el problema más difícil del backend: sincronizar inventario, precios y reservas bidireccionales en tiempo real sin desincronizaciones.",
    },
  ];

  const tabContent = {
    vision: {
      title: "Uniendo 20 años de artesanía backend con la era agéntica",
      p1: "Llevo programando y levantando arquitecturas desde antes de que existiera la nube como la conocemos hoy. He visto modas nacer y morir, pero los fundamentos permanecen: desacoplamiento, idempotencia, resiliencia y claridad de dominio.",
      p2: "Hoy no peleo contra las herramientas de Inteligencia Artificial: las integro en el corazón de mi flujo diario a través de Claude Code y el protocolo MCP, logrando un ritmo de entrega de 10x sin sacrificar ni un ápice de rigor técnico.",
    },
    architecture: {
      title: "Arquitecturas que escalan bajo fuego real",
      p1: "Mi enfoque se basa en Clean Architecture y Event-Driven Design. Cada servicio posee responsabilidades atómicas, comunica eventos asíncronos mediante AWS EventBridge o SQS, y garantiza que un pico inesperado nunca tumbe el core del negocio.",
      p2: "Desde bases de datos SQL relacionales altamente normalizadas hasta NoSQL optimizado para alta lectura, selecciono la herramienta precisa para cada necesidad de negocio.",
    },
    methodology: {
      title: "Spec-Driven Development: Cero alucinaciones, 100% código verificado",
      p1: "Bajo la metodología SDD, el código es el subproducto de una especificación impecable. Antes de tirar una sola línea, completamos Análisis, Plan de Arquitectura y Desglose Atómico de Tareas.",
      p2: "Cada pull request pasa por pruebas automatizadas TDD (Red -> Green -> Refactor), análisis de seguridad y verificación de rendimiento antes de llegar a producción.",
    },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PILICHI &amp; PILARES DE EXPERIENCIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Ingeniería de Backend Robusta,{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Potenciada por Agentes Autónomos
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Más de dos décadas resolviendo problemas complejos de escala, concurrencia y datos en producción.
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
              🎯 Visión &amp; Trayectoria
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "architecture"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              ⚡ Filosofía de Arquitectura
            </button>
            <button
              onClick={() => setActiveTab("methodology")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "methodology"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              🛠️ SDD &amp; Flujos Agénticos
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
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Formatos preparados para evaluadores técnicos y motores ATS/IA</span>
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
