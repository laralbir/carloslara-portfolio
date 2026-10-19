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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
            {t("contact.title") || `${t("contact.titlePrefix") || "¿Nos"} ${t("contact.titleHighlight") || "conocemos?"}`}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("contact.subtitle") ||
              "Abierto a roles de Senior Backend Engineer, Staff Engineer, Tech Lead o consultoría especializada en sistemas de alta disponibilidad e ingeniería agéntica."}
          </p>
        </div>

        {/* Direct Info Cards (1 row on desktop, max 2 rows on tablet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-left">
          {/* Email Card with 1-Click Copy */}
          <div className="p-4 sm:p-5 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2.5">
                <span className="text-xs font-mono uppercase text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{t("contact.emailCard") || "Email"}</span>
                </span>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="px-2 py-0.5 rounded-md border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                  title={t("contact.emailCopy") || "Copiar"}
                  aria-label={t("contact.emailCopy") || "Copiar email"}
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? (t("contact.emailCopied") || "Copiado") : (t("contact.emailCopy") || "Copiar")}</span>
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="text-sm sm:text-base font-bold text-foreground hover:text-primary transition-colors block truncate"
              >
                {emailAddress}
              </a>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-border/40">
              {t("contact.emailResponse") || "Bandeja personal directa"}
            </p>
          </div>

          {/* LinkedIn Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2.5 text-xs font-mono uppercase text-muted-foreground font-semibold">
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{t("contact.linkedinCard") || "LinkedIn"}</span>
              </div>
              <a
                href="https://www.linkedin.com/in/carlos-lara-albir-687277a4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-foreground hover:text-cyan-400 transition-colors flex items-center justify-between gap-1 group"
              >
                <span className="truncate">carlos-lara-albir</span>
                <span className="text-xs font-mono text-primary group-hover:translate-x-1 transition-transform shrink-0">
                  ➔
                </span>
              </a>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-border/40 truncate">
              Perfil profesional &amp; red
            </p>
          </div>

          {/* GitHub Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2.5 text-xs font-mono uppercase text-muted-foreground font-semibold">
                <GithubIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t("contact.githubCard") || "GitHub"}</span>
              </div>
              <a
                href="https://github.com/laralbir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-foreground hover:text-emerald-400 transition-colors flex items-center justify-between gap-1 group"
              >
                <span className="truncate">laralbir</span>
                <span className="text-xs font-mono text-primary group-hover:translate-x-1 transition-transform shrink-0">
                  ➔
                </span>
              </a>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-border/40 truncate">
              Repositorios, specs &amp; commits
            </p>
          </div>

          {/* Location Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-card/70 border border-border/80 backdrop-blur-md shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2.5 text-xs font-mono uppercase text-muted-foreground font-semibold">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{t("contact.locationCard") || "Ubicación"}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-foreground truncate">
                {t("contact.locationValue") || "Valencia, España"}
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-border/40 truncate">
              Remoto / Híbrido · Europa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
