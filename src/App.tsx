import React, { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import { StarBackground } from "./components/StarBackground";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { TelemetryTicker } from "./components/TelemetryTicker";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SddSection } from "./components/SddSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { OffTopicSection } from "./components/offtopic/OffTopicSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export const AppContent: React.FC = () => {
  const [welcomeComplete, setWelcomeComplete] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      // If URL has a hash or query param (e.g. #projects or ?skipIntro=true), skip intro
      return Boolean(window.location.hash || window.location.search.includes("skipIntro"));
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30 selection:text-primary">
      {/* Dynamic Star & Meteor Cosmic Background */}
      <StarBackground />

      {/* Global Toast System */}
      <Toaster />

      {!welcomeComplete ? (
        <WelcomeScreen onWelcomeComplete={() => setWelcomeComplete(true)} />
      ) : (
        <>
          {/* Top Telemetry Diagnostic Ticker */}
          <TelemetryTicker />

          {/* Sticky Navigation Bar */}
          <Navbar />

          {/* Main Sections */}
          <main id="main-content">
            <HeroSection />
            <AboutSection />
            <SddSection />
            <ProjectsSection />
            <SkillsSection />
            <ExperienceTimeline />
            <OffTopicSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
