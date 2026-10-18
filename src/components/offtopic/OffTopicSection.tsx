import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Camera,
  Maximize2,
  X,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { ArcheryGame } from "./ArcheryGame";
import { HifiPlayer } from "./HifiPlayer";
import { MotoThrottle } from "./MotoThrottle";

interface OffTopicCardData {
  id: "archery" | "hifi" | "moto";
  title: string;
  category: string;
  desc: string;
  photoUrl: string;
  photoFallback: string;
  photoCaption: string;
  easterEggHint: string;
  easterEggTag: string;
}

export const OffTopicSection: React.FC = () => {
  // By default, show the real authentic photograph first
  const [activeViews, setActiveViews] = useState<Record<string, "photo" | "interactive">>({
    archery: "photo",
    hifi: "photo",
    moto: "photo",
  });

  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; caption: string } | null>(null);

  const cards: OffTopicCardData[] = [
    {
      id: "archery",
      title: "Tiro con Arco (Recurvo Olímpico)",
      category: "Precisión, Foco & Balística",
      desc: "Deporte federado de extrema disciplina mental y técnica. El control del pulso, el cálculo del viento y la consistencia biomecánica son la analogía perfecta para resolver arquitecturas críticas bajo presión.",
      photoUrl: "/assets/offtopic/archery-real.webp",
      photoFallback: "/assets/offtopic/archery-real.jpg",
      photoCaption: "Carlos compitiendo en línea de tiro a 18m con arco recurvo olímpico.",
      easterEggHint: "🎯 Clic para desbloquear: Diana WA 18m",
      easterEggTag: "Minijuego Balístico",
    },
    {
      id: "hifi",
      title: "Sonido de Alta Fidelidad & Vinilos",
      category: "Hardware, Acústica & IoT Ámbar",
      desc: "Audición pura en vinilo y 24-bit FLAC. Creador de la estación de control 'Ámbar' con pantallas táctiles, microcontroladores y sincronización con Kodi y Spotify.",
      photoUrl: "/assets/offtopic/hifi-real.webp",
      photoFallback: "/assets/offtopic/hifi-real.jpg",
      photoCaption: "Setup de sonido HiFi analógico y digital con calibración en banco de trabajo.",
      easterEggHint: "🎵 Clic para girar el vinilo analógico",
      easterEggTag: "Giradiscos & VU-Meters",
    },
    {
      id: "moto",
      title: "Motos & Rutas de Montaña",
      category: "Mecánica, Curvas & Telemetría",
      desc: "Pasión por la mecánica de dos ruedas y las rutas técnicas por carretera. La concentración continua y el respeto a la física transmiten la misma atención meticulosa que exigen los sistemas distribuidos.",
      photoUrl: "/assets/offtopic/moto-real.webp",
      photoFallback: "/assets/offtopic/moto-real.jpg",
      photoCaption: "Ruta de montaña por puertos y curvas de la Comunidad Valenciana.",
      easterEggHint: "🏍️ Clic para acelerar la moto y tirar humo",
      easterEggTag: "Carretera & Escape",
    },
  ];

  const unlockEasterEgg = (id: string) => {
    setActiveViews((prev) => ({ ...prev, [id]: "interactive" }));
  };

  const returnToPhoto = (id: string) => {
    setActiveViews((prev) => ({ ...prev, [id]: "photo" }));
  };

  return (
    <section id="offtopic" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIDA FUERA DEL TERMINAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Aficiones &amp; Pasiones{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              que Moldean mi Carácter
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Fotografía real de mis tres grandes aficiones. Haz clic en cualquiera de ellas para desbloquear el minijuego interactivo oculto.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card) => {
            const isInteractive = activeViews[card.id] === "interactive";

            return (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-md shadow-xl flex flex-col justify-between text-left relative overflow-hidden group hover:border-primary/40 transition-all"
              >
                <div>
                  {/* Category Header & View Switcher */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                      {card.category}
                    </span>

                    {/* Return to photo button when in interactive mode */}
                    {isInteractive ? (
                      <button
                        onClick={() => returnToPhoto(card.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-background/80 border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer"
                        title="Volver a la fotografía real"
                      >
                        <Camera className="w-3 h-3 text-cyan-400" />
                        <span>Ver foto real</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Easter Egg oculto</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                {/* Display Area: Real Photo (Default) vs Interactive Easter Egg */}
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    {!isInteractive ? (
                      /* LAYER 1: Authentic Photography with Easter Egg Invitation */
                      <motion.div
                        key="photo"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => unlockEasterEgg(card.id)}
                        className="relative rounded-2xl overflow-hidden cursor-pointer group/photo aspect-4/3 border border-border/80 shadow-md bg-neutral-950"
                      >
                        <img
                          src={card.photoUrl}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = card.photoFallback;
                          }}
                        />

                        {/* Top-Right Lightbox Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxImg({
                              src: card.photoUrl,
                              alt: card.title,
                              caption: card.photoCaption,
                            });
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-20 cursor-pointer"
                          title="Ampliar fotografía a pantalla completa"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Bottom Overlay Pill: Click to Unlock Easter Egg */}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center">
                          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-primary/50 text-foreground font-mono text-xs flex items-center gap-2 shadow-lg backdrop-blur-md group-hover/photo:border-primary group-hover/photo:scale-105 transition-all">
                            <Gamepad2 className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-primary font-semibold">
                              {card.easterEggHint}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* LAYER 2: Interactive Easter Egg Minigame */
                      <motion.div
                        key="game"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                        className="relative"
                      >
                        {card.id === "archery" && <ArcheryGame />}
                        {card.id === "hifi" && <HifiPlayer />}
                        {card.id === "moto" && <MotoThrottle />}

                        {/* Return to Photo Bar */}
                        <div className="mt-2 text-center">
                          <button
                            onClick={() => returnToPhoto(card.id)}
                            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-3 h-3" />
                            <span>Volver a la fotografía real</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImg && (
            <div
              onClick={() => setLightboxImg(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full bg-card rounded-2xl overflow-hidden border border-border shadow-2xl p-2 cursor-default text-left"
              >
                <button
                  onClick={() => setLightboxImg(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-20 cursor-pointer"
                  aria-label="Cerrar ampliación"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.alt}
                  className="w-full max-h-[75vh] object-contain rounded-xl"
                />
                <div className="p-4 text-xs font-mono text-muted-foreground">
                  {lightboxImg.caption}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
