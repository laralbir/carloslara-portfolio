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

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const ExperienceTimeline: React.FC = () => {
  const { t } = useLanguage();

  const experiences: ExperienceItem[] = [
    {
      company: "Avantio",
      role: "Senior Backend Architect & Referente Técnico de Conectividad",
      period: "2018 – Actualidad (7+ años)",
      location: "Valencia, España · Híbrido",
      type: "Misión Crítica / PropTech & Channel Manager",
      description:
        "Liderazgo en diseño y escalado de motores de sincronización bidireccional en tiempo real con OTAs líderes (Booking, Airbnb, Expedia, Vrbo), procesando millones de eventos diarios con tolerancia a fallos extrema.",
      highlights: [
        "Arquitectura orientada a eventos (EDA) desacoplada con AWS SQS, SNS y EventBridge, reduciendo overbookings a cero.",
        "Migración masiva de 211 instancias de empresas en solo 11 días con cero tiempo de inactividad.",
        "Implementación pionera de desarrollo agéntico con Claude Code y servidor MCP propio para diagnóstico en vivo.",
        "Cumplimiento y certificación de estándares de seguridad PCI-DSS y tokenización bancaria.",
        "341 PRs mergeados con 0 reverts auditados bajo estricto TDD y Domain-Driven Design.",
      ],
      technologies: ["Node.js", "TypeScript", "AWS SQS/SNS", "PHP Moderno", "MongoDB", "SQL Server", "Claude Code", "MCP", "SDD"],
    },
    {
      company: "Hotetec",
      role: "Senior Backend Developer & Channel Manager Integrations",
      period: "2016 – 2018 (2 años)",
      location: "Valencia, España",
      type: "Hospitality Tech / Booking Engines",
      description:
        "Desarrollo e integración de motores de reservas hoteleras y conectividad directa XML/JSON de alta velocidad.",
      highlights: [
        "Optimización de pasarelas de pago y tarificación dinámica multidivisa.",
        "Reducción de latencias en consultas de disponibilidad mediante optimización de consultas SQL y capas de caché.",
      ],
      technologies: ["PHP", "MySQL", "APIs RESTful", "XML / SOAP", "Linux", "Apache/Nginx"],
    },
    {
      company: "Iquord & Proyectos Empresariales",
      role: "Arquitecto de Software & Consultor Backend",
      period: "2004 – 2016 (12 años)",
      location: "Valencia, España",
      type: "Enterprise ERP / POSCRM / Business Intelligence",
      description:
        "Más de una década forjando bases sólidas en ingeniería bare-metal, normalización de datos relacionales, trazabilidad contable y sistemas de punto de venta y gestión empresarial.",
      highlights: [
        "Diseño e implantación de software de gestión integral (ERP/CRM) para cadenas comerciales y distribución.",
        "Optimización profunda de stored procedures, índices y agregaciones en bases de datos relacionales de alta carga.",
        "Transición de arquitecturas tradicionales hacia entornos web modernos de alta disponibilidad.",
      ],
      technologies: ["SQL Server", "MySQL", "PHP", "Modelado Relacional", "Linux", "Sistemas Bare-Metal"],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRAYECTORIA &amp; BATALLAS GANADAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            20+ Años de Backend{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              en Producción Real
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Una trayectoria forjada desde el bare-metal hasta las arquitecturas distribuidas orientadas a eventos y la inteligencia artificial agéntica.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-primary/30 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
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
                      {exp.company}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role */}
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3">
                  {exp.role}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
          ))}
        </div>
      </div>
    </section>
  );
};
