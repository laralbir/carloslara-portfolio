import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, FastForward, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface WelcomeScreenProps {
  onWelcomeComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onWelcomeComplete }) => {
  const [phase, setPhase] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [typedText, setTypedText] = useState("");
  const { language, t } = useLanguage();

  const domainUrl = "https://carloslara.dev";

  const welcomeMessages = [
    t("welcome.msg1") || "Ingeniería Agéntica & Arquitectura Backend",
    t("welcome.msg2") || "Más de 20 Años en Sistemas Distribuidos de Alta Concurrencia",
    t("welcome.msg3") || "Metodología SDD Estricta · 0 Reverts",
  ];

  useEffect(() => {
    const p1 = setTimeout(() => setPhase(1), 600);
    const p2 = setTimeout(() => setPhase(2), 1400);
    const p3 = setTimeout(() => setPhase(3), 2200);
    const finish = setTimeout(() => {
      setExitAnimation(true);
      setTimeout(onWelcomeComplete, 800);
    }, 4500);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(finish);
    };
  }, [onWelcomeComplete]);

  useEffect(() => {
    if (phase >= 2) {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= domainUrl.length) {
          setTypedText(domainUrl.substring(0, i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 35);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const handleSkip = () => {
    setExitAnimation(true);
    setTimeout(onWelcomeComplete, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-background flex items-center justify-center p-4">
        {/* Skip button in top right */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-border/60 bg-card/60 backdrop-blur-md text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer"
          aria-label={t("welcome.skip") || "Saltar"}
        >
          <span>{t("welcome.skip") || "Saltar"}</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>

        {/* Ambient background halos */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[100px] bg-primary/20 animate-pulse-subtle" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-cyan-500/20 animate-pulse-subtle" />
        </div>

        <motion.div
          className="w-full max-w-2xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={exitAnimation ? { opacity: 0, y: -40, scale: 0.96 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Phase 0: Badge pill */}
          {phase >= 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-mono mb-6"
            >
              <Cpu className="h-4 w-4 animate-spin text-primary" style={{ animationDuration: "6s" }} />
              <span>{welcomeMessages[phase % welcomeMessages.length]}</span>
            </motion.div>
          )}

          {/* Phase 1: Name and greeting */}
          {phase >= 1 && (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-foreground">Carlos Lara Albir</span>
              </h1>
              <div className="text-lg sm:text-2xl font-mono text-primary font-medium tracking-wide">
                Agentic Engineer &amp; Senior Backend Architect
              </div>
            </motion.div>
          )}

          {/* Phase 2: Terminal URL typing */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/80 bg-card/80 backdrop-blur-md font-mono text-sm sm:text-base text-cyan-400 shadow-xl">
                <Terminal className="h-4 w-4 text-primary" />
                <span>{typedText}</span>
                <span className="w-2 h-4 bg-primary inline-block animate-pulse" />
              </div>
            </motion.div>
          )}

          {/* Phase 3: Progress indicator */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-primary via-cyan-400 to-primary animate-pulse" />
              <p className="mt-3 text-xs font-mono text-muted-foreground">
                {t("welcome.telemetry") || "Initializing high-availability telemetry..."}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WelcomeScreen;
