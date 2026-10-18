import React from "react";
import { Terminal, ShieldCheck, Zap, Globe, Cpu, Bot } from "lucide-react";

export const TelemetryTicker: React.FC = () => {
  return (
    <aside
      className="w-full bg-background/80 border-b border-border/40 py-1.5 px-4 text-[11px] font-mono text-muted-foreground backdrop-blur-md overflow-x-auto whitespace-nowrap scrollbar-none z-40"
      aria-label="Telemetry diagnostics"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>carlos@edge:~$</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>100% AI AGENTS (SDD)</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-foreground">ONLINE · 200 OK</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>AUDITED REVERTS: 0</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="hidden md:inline-flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>ARCH: EVENT-DRIVEN EDA</span>
          </span>
          <span className="hidden lg:inline-flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>UPTIME: 99.99%</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>VALENCIA, ES</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
