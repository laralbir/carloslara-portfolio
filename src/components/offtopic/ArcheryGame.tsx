import React, { useState, useRef, useEffect } from "react";
import { Crosshair, RotateCcw, Target } from "lucide-react";
import { calculateArcheryScore, computeBowTremor, ArcheryScoreResult } from "@/scripts/components/hobby-easter-eggs";
import { useLanguage } from "@/context/LanguageContext";

interface ShotMarker {
  id: number;
  x: number;
  y: number;
  score: number;
}

export const ArcheryGame: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const targetSvgRef = useRef<SVGSVGElement>(null);

  // User's base aim target (follows mouse / touch)
  const baseAimRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Live visor position in SVG coordinates (baseAim + natural muscular tremor)
  const [visorPos, setVisorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const visorPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [shots, setShots] = useState<ShotMarker[]>([]);
  const [lastResult, setLastResult] = useState<ArcheryScoreResult | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  // Tremor animation loop for realistic bow sight sway (active in real browser)
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      (typeof process !== "undefined" && process.env?.NODE_ENV === "test")
    ) {
      return;
    }
    let rafId: number;
    const animateTremor = (time: number) => {
      const tremor = computeBowTremor(time);
      // Tremor adds natural Olympic sway around current aim
      const rawVx = baseAimRef.current.x + tremor.x;
      const rawVy = baseAimRef.current.y + tremor.y;
      const dist = Math.hypot(rawVx, rawVy);
      const maxRadius = 76;
      const vx = dist > maxRadius ? (rawVx / dist) * maxRadius : rawVx;
      const vy = dist > maxRadius ? (rawVy / dist) * maxRadius : rawVy;

      visorPosRef.current = { x: vx, y: vy };
      setVisorPos({ x: vx, y: vy });
      rafId = requestAnimationFrame(animateTremor);
    };
    rafId = requestAnimationFrame(animateTremor);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Update base aim from mouse or touch event in SVG coordinates (-80 to 80)
  const updateAimFromPointer = (clientX: number, clientY: number) => {
    if (!targetSvgRef.current) return;
    const rect = targetSvgRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const scale = 160 / rect.width;

    const rawX = (clientX - centerX) * scale;
    const rawY = (clientY - centerY) * scale;

    const dist = Math.hypot(rawX, rawY);
    const maxRadius = 74;
    const x = dist > maxRadius ? (rawX / dist) * maxRadius : rawX;
    const y = dist > maxRadius ? (rawY / dist) * maxRadius : rawY;

    baseAimRef.current = { x, y };

    // In testing or when RAF is suspended, update visor immediately
    if (typeof process !== "undefined" && process.env?.NODE_ENV === "test") {
      visorPosRef.current = { x, y };
      setVisorPos({ x, y });
    }
  };

  // Shoot arrow: impact is 100% STRICTLY in the exact center of the moving visor
  const handleShoot = () => {
    const finalX = visorPosRef.current.x;
    const finalY = visorPosRef.current.y;

    const result = calculateArcheryScore(finalX, finalY);
    setLastResult(result);
    setTotalScore((prev) => prev + result.score);

    setShots((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: finalX,
        y: finalY,
        score: result.score,
      },
    ]);
  };

  const handleReset = () => {
    setShots([]);
    setLastResult(null);
    setTotalScore(0);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-between p-4 bg-card/60 rounded-2xl border border-border/70 relative select-none"
    >
      {/* Header bar */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
        <div className="flex items-center gap-1.5 text-primary">
          <Target className="w-4 h-4" />
          <span>{t("offtopic.archeryGame.targetTitle") || "Diana WA 50m (Tiro con Arco)"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-foreground font-bold">
            {(t("offtopic.archeryGame.totalScore") || "Total: {score} ({count} flechas)")
              .replace("{score}", String(totalScore))
              .replace("{count}", String(shots.length))}
          </span>
          {shots.length > 0 && (
            <button
              onClick={handleReset}
              className="p-1 rounded hover:bg-background/80 text-muted-foreground hover:text-foreground cursor-pointer"
              title={t("offtopic.archeryGame.resetBtn") || "Limpiar diana"}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Target Container: pointer & touch listeners update base aim; click shoots */}
      <div
        onPointerDown={(e) => updateAimFromPointer(e.clientX, e.clientY)}
        onPointerMove={(e) => updateAimFromPointer(e.clientX, e.clientY)}
        onClick={handleShoot}
        className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-crosshair group touch-none select-none"
        title={t("offtopic.archeryGame.aimHint") || "Haz clic o toca para disparar al centro del visor"}
      >
        <svg
          ref={targetSvgRef}
          viewBox="-80 -80 160 160"
          className="w-full h-full drop-shadow-xl"
        >
          {/* Target Rings */}
          {/* White 1-2 */}
          <circle cx="0" cy="0" r="77" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="0" cy="0" r="70" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* Black 3-4 */}
          <circle cx="0" cy="0" r="63" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <circle cx="0" cy="0" r="56" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          {/* Blue 5-6 */}
          <circle cx="0" cy="0" r="49" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
          <circle cx="0" cy="0" r="42" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
          {/* Red 7-8 */}
          <circle cx="0" cy="0" r="35" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
          <circle cx="0" cy="0" r="28" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
          {/* Gold 9-10-X */}
          <circle cx="0" cy="0" r="21" fill="#facc15" stroke="#eab308" strokeWidth="1" />
          <circle cx="0" cy="0" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="0" cy="0" r="6" fill="#eab308" stroke="#a16207" strokeWidth="1" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#713f12" strokeWidth="0.8" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#713f12" strokeWidth="0.8" />

          {/* Shot Markers (Punctures): rendered at exact shot coordinates */}
          {shots.map((shot, idx) => {
            const isLatest = idx === shots.length - 1;
            return (
              <g key={shot.id} transform={`translate(${shot.x}, ${shot.y})`}>
                {isLatest && (
                  <circle cx="0" cy="0" r="4.5" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
                )}
                <circle cx="0" cy="0" r="2.8" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
                <circle cx="0" cy="0" r="1.2" fill={isLatest ? "#38bdf8" : "#94a3b8"} />
              </g>
            );
          })}

          {/* Dynamic Olympic Sight Reticle: Rendered DIRECTLY inside the SVG in exact coordinates */}
          <g
            transform={`translate(${visorPos.x}, ${visorPos.y})`}
            className="pointer-events-none select-none"
            aria-hidden="true"
          >
            {/* Outer sight aperture ring */}
            <circle
              cx="0"
              cy="0"
              r="8"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.2"
              opacity="0.9"
            />
            {/* Inner pin clearance ring */}
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="rgba(239, 68, 68, 0.15)"
              stroke="#ef4444"
              strokeWidth="0.6"
              opacity="0.8"
            />
            {/* Crosshairs */}
            <line x1="-11" y1="0" x2="-3" y2="0" stroke="#ef4444" strokeWidth="1" />
            <line x1="3" y1="0" x2="11" y2="0" stroke="#ef4444" strokeWidth="1" />
            <line x1="0" y1="-11" x2="0" y2="-3" stroke="#ef4444" strokeWidth="1" />
            <line x1="0" y1="3" x2="0" y2="11" stroke="#ef4444" strokeWidth="1" />
            {/* Center Fiber Optic Red Pin - THIS is (0, 0) of the visor */}
            <circle cx="0" cy="0" r="1.4" fill="#ef4444" stroke="#ffffff" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      {/* Touch & Click Shoot Action Button */}
      <button
        type="button"
        onClick={handleShoot}
        className="mt-3 px-4 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 active:scale-95 text-primary border border-primary/30 font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
      >
        <Crosshair className="w-3.5 h-3.5 text-primary" />
        <span>{t("offtopic.archeryGame.shootBtn") || "Soltar flecha (Disparar)"}</span>
      </button>

      {/* Result feedback ticker */}
      <div className="mt-2 text-center h-7 flex items-center justify-center">
        {lastResult ? (
          <div className="text-xs font-mono font-bold text-primary animate-fade-in flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <span>{lastResult.label}</span>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-muted-foreground">
            {t("offtopic.archeryGame.aimHint") || "Apunta compensando el temblor muscular y dispara al centro del visor"}
          </span>
        )}
      </div>
    </div>
  );
};
