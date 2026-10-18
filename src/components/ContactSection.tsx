import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Copy,
  Check,
  Coffee,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const emailAddress = "info@carloslara.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    toast({
      title: t("contact.emailCopiedToast") || "¡Email copiado al portapapeles! 📋",
      description: t("contact.emailCopiedToastDesc") || "info@carloslara.dev listo para pegar.",
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <Coffee className="w-3.5 h-3.5" />
            <span>{t("contact.tag") || "CONTACTO DIRECTO"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t("contact.titlePrefix") || "¿Hablamos sobre tu Próxima "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {t("contact.titleHighlight") || "Arquitectura o Reto Técnico?"}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("contact.subtitle") ||
              "Abierto a roles de Senior Backend Engineer, Staff Engineer, Tech Lead o consultoría especializada en sistemas de alta disponibilidad e ingeniería agéntica."}
          </p>
        </div>

        {/* Direct Info Cards (Centered with original card dimensions) */}
        <div className="max-w-lg mx-auto space-y-4 text-left">
          {/* Email Card with 1-Click Copy */}
          <div className="p-6 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-muted-foreground font-semibold flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-primary" />
                <span>{t("contact.emailCard") || "Correo Electrónico"}</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground text-xs flex items-center gap-1 transition-all cursor-pointer"
                title={t("contact.emailCopy") || "Copiar email"}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (t("contact.emailCopied") || "Copiado") : (t("contact.emailCopy") || "Copiar")}</span>
              </button>
            </div>
            <a
              href={`mailto:${emailAddress}`}
              className="text-base font-bold text-foreground hover:text-primary transition-colors block"
            >
              {emailAddress}
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              {t("contact.emailResponse") || "Respuesta habitual en menos de 24 horas laborables."}
            </p>
          </div>

          {/* LinkedIn Card */}
          <div className="p-6 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase text-muted-foreground font-semibold">
              <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              <span>{t("contact.linkedinCard") || "Perfil Profesional"}</span>
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
              <span>{t("contact.githubCard") || "Repositorios & Código Abierto"}</span>
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
                {t("contact.locationCard") || "Ubicación & Disponibilidad"}
              </div>
              <div className="text-base font-bold text-foreground mt-0.5">
                {t("contact.locationValue") || "Valencia, España (Remoto / Híbrido)"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
