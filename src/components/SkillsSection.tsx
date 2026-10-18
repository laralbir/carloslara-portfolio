import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Server,
  Bot,
  Database,
  Cloud,
  Smartphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SkillItem {
  name: string;
  level: number;
  category: "backend" | "ai" | "data" | "cloud" | "mobile";
  tags: string[];
}

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const skills: SkillItem[] = [
    // Backend
    { name: "Node.js & TypeScript", level: 98, category: "backend", tags: ["Async", "Hexagonal", "Streams"] },
    { name: "Event-Driven EDA (AWS SQS / SNS / EventBridge)", level: 96, category: "backend", tags: ["Fanout", "Idempotency", "DLQ"] },
    { name: "Arquitectura Hexagonal & DDD", level: 95, category: "backend", tags: ["Domain Core", "Ports & Adapters"] },
    { name: "PHP & Enterprise Modern Legacy", level: 92, category: "backend", tags: ["Clean PHP", "High Performance"] },
    { name: "Microservicios & APIs RESTful", level: 95, category: "backend", tags: ["OpenAPI", "Zero-Downtime"] },

    // AI & Agentic
    { name: "Claude Code CLI & Terminal Workflow", level: 96, category: "ai", tags: ["Autonomous Agents", "Prompt Architecture"] },
    { name: "Model Context Protocol (MCP)", level: 95, category: "ai", tags: ["Custom Tooling", "Context Orchestration"] },
    { name: "Spec-Driven Development (SDD)", level: 98, category: "ai", tags: ["Formal Specs", "0 Hallucinations", "DoD"] },
    { name: "Google Antigravity & Pair-Programming IA", level: 92, category: "ai", tags: ["Multi-Agent Teams", "Automated Workflows"] },

    // Databases & Caching
    { name: "PostgreSQL & Relational SQL", level: 90, category: "data", tags: ["Indexing", "Transactions", "Query Optimization"] },
    { name: "MongoDB & Document Stores", level: 92, category: "data", tags: ["Aggregation", "Sharding Patterns"] },
    { name: "Microsoft SQL Server", level: 88, category: "data", tags: ["Stored Procs", "High Traffic Engine"] },
    { name: "Redis & In-Memory Caching", level: 90, category: "data", tags: ["PubSub", "Distributed Locks"] },

    // Cloud & DevOps
    { name: "AWS Cloud Infrastructure (EC2, SQS, S3, IAM)", level: 92, category: "cloud", tags: ["CloudWatch", "EventBridge"] },
    { name: "Cloudflare Workers, Pages & Edge Runtime", level: 90, category: "cloud", tags: ["Edge Functions", "Wrangler"] },
    { name: "Docker & Container Orchestration", level: 88, category: "cloud", tags: ["Compose", "Multi-stage Builds"] },
    { name: "Test-Driven Development (TDD) & Vitest", level: 95, category: "cloud", tags: ["Red/Green/Refactor", "Automated CI"] },

    // Mobile
    { name: "Android Nativo (Kotlin & Jetpack Compose)", level: 82, category: "mobile", tags: ["Coroutines", "StateFlow", "Material 3"] },
  ];

  const categories = [
    { id: "all", label: "Todo el Stack", icon: Code },
    { id: "backend", label: "Backend & EDA", icon: Server },
    { id: "ai", label: "Ingeniería Agéntica & MCP", icon: Bot },
    { id: "data", label: "Bases de Datos & Caché", icon: Database },
    { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
    { id: "mobile", label: "Android Kotlin", icon: Smartphone },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARSENAL TECNOLÓGICO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Competencias Técnicas &amp;{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Herramientas de Maestría
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Un stack consolidado tras más de 20 años resolviendo cuellos de botella reales en infraestructuras de misión crítica.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 scale-105"
                    : "bg-card/60 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="p-5 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-md hover:border-primary/40 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-foreground">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono font-semibold text-primary">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Skill Level Bar */}
                <div className="w-full h-2 rounded-full bg-border/40 overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {/* Subtags */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-background/80 border border-border/50 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
