import React, { useState, useEffect } from "react";
import { Play, Pause, Disc, Gauge, Volume2 } from "lucide-react";

export const HifiPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState<33 | 45>(33);
  const [vuLeft, setVuLeft] = useState(15);
  const [vuRight, setVuRight] = useState(18);

  // VU Meter Needle animation when playing
  useEffect(() => {
    if (!isPlaying) {
      setVuLeft(5);
      setVuRight(5);
      return;
    }

    const interval = setInterval(() => {
      // Natural audio level fluctuations
      const base = 50 + Math.random() * 35;
      const jitterL = (Math.random() - 0.5) * 15;
      const jitterR = (Math.random() - 0.5) * 15;
      setVuLeft(Math.min(95, Math.max(10, base + jitterL)));
      setVuRight(Math.min(95, Math.max(10, base + jitterR)));
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRpm = () => {
    setRpm(rpm === 33 ? 45 : 33);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-card/60 rounded-2xl border border-border/70 select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Disc className="w-4 h-4" />
          <span>Estación HiFi Ámbar · Giradiscos Analógico</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRpm}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-all cursor-pointer ${
              rpm === 45
                ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                : "bg-background/80 text-muted-foreground border-border/60"
            }`}
          >
            {rpm === 33 ? "33 ⅓ RPM" : "45 RPM Turbo"}
          </button>
        </div>
      </div>

      {/* Turntable Platter & Vinyl Record */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-2">
        {/* Turntable base chassis */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-700/60 shadow-2xl" />

        {/* Vinyl Disc */}
        <div
          className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center transition-transform ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{
            animationDuration: rpm === 33 ? "2.2s" : "1.6s",
            backgroundImage:
              "radial-gradient(circle, #1a1a1a 20%, #111111 25%, #222222 30%, #111111 40%, #1f1f1f 50%, #111111 60%, #1a1a1a 70%, #0d0d0d 80%)",
          }}
        >
          {/* Vinyl Sheen Overlay */}
          <div className="absolute inset-0 rounded-full opacity-25 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Center Label (Ámbar HiFi) */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-2 border-amber-400/60 flex flex-col items-center justify-center text-center shadow-inner">
            <span className="text-[9px] font-mono font-bold text-amber-200 tracking-wider">
              ÁMBAR
            </span>
            <span className="text-[7px] font-mono text-amber-300/80">HiFi 24-bit</span>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-400 mt-0.5" />
          </div>
        </div>

        {/* Tonearm */}
        <div
          className="absolute top-4 right-4 w-12 sm:w-16 h-36 pointer-events-none transition-transform duration-700 origin-top-right"
          style={{
            transform: isPlaying ? "rotate(24deg)" : "rotate(0deg)",
          }}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-400 border border-neutral-300 ml-auto shadow-md" />
          <div className="w-1.5 h-28 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-full ml-auto mr-1 shadow-sm" />
          <div className="w-4 h-3 bg-amber-500 rounded-sm ml-auto mr-0 shadow" />
        </div>
      </div>

      {/* Dual Retro VU Meters */}
      <div className="w-full grid grid-cols-2 gap-3 my-2">
        {/* Left Channel VU */}
        <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center relative overflow-hidden">
          <div className="w-full flex justify-between text-[9px] font-mono text-amber-400/80 px-2 mb-1">
            <span>-20dB</span>
            <span>0dB</span>
            <span className="text-red-400">+3dB</span>
          </div>
          {/* Dial Arc */}
          <div className="w-full h-8 flex items-end justify-center relative">
            <div
              className="w-0.5 h-8 bg-amber-400 origin-bottom transition-transform duration-100 shadow-sm shadow-amber-400"
              style={{
                transform: `rotate(${vuLeft * 0.9 - 45}deg)`,
              }}
            />
          </div>
          <span className="text-[9px] font-mono text-amber-300 font-bold mt-1">CH-L (VU)</span>
        </div>

        {/* Right Channel VU */}
        <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col items-center relative overflow-hidden">
          <div className="w-full flex justify-between text-[9px] font-mono text-amber-400/80 px-2 mb-1">
            <span>-20dB</span>
            <span>0dB</span>
            <span className="text-red-400">+3dB</span>
          </div>
          {/* Dial Arc */}
          <div className="w-full h-8 flex items-end justify-center relative">
            <div
              className="w-0.5 h-8 bg-amber-400 origin-bottom transition-transform duration-100 shadow-sm shadow-amber-400"
              style={{
                transform: `rotate(${vuRight * 0.9 - 45}deg)`,
              }}
            />
          </div>
          <span className="text-[9px] font-mono text-amber-300 font-bold mt-1">CH-R (VU)</span>
        </div>
      </div>

      {/* Play / Pause Toggle Button */}
      <button
        onClick={togglePlay}
        className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isPlaying
            ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20"
            : "bg-background/80 border border-border/80 text-foreground hover:border-amber-400/60"
        }`}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <span>{isPlaying ? "Detener Giradiscos" : "Girar Vinilo & VU-Meters"}</span>
      </button>
    </div>
  );
};
