import en from '../../i18n/en.json';
import es from '../../i18n/es.json';
import va from '../../i18n/va.json';

export type Language = 'en' | 'es' | 'va';

const translations: Record<Language, typeof en> = {
  en,
  es,
  va,
};

const STORAGE_KEY = 'user_lang';

export function resolveInitialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (saved && (saved === 'en' || saved === 'es' || saved === 'va')) {
    return saved;
  }

  const browserLang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
  
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  
  // Catalan / Valencian ISO standard mapping
  if (browserLang.startsWith('ca') || browserLang.startsWith('va')) {
    return 'va';
  }

  // Default fallback if not detected or other language
  return 'en';
}

let currentLang: Language = resolveInitialLanguage();

function getNestedValue(obj: unknown, path: string): string {
  const parts = path.split('.');
  let current: any = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return path; // Fallback to key path if missing
    }
  }

  return typeof current === 'string' ? current : path;
}

export function t(key: string, lang = currentLang): string {
  const dict = translations[lang] || translations.en;
  return getNestedValue(dict, key);
}

export function applyTranslations(lang = currentLang): void {
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang === 'va' ? 'ca' : lang;

  const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key, lang);
    }
  });

  const placeholderElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.placeholder = t(key, lang);
    }
  });

  const titleElements = document.querySelectorAll<HTMLElement>('[data-i18n-title]');
  titleElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.title = t(key, lang);
    }
  });

  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

export function getCurrentLanguage(): Language {
  return currentLang;
}

export function setLanguage(lang: Language): void {
  applyTranslations(lang);
}

