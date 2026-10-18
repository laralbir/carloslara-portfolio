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

  it('correctly renders HTML tags such as <strong> as DOM elements rather than literal text', () => {
    document.body.innerHTML = `
      <li id="point-0" data-i18n="experience.early.points.0">Placeholder</li>
    `;

    applyTranslations('es');
    const li = document.getElementById('point-0');
    expect(li?.innerHTML).toContain('<strong>Servicios Taurinos Serolo (2006–2009):</strong>');
    expect(li?.querySelector('strong')).not.toBeNull();
    expect(li?.querySelector('strong')?.textContent).toBe('Servicios Taurinos Serolo (2006–2009):');
  });

  it('translates projects.personal4 correctly across languages', () => {
    expect(t('projects.personal4.title', 'es')).toContain('MD GitHub Navigator');
    expect(t('projects.personal4.title', 'en')).toContain('MD GitHub Navigator');
    expect(t('projects.personal4.title', 'va')).toContain('MD GitHub Navigator');
  });

  it('guarantees 100% key parity and zero missing translations across es, en, and va', async () => {
    const es = await import('../src/i18n/es.json');
    const en = await import('../src/i18n/en.json');
    const va = await import('../src/i18n/va.json');

    function flattenKeys(obj: any, prefix = ''): string[] {
      let keys: string[] = [];
      for (const k of Object.keys(obj)) {
        if (k === 'default') continue;
        const val = obj[k];
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          keys = keys.concat(flattenKeys(val, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys;
    }

    const esKeys = new Set(flattenKeys(es));
    const enKeys = new Set(flattenKeys(en));
    const vaKeys = new Set(flattenKeys(va));

    expect(esKeys.size).toBeGreaterThan(400);
    expect(enKeys.size).toBe(esKeys.size);
    expect(vaKeys.size).toBe(esKeys.size);

    const missingInEn = [...esKeys].filter((k) => !enKeys.has(k));
    const missingInVa = [...esKeys].filter((k) => !vaKeys.has(k));
    expect(missingInEn).toEqual([]);
    expect(missingInVa).toEqual([]);
  });
});

