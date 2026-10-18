import React, { useState, useEffect, useRef } from "react";
import { Gauge, Flame, Zap, Wind } from "lucide-react";

export const MotoThrottle: React.FC = () => {
  const [rpm, setRpm] = useState(1200); // Idle RPM
  const [speed, setSpeed] = useState(0);
  const [isThrottling, setIsThrottling] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePhysics = () => {
      setRpm((prevRpm) => {
        if (isThrottling) {
          const targetRpm = 10500;
          return Math.min(targetRpm, prevRpm + 180);
        } else {
          const idleRpm = 1200;
          return Math.max(idleRpm, prevRpm - 120);
        }
      });

      setSpeed((prevSpeed) => {
        if (isThrottling) {
          return Math.min(195, prevSpeed + 3.2);
        } else {
          return Math.max(0, prevSpeed - 2.8);
        }
      });

      rafRef.current = requestAnimationFrame(updatePhysics);
    };

    rafRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isThrottling]);

  const rpmPercent = Math.min(100, (rpm / 11000) * 100);
  const isRedline = rpm >= 9000;

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-card/60 rounded-2xl border border-border/70 select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Gauge className="w-4 h-4" />
          <span>Tacómetro &amp; Telemetría Moto</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span className={isRedline ? "text-red-400 font-bold animate-pulse" : "text-muted-foreground"}>
            {Math.round(rpm)} RPM
          </span>
        </div>
      </div>

      {/* Cockpit & Instrument Cluster Display */}
      <div className="relative w-full max-w-[280px] h-48 sm:h-52 rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-700/80 p-4 flex flex-col justify-between shadow-2xl my-2 overflow-hidden">
        {/* Animated Road Lines (Perspective) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div
            className={`w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(255,255,255,0.4)_20px,rgba(255,255,255,0.4)_40px)] ${
              isThrottling ? "animate-pulse" : ""
            }`}
          />
        </div>

        {/* Speed & Gear Digital Readout */}
        <div className="flex items-center justify-between relative z-10 font-mono">
          <div className="text-left">
            <span className="text-[10px] text-neutral-400 uppercase">Velocidad</span>
            <div className="text-3xl font-black text-cyan-400 leading-none">
              {Math.round(speed)}{" "}
              <span className="text-xs font-normal text-neutral-400">km/h</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 uppercase">Marcha</span>
            <div className="text-2xl font-black text-amber-400 leading-none">
              {speed === 0 ? "N" : speed > 120 ? "6" : speed > 80 ? "5" : speed > 50 ? "4" : speed > 25 ? "3" : "2"}
            </div>
          </div>
        </div>

        {/* Curved Tachometer Bar */}
        <div className="relative z-10 w-full my-auto">
          <div className="w-full flex justify-between text-[8px] font-mono text-neutral-400 mb-1">
            <span>0</span>
            <span>3k</span>
            <span>6k</span>
            <span>9k</span>
            <span className="text-red-400">11k</span>
          </div>
          <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-75 ${
                isRedline
                  ? "bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500 shadow-sm shadow-red-500"
                  : "bg-gradient-to-r from-cyan-400 to-primary"
              }`}
              style={{ width: `${rpmPercent}%` }}
            />
          </div>
        </div>

        {/* Exhaust Flame & Smoke feedback */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1">
            <Zap className={`w-3.5 h-3.5 ${isThrottling ? "text-amber-400 animate-bounce" : "text-neutral-500"}`} />
            <span>Throttle: {isThrottling ? "GAS A FONDO" : "Ralentí"}</span>
          </span>
          {isThrottling && (
            <span className="flex items-center gap-1 text-red-400 font-bold text-[11px] animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              <span>BOOST</span>
            </span>
          )}
        </div>
      </div>

      {/* Throttle Push-and-Hold Button */}
      <button
        onMouseDown={() => setIsThrottling(true)}
        onMouseUp={() => setIsThrottling(false)}
        onTouchStart={() => setIsThrottling(true)}
        onTouchEnd={() => setIsThrottling(false)}
        onMouseLeave={() => setIsThrottling(false)}
        className={`w-full py-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isThrottling
            ? "bg-gradient-to-r from-red-500 via-amber-500 to-cyan-500 text-neutral-950 shadow-xl shadow-red-500/30 scale-[0.98]"
            : "bg-background/80 border border-border/80 text-foreground hover:border-cyan-400/60"
        }`}
      >
        <Wind className="w-4 h-4" />
        <span>{isThrottling ? "¡¡ACELERANDO A FONDO!!" : "Mantén pulsado para Acelerar"}</span>
      </button>
    </div>
  );
};
