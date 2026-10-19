import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
  variant: "teal" | "cyan" | "indigo";
}

interface Meteor {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  animationDuration: number;
}

export const StarBackground: React.FC = () => {
  const { a11yContrast } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    if (a11yContrast) return;
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [a11yContrast]);

  const generateStars = () => {
    if (typeof window === "undefined") return;
    const numberOfStars = Math.min(
      85,
      Math.floor((window.innerWidth * window.innerHeight) / 13000)
    );

    const variants: ("teal" | "cyan" | "indigo")[] = [
      "teal",
      "teal",
      "cyan",
      "cyan",
      "indigo",
    ];

    const newStars: Star[] = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 1.6 + 1.2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.35,
        animationDuration: Math.random() * 4 + 2.5,
        variant: variants[i % variants.length],
      });
    }
    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 5;
    const newMeteors: Meteor[] = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1.2,
        x: Math.random() * 100,
        y: Math.random() * 30,
        delay: Math.random() * 12,
        animationDuration: Math.random() * 3 + 3,
      });
    }
    setMeteors(newMeteors);
  };

  if (a11yContrast) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 max-w-full [contain:strict]"
      aria-hidden="true"
      data-testid="star-background"
    >
      {/* Dynamic atmospheric cosmic ambient halos for light & dark themes */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-teal-300/12 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      <div className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] bg-cyan-300/14 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
      <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      {/* Sparkling Stars with adaptive contrast */}
      {stars.map((star) => {
        const variantClass =
          star.variant === "cyan"
            ? "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.45)] dark:bg-cyan-200 dark:shadow-[0_0_10px_rgba(165,243,252,0.6)]"
            : star.variant === "indigo"
            ? "bg-indigo-300 shadow-[0_0_6px_rgba(165,180,252,0.4)] dark:bg-indigo-200 dark:shadow-[0_0_10px_rgba(199,210,254,0.5)]"
            : "bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.45)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.55)]";

        return (
          <div
            key={star.id}
            className={`star absolute rounded-full animate-pulse-subtle transition-colors duration-500 ${variantClass}`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        );
      })}

      {/* Shooting Meteors with adaptive contrast */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor absolute rounded-full animate-meteor bg-gradient-to-r from-teal-400 via-cyan-300 to-transparent shadow-[0_0_8px_rgba(45,212,191,0.35)] dark:from-white dark:via-cyan-100 dark:to-transparent dark:shadow-[0_0_12px_rgba(255,255,255,0.45)] transition-all duration-500"
          style={{
            width: `${meteor.size * 60}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
