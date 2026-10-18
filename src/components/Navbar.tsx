import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Eye,
  Menu,
  X,
  Code,
  Briefcase,
  User,
  Layers,
  Sparkles,
  Mail,
  Gamepad2,
  Cpu,
  GraduationCap,
} from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { resolvedTheme, toggleTheme, a11yContrast, toggleA11yContrast } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t("nav.home") || "Perfil", icon: User },
    { href: "#sdd", label: t("nav.aiSdd") || "IA & SDD", icon: Cpu },
    { href: "#projects", label: t("nav.projects") || "Proyectos", icon: Briefcase },
    { href: "#skills", label: t("nav.skills") || "Stack", icon: Code },
    { href: "#experience", label: t("nav.experience") || "Trayectoria", icon: Layers },
    { href: "#education", label: t("nav.education") || "Estudios", icon: GraduationCap },
    { href: "#offtopic", label: t("nav.offtopic") || "Aficiones", icon: Gamepad2 },
    { href: "#contact", label: t("nav.contact") || "Contacto", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-lg py-2.5"
            : "bg-background/40 backdrop-blur-sm border-b border-border/20 py-4"
        }`}
        aria-label={t("nav.ariaMain") || "Navegación principal"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-foreground font-bold tracking-tight hover:text-primary transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-105 transition-transform font-mono text-sm">
              CL
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold tracking-wide">Carlos Lara Albir</span>
              <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
                Agentic Architect
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-card/60 transition-all flex items-center gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Controls: Language, High Contrast, Theme */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Segmented Control */}
            <div
              className="flex items-center bg-card/70 border border-border/60 rounded-full p-0.5 text-xs font-mono shadow-inner"
              role="radiogroup"
              aria-label={t("nav.ariaLang") || "Seleccionar idioma"}
            >
              {(["es", "en", "va"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  role="radio"
                  aria-checked={language === lang}
                  className={`px-2.5 py-1 rounded-full uppercase transition-all cursor-pointer ${
                    language === lang
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm scale-105"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={toggleA11yContrast}
              aria-pressed={a11yContrast}
              title={a11yContrast ? (t("a11y.contrastActive") || "Modo alto contraste activado") : (t("a11y.toggleContrast") || "Alternar modo alto contraste")}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                a11yContrast
                  ? "border-amber-400 bg-amber-400/20 text-amber-300 shadow-md ring-2 ring-amber-400/50"
                  : "border-border/60 hover:bg-card/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="sr-only">{a11yContrast ? (t("a11y.contrastActive") || "Modo alto contraste activado") : (t("a11y.toggleContrast") || "Alternar modo alto contraste")}</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={t("nav.themeToggle") || "Alternar tema"}
              className="p-2 rounded-full border border-border/60 hover:bg-card/70 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
              <span className="sr-only">{t("nav.themeToggle") || "Alternar tema"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Contrast quick switch on mobile */}
            <button
              type="button"
              onClick={toggleA11yContrast}
              className={`p-1.5 rounded-lg border transition-all ${
                a11yContrast
                  ? "border-amber-400 bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/60"
                  : "border-border/60 text-muted-foreground"
              }`}
              title={a11yContrast ? (t("a11y.contrastActive") || "Modo alto contraste activado") : (t("a11y.toggleContrast") || "Alternar modo alto contraste")}
              aria-label={t("a11y.toggleContrast") || "Alto contraste"}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Theme quick switch on mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-border/60 text-muted-foreground"
              aria-label={t("nav.themeToggle") || "Cambiar tema"}
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-border/60 text-foreground hover:bg-card/70 transition-colors"
              aria-label={mobileMenuOpen ? (t("nav.closeMenu") || "Cerrar menú") : (t("nav.openMenu") || "Abrir menú")}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-xl space-y-4">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-card/50 border border-border/40 text-foreground hover:border-primary/50"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Language and Contrast controls */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div className="flex items-center gap-1 bg-card/70 border border-border/60 rounded-full p-1">
                {(["es", "en", "va"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 text-xs uppercase rounded-full ${
                      language === lang
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={toggleA11yContrast}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
                  a11yContrast ? "border-amber-400 bg-amber-400/20 text-amber-300" : "border-border/60 text-muted-foreground"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{a11yContrast ? "Contraste ON" : "Contraste"}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
