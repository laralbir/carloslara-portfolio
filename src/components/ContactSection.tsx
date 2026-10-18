import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Coffee,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const emailAddress = "info@carloslara.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    toast({
      title: "¡Email copiado al portapapeles! 📋",
      description: "info@carloslara.dev listo para pegar.",
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, introduce tu email y un breve mensaje.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate sending or mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "¡Mensaje registrado! 🚀",
        description: "Carlos te responderá a la mayor brevedad posible.",
        variant: "success",
      });
      // Fallback mailto
      window.location.href = `mailto:${emailAddress}?subject=Contacto desde Portfolio Web (Carlos Lara)&body=Hola Carlos,%0D%0A%0D%0A${encodeURIComponent(
        formData.message
      )}%0D%0A%0D%0ADe: ${encodeURIComponent(formData.name)} (${encodeURIComponent(
        formData.email
      )})`;
      setFormData({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Coffee className="w-3.5 h-3.5" />
            <span>CONTACTO DIRECTO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            ¿Hablamos sobre tu Próxima{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Arquitectura o Reto Técnico?
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Abierto a roles de Senior Backend Engineer, Staff Engineer, Tech Lead o consultoría especializada en sistemas de alta disponibilidad e ingeniería agéntica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Column: Direct Info Cards (2 cols) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Correo Electrónico</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-all cursor-pointer"
                  title="Copiar email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copiado" : "Copiar"}</span>
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="text-base font-bold text-foreground hover:text-primary transition-colors block"
              >
                {emailAddress}
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                Respuesta habitual en menos de 24 horas laborables.
              </p>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase text-muted-foreground font-semibold">
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>Perfil Profesional</span>
              </div>
              <a
                href="https://www.linkedin.com/in/carlos-lara-albir-687277a4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-foreground hover:text-cyan-400 transition-colors flex items-center justify-between group"
              >
                <span>linkedin.com/in/carlos-lara-albir</span>
                <span className="text-xs font-mono text-primary group-hover:translate-x-1 transition-transform">
                  ➔
                </span>
              </a>
            </div>

            {/* GitHub Card */}
            <div className="p-6 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase text-muted-foreground font-semibold">
                <GithubIcon className="w-4 h-4 text-emerald-400" />
                <span>Repositorios &amp; Código Abierto</span>
              </div>
              <a
                href="https://github.com/laralbir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-foreground hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>github.com/laralbir</span>
                <span className="text-xs font-mono text-primary group-hover:translate-x-1 transition-transform">
                  ➔
                </span>
              </a>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                  Ubicación &amp; Disponibilidad
                </div>
                <div className="text-base font-bold text-foreground mt-0.5">
                  Valencia, España (Remoto / Híbrido)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (3 cols) */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-card/80 border border-border/80 backdrop-blur-md shadow-xl text-left">
            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Envíame un Mensaje</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              ¿Tienes una vacante técnica, un proyecto exigente o quieres contrastar visiones de arquitectura? Escríbeme y conectamos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-1.5">
                    Tu Nombre / Empresa
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. María Navarro (CTO)"
                    className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/80 text-foreground text-sm focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-1.5">
                    Tu Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nombre@empresa.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/80 text-foreground text-sm focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Mensaje o Contexto del Proyecto *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntame brevemente sobre tu equipo, el stack o la oportunidad técnica..."
                  className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/80 text-foreground text-sm focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary to-cyan-600 text-primary-foreground shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Enviando..." : "Enviar Mensaje Directo"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
