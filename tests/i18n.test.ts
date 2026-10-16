import { describe, it, expect, beforeEach } from 'vitest';
import { t, applyTranslations } from '../src/scripts/i18n/engine';
import { initNavbar } from '../src/scripts/components/navbar';

describe('i18n Engine & Language Control', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
    document.body.innerHTML = `
      <div id="lang-control" class="lang-segmented-control" role="radiogroup">
        <button type="button" role="radio" aria-checked="false" data-lang="es" class="lang-segment-btn">ES</button>
        <button type="button" role="radio" aria-checked="false" data-lang="en" class="lang-segment-btn">EN</button>
        <button type="button" role="radio" aria-checked="false" data-lang="va" class="lang-segment-btn">VA</button>
      </div>
      <span id="nav-home" data-i18n="nav.home">Initial</span>
    `;
  });

  it('translates known keys in all supported languages', () => {
    expect(t('nav.home', 'es')).toBe('Inicio');
    expect(t('nav.home', 'en')).toBe('Home');
    expect(t('nav.home', 'va')).toBe('Inici');
  });

  it('falls back to key path for missing keys', () => {
    expect(t('nonexistent.nested.key', 'es')).toBe('nonexistent.nested.key');
  });

  it('updates DOM and aria-checked attributes when navbar listens to language change', () => {
    initNavbar();
    applyTranslations('es');

    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem('user_lang')).toBe('es');

    const homeSpan = document.getElementById('nav-home');
    expect(homeSpan?.textContent).toBe('Inicio');

    const esBtn = document.querySelector('[data-lang="es"]');
    const enBtn = document.querySelector('[data-lang="en"]');
    expect(esBtn?.getAttribute('aria-checked')).toBe('true');
    expect(esBtn?.classList.contains('active')).toBe(true);
    expect(enBtn?.getAttribute('aria-checked')).toBe('false');
    expect(enBtn?.classList.contains('active')).toBe(false);
  });
});

