import React, { useState, useEffect, useRef } from "react";
import { Wind, Flame } from "lucide-react";

interface SmokePuff {
  id: number;
  className: string;
}

export const MotoThrottle: React.FC = () => {
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [smokePuffs, setSmokePuffs] = useState<SmokePuff[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerAcceleration = () => {
    setIsAccelerating(true);

    // Create smoke puffs from the right-side exhaust
    const puffs: SmokePuff[] = [
      { id: Date.now() + 1, className: "smoke-puff-1" },
      { id: Date.now() + 2, className: "smoke-puff-2" },
      { id: Date.now() + 3, className: "smoke-puff-3" },
      { id: Date.now() + 4, className: "smoke-puff-4" },
    ];
    setSmokePuffs(puffs);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsAccelerating(false);
      setSmokePuffs([]);
    }, 1800);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-card/60 rounded-2xl border border-border/70 select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <span>🏍️ Ruta de Montaña · Perspectiva Trasera</span>
        </div>
        <div className="text-[11px] font-mono">
          <span className={isAccelerating ? "text-amber-400 font-bold animate-pulse" : "text-muted-foreground"}>
            {isAccelerating ? "¡¡GASSS!!" : "Velocidad Crucero"}
          </span>
        </div>
      </div>

      {/* Main Interactive Road & Motorcycle Scene */}
      <div
        onClick={triggerAcceleration}
        className={`moto-scene relative w-full h-56 rounded-2xl bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border border-border/80 flex items-center justify-center overflow-hidden cursor-pointer shadow-xl ${
          isAccelerating ? "is-accelerating" : ""
        }`}
        role="button"
        tabIndex={0}
        aria-label="Acelerar moto de aventura en carretera"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerAcceleration();
          }
        }}
      >
        {/* Alpine Mountain Silhouette */}
        <svg
          width="240"
          height="80"
          viewBox="0 0 220 70"
          fill="none"
          className="moto-mountains absolute top-3 opacity-40 pointer-events-none"
          aria-hidden="true"
        >
          <polygon points="10,70 60,25 90,50 140,15 190,60 215,70" fill="#38bdf8" />
          <polygon points="140,15 160,32 170,28" fill="#ffffff" opacity="0.8" />
          <polygon points="60,25 75,38 85,32" fill="#ffffff" opacity="0.8" />
        </svg>

        {/* Moving Perspective Road */}
        <div className="moto-road-perspective absolute bottom-0 w-full pointer-events-none" aria-hidden="true">
          <div className="moto-road-line"></div>
        </div>

        {/* Touring Adventure Motorcycle (Rear View into Perspective Road) */}
        <div className="moto-rear-view absolute pointer-events-none">
          <svg
            className="moto-rear-svg"
            width="100"
            height="88"
            viewBox="0 0 100 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shadow on road */}
            <ellipse cx="50" cy="80" rx="36" ry="6" fill="#000000" opacity="0.5" />
            {/* Windshield */}
            <path d="M43 14L45 4H55L57 14L43 14Z" fill="#38bdf8" opacity="0.55" />
            {/* Rearview Mirrors */}
            <circle cx="16" cy="18" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />
            <circle cx="84" cy="18" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />
            <path d="M21 20L34 26M79 20L66 26" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            {/* Handlebars */}
            <path d="M24 25H76" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
            {/* Rider Helmet (Shoei Profile) */}
            <ellipse cx="50" cy="20" rx="10" ry="11" fill="#1e293b" />
            <path d="M42 22C44 26 56 26 58 22" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M44 14C47 12 53 12 56 14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            {/* Rider Jacket & Shoulders with Hi-Vis Accents */}
            <path d="M30 38C30 30 40 28 50 28C60 28 70 30 70 38L66 48H34L30 38Z" fill="#0f172a" />
            <path d="M34 37C42 41 58 41 66 37" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
            {/* Left Adventure Aluminum Pannier */}
            <rect x="12" y="44" width="22" height="28" rx="2.5" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="15" y1="52" x2="31" y2="52" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="15" y1="60" x2="31" y2="60" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="17" cy="67" r="2" fill="#ef4444" />
            {/* Right Adventure Aluminum Pannier */}
            <rect x="66" y="44" width="22" height="28" rx="2.5" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="69" y1="52" x2="85" y2="52" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="69" y1="60" x2="85" y2="60" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="83" cy="67" r="2" fill="#ef4444" />
            {/* Center Fairing (Metallic Blue) */}
            <path d="M36 46L44 40H56L64 46L58 64H42L36 46Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            {/* Exhaust Pipe (Right Side) */}
            <rect x="58" y="52" width="7" height="18" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
            <ellipse cx="61.5" cy="70" rx="2.5" ry="1.5" fill="#0f172a" />
            {/* Wide Dual-Sport Rear Tire */}
            <rect x="42" y="54" width="16" height="26" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="44" y1="60" x2="56" y2="64" stroke="#334155" strokeWidth="1.5" />
            <line x1="56" y1="68" x2="44" y2="72" stroke="#334155" strokeWidth="1.5" />
            {/* Central LED Red Tail-Light (Glowing) */}
            <polygon points="44,46 56,46 54,52 46,52" fill="#ef4444" className="moto-taillight" />
            {/* Turn Signals */}
            <rect x="29" y="47" width="5" height="3" rx="1" fill="#f59e0b" />
            <rect x="66" y="47" width="5" height="3" rx="1" fill="#f59e0b" />
          </svg>
        </div>

        {/* Exhaust Smoke Puffs */}
        <div className="moto-exhaust-smoke absolute pointer-events-none" aria-hidden="true">
          {smokePuffs.map((puff) => (
            <span key={puff.id} className={`smoke-puff ${puff.className}`}>
              💨
            </span>
          ))}
        </div>

        {/* Feedback Badge Ticker */}
        {isAccelerating && (
          <div className="moto-feedback is-active absolute top-2.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/50 text-cyan-300 font-mono text-xs shadow-lg animate-fade-in">
            <span>💨 ¡Gasss! Acelerando 🏍️</span>
          </div>
        )}
      </div>

      {/* Action Trigger Button */}
      <button
        onClick={triggerAcceleration}
        className={`w-full mt-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isAccelerating
            ? "bg-gradient-to-r from-cyan-500 to-primary text-neutral-950 shadow-lg shadow-cyan-500/20 scale-[0.99]"
            : "bg-background/80 border border-border/80 text-foreground hover:border-cyan-400/60"
        }`}
      >
        <Wind className="w-4 h-4 text-cyan-400" />
        <span>{isAccelerating ? "¡¡ACELERANDO A FONDO!!" : "Clic para dar Gasss y Tirar Humo"}</span>
      </button>
    </div>
  );
};
