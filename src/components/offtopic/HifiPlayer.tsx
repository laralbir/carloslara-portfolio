import React, { useState } from "react";
import { Disc, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const HifiPlayer: React.FC = () => {
  const { t } = useLanguage();
  const [speed, setSpeed] = useState<"33" | "45">("33");
  const [feedback, setFeedback] = useState<string | null>(null);

  const toggleSpeed = () => {
    const nextSpeed = speed === "33" ? "45" : "33";
    setSpeed(nextSpeed);
    setFeedback(nextSpeed === "45" ? `🎵 ${t("offtopic.hifiGame.rpm45") || "45 RPM Turbo"}` : `🎵 ${t("offtopic.hifiGame.rpm33") || "33 ⅓ RPM"}`);
  };

  const isTurbo = speed === "45";

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-card/60 rounded-2xl border border-border/70 select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs font-mono mb-2">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Disc className="w-4 h-4" />
          <span>{t("offtopic.hifiGame.playerTitle") || "Giradiscos HiFi & Vinilo Analógico"}</span>
        </div>
        <div className="text-[11px] font-mono">
          <span className={isTurbo ? "text-rose-400 font-bold animate-pulse" : "text-amber-300"}>
            {isTurbo ? (t("offtopic.hifiGame.rpm45") || "45 RPM Turbo") : (t("offtopic.hifiGame.rpm33") || "33 ⅓ RPM")}
          </span>
        </div>
      </div>

      {/* Main HiFi Turntable & Equalizer Scene */}
      <div className="hifi-scene relative w-full h-56 rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-border/80 flex items-center justify-center gap-6 overflow-hidden shadow-xl p-4">
        {/* Turntable Platter & Spinning Vinyl */}
        <div className="vinyl-turntable-wrapper relative flex items-center justify-center">
          <div
            onClick={toggleSpeed}
            role="button"
            tabIndex={0}
            data-speed={speed}
            aria-label={t("offtopic.hifiGame.ariaSpin") || "Girar vinilo y cambiar velocidad entre 33 y 45 RPM"}
            className={`vinyl-disc ${isTurbo ? "is-turbo" : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSpeed();
              }
            }}
          >
            {/* Concentric Textured Grooves */}
            <div className="vinyl-groove-ring ring-1" aria-hidden="true" />
            <div className="vinyl-groove-ring ring-2" aria-hidden="true" />
            <div className="vinyl-groove-ring ring-3" aria-hidden="true" />

            {/* Conical Light Glare (rotates with vinyl) */}
            <div className="vinyl-light-glare" aria-hidden="true" />

            {/* High-Contrast Vintage Center Label */}
            <div className="vinyl-label" aria-hidden="true">
              <div className="label-half top-half" />
              <div className="label-half bottom-half" />
              <span className="label-brand">{isTurbo ? "45" : "33⅓"}</span>
              <div className="vinyl-hole" />
            </div>
          </div>

          {/* Tonearm Resting on Record */}
          <div className="turntable-tonearm pointer-events-none" aria-hidden="true">
            <div className="tonearm-base" />
            <div className="tonearm-arm" />
            <div className="tonearm-headshell" />
          </div>
        </div>

        {/* Dynamic Jumping VU-Meter Equalizer */}
        <div className="vu-equalizer" title="Dynamic Audio Equalizer">
          <div className="vu-bar" />
          <div className="vu-bar" />
          <div className="vu-bar" />
          <div className="vu-bar" />
          <div className="vu-bar" />
          <div className="vu-bar" />
        </div>

        {/* Floating Feedback Badge */}
        {feedback && (
          <div className="hifi-feedback is-active absolute top-2.5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-400/50 text-amber-300 font-mono text-xs shadow-lg animate-fade-in">
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Speed Toggle Action Button */}
      <button
        onClick={toggleSpeed}
        className={`w-full mt-3 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isTurbo
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 scale-[0.99]"
            : "bg-background/80 border border-border/80 text-foreground hover:border-amber-400/60"
        }`}
      >
        <Zap className="w-4 h-4 text-amber-400" />
        <span>
          {isTurbo
            ? (t("offtopic.hifiGame.btnNormal") || "Cambiar a 33 ⅓ RPM Normal")
            : (t("offtopic.hifiGame.btnTurbo") || "Haz clic en el Vinilo para 45 RPM Turbo")}
        </span>
      </button>
    </div>
  );
};
