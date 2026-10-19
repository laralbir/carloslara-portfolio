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
import { useLanguage } from "@/context/LanguageContext";

interface OffTopicCardData {
  id: "archery" | "hifi" | "moto";
  title: string;
  category: string;
  desc: string;
  photoUrl: string;
  photoFallback: string;
  photoCaption: string;
  photoPosition?: string;
  photoScale?: string;
  easterEggHint: string;
  easterEggTag: string;
}

export const OffTopicSection: React.FC = () => {
  const { t } = useLanguage();

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
      title: t("offtopic.archery.title") || "Tiro con Arco (Recurvo Olímpico)",
      category: t("offtopic.archery.badge") || "Precisión, Foco & Balística",
      desc: t("offtopic.archery.desc") || "Deporte federado de extrema disciplina mental y técnica. El control del pulso, el cálculo del viento y la consistencia biomecánica son la analogía perfecta para resolver arquitecturas críticas bajo presión.",
      photoUrl: "/assets/offtopic/archery-real.webp",
      photoFallback: "/assets/offtopic/archery-real.jpg",
      photoCaption: t("offtopic.archery.photoCaption") || "Carlos compitiendo en línea de tiro a 50m con arco.",
      photoPosition: "52% 50%",
      photoScale: "scale-[1.16] group-hover/photo:scale-[1.22]",
      easterEggHint: "🎯 Clic para desbloquear: Diana WA 18m",
      easterEggTag: "Minijuego Balístico",
    },
    {
      id: "hifi",
      title: t("offtopic.hifi.title") || "Sonido de Alta Fidelidad & Vinilos",
      category: t("offtopic.hifi.badge") || "Hardware, Acústica & IoT Ámbar",
      desc: t("offtopic.hifi.desc") || "Audición pura en vinilo y 24-bit FLAC. Creador de la estación de control 'Ámbar' con pantallas táctiles, microcontroladores y sincronización con Kodi y Spotify.",
      photoUrl: "/assets/offtopic/hifi-real.webp",
      photoFallback: "/assets/offtopic/hifi-real.jpg",
      photoCaption: t("offtopic.hifi.photoCaption") || "Setup de sonido HiFi analógico y digital con calibración en banco de trabajo.",
      photoPosition: "50% 68%",
      photoScale: "scale-100 group-hover/photo:scale-105",
      easterEggHint: "🎵 Clic para girar el vinilo analógico",
      easterEggTag: "Giradiscos & VU-Meters",
    },
    {
      id: "moto",
      title: t("offtopic.moto.title") || "Motos & Rutas de Montaña",
      category: t("offtopic.moto.badge") || "Mecánica, Curvas & Telemetría",
      desc: t("offtopic.moto.desc") || "Pasión por la mecánica de dos ruedas y las rutas técnicas por carretera. La concentración continua y el respeto a la física transmiten la misma atención meticulosa que exigen los sistemas distribuidos.",
      photoUrl: "/assets/offtopic/moto-real.webp",
      photoFallback: "/assets/offtopic/moto-real.jpg",
      photoCaption: t("offtopic.moto.photoCaption") || "Ruta de montaña por puertos y curvas de la Comunidad Valenciana.",
      photoPosition: "center center",
      photoScale: "scale-100 group-hover/photo:scale-105",
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
            <span>{t("offtopic.tag") || "VIDA FUERA DEL TERMINAL"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("offtopic.titlePrefix") || "Aficiones & Pasiones "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {t("offtopic.titleHighlight") || "que Moldean mi Carácter"}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("offtopic.subtitle") || "Fotografía real de mis tres grandes aficiones. Haz clic en cualquiera de ellas para desbloquear el minijuego interactivo oculto."}
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card) => {
            const isInteractive = activeViews[card.id] === "interactive";

            return (
              <div
                key={card.id}
                className="p-4 sm:p-6 rounded-2xl bg-card/60 border border-border/70 backdrop-blur-md shadow-xl flex flex-col justify-between text-left relative overflow-hidden group hover:border-primary/40 transition-all"
              >
                <div>
                  {/* Category Header & View Switcher */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                      {card.category}
                    </span>

                    {/* Return to photo button when in interactive mode */}
                    {isInteractive && (
                      <button
                        onClick={() => returnToPhoto(card.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-background/80 border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer"
                        title={t("offtopic.returnToPhoto") || "Volver a la fotografía real"}
                      >
                        <Camera className="w-3 h-3 text-cyan-400" />
                        <span>{t("offtopic.viewPhoto") || "Ver foto real"}</span>
                      </button>
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
                      /* LAYER 1: Authentic Photography (Clicking reveals surprise Easter Egg) */
                      <motion.div
                        key="photo"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => unlockEasterEgg(card.id)}
                        className="relative rounded-2xl overflow-hidden cursor-pointer group/photo aspect-4/3 border border-border/80 shadow-md bg-neutral-950"
                        title={card.photoCaption}
                      >
                        <img
                          src={card.photoUrl}
                          alt={card.title}
                          style={{ objectPosition: card.photoPosition || "center" }}
                          className={`w-full h-full object-cover transition-transform duration-700 ${card.photoScale || "scale-100 group-hover/photo:scale-105"}`}
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
                          title={t("offtopic.zoomPhoto") || "Ampliar fotografía a pantalla completa"}
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
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
                            <span>{t("offtopic.returnToPhoto") || "Volver a la fotografía real"}</span>
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
                  aria-label={t("offtopic.closeZoom") || "Cerrar ampliación"}
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
