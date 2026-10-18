import React, { useState, useRef, useEffect, useCallback } from "react";
import { Crosshair, RotateCcw, Target, Award } from "lucide-react";
import { calculateArcheryScore, computeBowTremor, ArcheryScoreResult } from "@/scripts/components/hobby-easter-eggs";

interface ShotMarker {
  id: number;
  x: number;
  y: number;
  score: number;
}

export const ArcheryGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetSvgRef = useRef<SVGSVGElement>(null);
  const [aimPos, setAimPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [shots, setShots] = useState<ShotMarker[]>([]);
  const [lastResult, setLastResult] = useState<ArcheryScoreResult | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isAiming, setIsAiming] = useState(false);

  // Tremor loop for realistic bow sight sway (only in real browser)
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
      setAimPos((prev) => {
        return {
          x: prev.x + (tremor.x * 0.12),
          y: prev.y + (tremor.y * 0.12),
        };
      });
      rafId = requestAnimationFrame(animateTremor);
    };
    rafId = requestAnimationFrame(animateTremor);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!targetSvgRef.current) return;
    const rect = targetSvgRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const scale = 160 / rect.width;

    // Adjust vertical offset for touch to avoid thumb occlusion
    const adjustedClientY = e.pointerType === "touch" ? e.clientY - rect.height * 0.16 : e.clientY;

    const rawX = (e.clientX - centerX) * scale;
    const rawY = (adjustedClientY - centerY) * scale;

    const dist = Math.hypot(rawX, rawY);
    const maxRadius = 78;
    if (dist > maxRadius) {
      setAimPos({ x: (rawX / dist) * maxRadius, y: (rawY / dist) * maxRadius });
    } else {
      setAimPos({ x: rawX, y: rawY });
    }
    setIsAiming(true);
  };

  const handleShoot = () => {
    const tremor = computeBowTremor(performance.now());
    const finalX = aimPos.x + tremor.x * 0.35;
    const finalY = aimPos.y + tremor.y * 0.35;

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
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsAiming(false)}
      className="flex flex-col items-center justify-between p-4 bg-card/60 rounded-2xl border border-border/70 relative select-none"
    >
      {/* Header bar */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
        <div className="flex items-center gap-1.5 text-primary">
          <Target className="w-4 h-4" />
          <span>Diana WA 18m (Recurvo Olímpico)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-foreground font-bold">
            Total: <span className="text-primary">{totalScore}</span> ({shots.length} flechas)
          </span>
          {shots.length > 0 && (
            <button
              onClick={handleReset}
              className="p-1 rounded hover:bg-background/80 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Limpiar diana"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Target Container */}
      <div
        onClick={handleShoot}
        className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-crosshair group touch-none"
      >
        <svg
          ref={targetSvgRef}
          viewBox="-80 -80 160 160"
          className="w-full h-full drop-shadow-xl transition-transform"
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

          {/* Shot Markers (Punctures) */}
          {shots.map((shot) => (
            <g key={shot.id} transform={`translate(${shot.x}, ${shot.y})`}>
              <circle cx="0" cy="0" r="2.8" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.2" fill="#38bdf8" />
            </g>
          ))}
        </svg>

        {/* Dynamic Sight Reticle */}
        <div
          className="absolute pointer-events-none transition-transform duration-75"
          style={{
            transform: `translate(${aimPos.x * 1.7}px, ${aimPos.y * 1.7}px)`,
          }}
        >
          <div className="relative -top-4 -left-4 w-8 h-8 rounded-full border-2 border-primary/80 flex items-center justify-center animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary/40 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/40 -translate-x-1/2" />
          </div>
        </div>
      </div>

      {/* Result feedback ticker */}
      <div className="mt-2 text-center h-7 flex items-center justify-center">
        {lastResult ? (
          <div className="text-xs font-mono font-bold text-primary animate-fade-in flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <span>{lastResult.label}</span>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-muted-foreground">
            Apunta compensando el temblor muscular y haz clic para disparar
          </span>
        )}
      </div>
    </div>
  );
};
