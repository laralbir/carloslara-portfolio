import React from "react";
import { Terminal, ShieldCheck, Zap, Globe, Cpu, Bot } from "lucide-react";

export const TelemetryTicker: React.FC = () => {
  return (
    <aside
      className="w-full bg-background/80 border-b border-border/40 py-1.5 px-3 sm:px-4 text-[10px] sm:text-[11px] font-mono text-muted-foreground backdrop-blur-md overflow-hidden z-40 select-none"
      aria-label="Telemetry diagnostics"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
          <span className="inline-flex items-center gap-1 text-primary font-semibold shrink-0">
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">carlos@edge:~$</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold shrink-0">
            <Bot className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">100% AI AGENTS (SDD)</span>
            <span className="sm:hidden">100% IA (SDD)</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-foreground">ONLINE<span className="hidden sm:inline"> · 200 OK</span></span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>AUDITED REVERTS: 0</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground shrink-0">
          <span className="hidden md:inline-flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>ARCH: EVENT-DRIVEN EDA</span>
          </span>
          <span className="hidden lg:inline-flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>UPTIME: 99.99%</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">VALENCIA, ES</span>
            <span className="sm:hidden text-[10px]">VALENCIA</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
