import React, { useState, useEffect, useRef } from "react";
import { Wind, Flame } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SmokePuff {
  id: number;
  className: string;
}

export const MotoThrottle: React.FC = () => {
  const { t } = useLanguage();
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
          <span>{t("offtopic.motoGame.sceneTitle") || "🏍️ Ruta de Montaña · Perspectiva Trasera"}</span>
        </div>
        <div className="text-[11px] font-mono">
          <span className={isAccelerating ? "text-amber-400 font-bold animate-pulse" : "text-muted-foreground"}>
            {isAccelerating ? (t("offtopic.motoGame.accelerating") || "¡¡GASSS!!") : (t("offtopic.motoGame.cruising") || "Velocidad Crucero")}
          </span>
        </div>
      </div>

      {/* Main Interactive Road & Motorcycle Scene */}
      <div
        onClick={triggerAcceleration}
        style={{ height: "220px", minHeight: "220px" }}
        className={`moto-scene relative w-full h-[220px] rounded-2xl bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border border-border/80 flex items-center justify-center overflow-hidden cursor-pointer shadow-xl ${
          isAccelerating ? "is-accelerating" : ""
        }`}
        role="button"
        tabIndex={0}
        aria-label={t("offtopic.motoGame.throttleHint") || "Acelerar moto de aventura en carretera"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerAcceleration();
          }
        }}
      >
        {/* Alpine Mountain Silhouette, Green Slopes & Pine Forests */}
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="moto-mountains pointer-events-none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Sky Night Stars */}
          <circle cx="40" cy="25" r="1" fill="#ffffff" />
          <circle cx="110" cy="15" r="1.2" fill="#67e8f9" />
          <circle cx="180" cy="35" r="1" fill="#ffffff" />
          <circle cx="290" cy="20" r="1.2" fill="#a5f3fc" />
          <circle cx="360" cy="28" r="1" fill="#ffffff" />
          <circle cx="320" cy="45" r="0.8" fill="#ffffff" />

          {/* Layer 1: Distant Majestic Peaks (100% Solid, No Transparency) */}
          {/* Peak Far Left */}
          <polygon points="-30,120 40,42 115,120" fill="#1e3a5f" />
          <polygon points="40,42 58,62 50,58 42,64 34,59 26,62" fill="#ffffff" />

          {/* Peak Left High */}
          <polygon points="15,125 90,20 180,125" fill="#1d4ed8" />
          <polygon points="90,20 180,125 120,125" fill="#1e3a8a" />
          <polygon points="90,20 115,52 106,46 94,56 80,48 68,54" fill="#ffffff" />
          <polygon points="90,20 115,52 106,46 94,56" fill="#cbd5e1" />

          {/* Peak Far Right */}
          <polygon points="270,125 350,34 425,125" fill="#1e3a5f" />
          <polygon points="350,34 370,54 362,50 350,57 338,51 328,55" fill="#ffffff" />

          {/* Peak Center-Right Main Summit */}
          <polygon points="115,125 230,10 355,125" fill="#0284c7" />
          <polygon points="230,10 355,125 250,125" fill="#0369a1" />
          <polygon points="230,10 264,46 250,38 234,50 216,40 200,46" fill="#ffffff" />
          <polygon points="230,10 264,46 250,38 234,50" fill="#94a3b8" />

          {/* Layer 2: Midground Alpine Green Slopes & Hills */}
          {/* Left Mountain Green Slope */}
          <path d="M -10,230 L -10,75 Q 45,55 105,75 Q 155,88 200,110 L 200,230 Z" fill="#15803d" />
          <path d="M -10,75 Q 45,55 105,75 Q 155,88 200,110 L 200,116 Q 155,95 105,82 Q 45,62 -10,82 Z" fill="#22c55e" />

          {/* Right Mountain Green Slope */}
          <path d="M 410,230 L 410,70 Q 345,52 280,72 Q 235,88 200,110 L 200,230 Z" fill="#166534" />
          <path d="M 410,70 Q 345,52 280,72 Q 235,88 200,110 L 200,116 Q 235,95 280,79 Q 345,59 410,77 Z" fill="#15803d" />

          {/* Lower Alpine Meadows beside road */}
          <path d="M -10,230 L -10,120 Q 60,110 135,122 Q 175,128 195,135 L 195,230 Z" fill="#14532d" />
          <path d="M 410,230 L 410,118 Q 330,108 260,120 Q 220,128 205,135 L 205,230 Z" fill="#0d3f22" />

          {/* Layer 3: Silhouette Coniferous Pine Trees */}
          <path d="M 20 60 L 23.75 66 L 22.25 66 L 25.25 72 L 23 72 L 26.75 78 L 13.25 78 L 17 72 L 14.75 72 L 17.75 66 L 16.25 66 Z" fill="#022c22" />
          <path d="M 38 54 L 42.5 61.2 L 40.7 61.2 L 44.3 68.4 L 41.6 68.4 L 46.1 75.6 L 29.9 75.6 L 34.4 68.4 L 31.7 68.4 L 35.3 61.2 L 33.5 61.2 Z" fill="#064e3b" />
          <path d="M 56 50 L 61 58 L 59 58 L 63 66 L 60 66 L 65 74 L 47 74 L 52 66 L 49 66 L 53 58 L 51 58 Z" fill="#065f46" />
          <path d="M 75 56 L 79.25 62.8 L 77.55 62.8 L 80.95 69.6 L 78.4 69.6 L 82.65 76.4 L 67.35 76.4 L 71.6 69.6 L 69.05 69.6 L 72.45 62.8 L 70.75 62.8 Z" fill="#064e3b" />
          <path d="M 94 62 L 98.6 69.36 L 96.76 69.36 L 100.44 76.72 L 97.68 76.72 L 102.28 84.08 L 85.72 84.08 L 90.32 76.72 L 87.56 76.72 L 91.24 69.36 L 89.4 69.36 Z" fill="#022c22" />
          <path d="M 114 68 L 118 74.4 L 116.4 74.4 L 119.6 80.8 L 117.2 80.8 L 121.2 87.2 L 106.8 87.2 L 110.8 80.8 L 108.4 80.8 L 111.6 74.4 L 110 74.4 Z" fill="#065f46" />
          <path d="M 134 76 L 138.25 82.8 L 136.55 82.8 L 139.95 89.6 L 137.4 89.6 L 141.65 96.4 L 126.35 96.4 L 130.6 89.6 L 128.05 89.6 L 131.45 82.8 L 129.75 82.8 Z" fill="#064e3b" />
          <path d="M 154 85 L 157.6 90.76 L 156.16 90.76 L 159.04 96.52 L 156.88 96.52 L 160.48 102.28 L 147.52 102.28 L 151.12 96.52 L 148.96 96.52 L 151.84 90.76 L 150.4 90.76 Z" fill="#022c22" />
          <path d="M 174 93 L 177.2 98.12 L 175.92 98.12 L 178.48 103.24 L 176.56 103.24 L 179.76 108.36 L 168.24 108.36 L 171.44 103.24 L 169.52 103.24 L 172.08 98.12 L 170.8 98.12 Z" fill="#065f46" />
          <path d="M 188 99 L 190.6 103.16 L 189.56 103.16 L 191.64 107.32 L 190.08 107.32 L 192.68 111.48 L 183.32 111.48 L 185.92 107.32 L 184.36 107.32 L 186.44 103.16 L 185.4 103.16 Z" fill="#064e3b" />
          <path d="M 212 99 L 214.6 103.16 L 213.56 103.16 L 215.64 107.32 L 214.08 107.32 L 216.68 111.48 L 207.32 111.48 L 209.92 107.32 L 208.36 107.32 L 210.44 103.16 L 209.4 103.16 Z" fill="#064e3b" />
          <path d="M 226 93 L 229.2 98.12 L 227.92 98.12 L 230.48 103.24 L 228.56 103.24 L 231.76 108.36 L 220.24 108.36 L 223.44 103.24 L 221.52 103.24 L 224.08 98.12 L 222.8 98.12 Z" fill="#065f46" />
          <path d="M 246 83 L 249.9 89.24 L 248.34 89.24 L 251.46 95.48 L 249.12 95.48 L 253.02 101.72 L 238.98 101.72 L 242.88 95.48 L 240.54 95.48 L 243.66 89.24 L 242.1 89.24 Z" fill="#022c22" />
          <path d="M 268 73 L 272.4 80.04 L 270.64 80.04 L 274.16 87.08 L 271.52 87.08 L 275.92 94.12 L 260.08 94.12 L 264.48 87.08 L 261.84 87.08 L 265.36 80.04 L 263.6 80.04 Z" fill="#064e3b" />
          <path d="M 290 65 L 294.9 72.84 L 292.94 72.84 L 296.86 80.68 L 293.92 80.68 L 298.82 88.52 L 281.18 88.52 L 286.08 80.68 L 283.14 80.68 L 287.06 72.84 L 285.1 72.84 Z" fill="#065f46" />
          <path d="M 312 55 L 316.1 61.56 L 314.46 61.56 L 317.74 68.12 L 315.28 68.12 L 319.38 74.68 L 304.62 74.68 L 308.72 68.12 L 306.26 68.12 L 309.54 61.56 L 307.9 61.56 Z" fill="#022c22" />
          <path d="M 335 48 L 339.6 55.36 L 337.76 55.36 L 341.44 62.72 L 338.68 62.72 L 343.28 70.08 L 326.72 70.08 L 331.32 62.72 L 328.56 62.72 L 332.24 55.36 L 330.4 55.36 Z" fill="#064e3b" />
          <path d="M 358 52 L 362.4 59.04 L 360.64 59.04 L 364.16 66.08 L 361.52 66.08 L 365.92 73.12 L 350.08 73.12 L 354.48 66.08 L 351.84 66.08 L 355.36 59.04 L 353.6 59.04 Z" fill="#065f46" />
          <path d="M 380 60 L 383.9 66.24 L 382.34 66.24 L 385.46 72.48 L 383.12 72.48 L 387.02 78.72 L 372.98 78.72 L 376.88 72.48 L 374.54 72.48 L 377.66 66.24 L 376.1 66.24 Z" fill="#022c22" />
          <path d="M 15 115 L 20.5 123.8 L 18.3 123.8 L 22.7 132.6 L 19.4 132.6 L 24.9 141.4 L 5.1 141.4 L 10.6 132.6 L 7.3 132.6 L 11.7 123.8 L 9.5 123.8 Z" fill="#022c22" />
          <path d="M 40 125 L 46 134.6 L 43.6 134.6 L 48.4 144.2 L 44.8 144.2 L 50.8 153.8 L 29.2 153.8 L 35.2 144.2 L 31.6 144.2 L 36.4 134.6 L 34 134.6 Z" fill="#064e3b" />
          <path d="M 360 122 L 366 131.6 L 363.6 131.6 L 368.4 141.2 L 364.8 141.2 L 370.8 150.8 L 349.2 150.8 L 355.2 141.2 L 351.6 141.2 L 356.4 131.6 L 354 131.6 Z" fill="#065f46" />
          <path d="M 385 112 L 390.5 120.8 L 388.3 120.8 L 392.7 129.6 L 389.4 129.6 L 394.9 138.4 L 375.1 138.4 L 380.6 129.6 L 377.3 129.6 L 381.7 120.8 L 379.5 120.8 Z" fill="#022c22" />
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
            <span>{t("offtopic.motoGame.acceleratingBanner") || "💨 ¡Gasss! Acelerando 🏍️"}</span>
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
        <span>
          {isAccelerating
            ? (t("offtopic.motoGame.fullThrottleHint") || "¡¡ACELERANDO A FONDO!!")
            : (t("offtopic.motoGame.throttleHint") || "Clic para dar Gasss y Tirar Humo")}
        </span>
      </button>
    </div>
  );
};
