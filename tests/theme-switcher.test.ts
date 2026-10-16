import { describe, it, expect, beforeEach } from 'vitest';
import {
  applyTheme,
  toggleTheme,
  getSavedThemeSetting,
  setA11yContrast,
  toggleA11yContrast,
  isA11yContrastActive,
  initThemeSwitcher,
  initA11yContrast,
} from '../src/scripts/theme-switcher';

describe('Theme Switcher & Accessibility Contrast Controls', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-theme-setting');
    document.documentElement.removeAttribute('data-a11y');

    document.body.innerHTML = `
      <button id="theme-toggle" role="switch" aria-checked="false" class="theme-switch">
        <span class="theme-switch-track">
          <span class="theme-switch-thumb"></span>
        </span>
      </button>
      <button id="a11y-toggle" role="switch" aria-checked="false" class="theme-switch a11y-switch">
        <span class="theme-switch-track">
          <span class="theme-switch-thumb"></span>
        </span>
      </button>
    `;
  });

  it('initializes with default light theme', () => {
    expect(getSavedThemeSetting()).toBe('light');
    initThemeSwitcher();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    const themeBtn = document.getElementById('theme-toggle');
    expect(themeBtn?.getAttribute('aria-checked')).toBe('false');
    expect(themeBtn?.classList.contains('dark')).toBe(false);
  });

  it('toggles theme to dark and sets aria-checked and class', () => {
    initThemeSwitcher();
    const next = toggleTheme();
    expect(next).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    const themeBtn = document.getElementById('theme-toggle');
    expect(themeBtn?.getAttribute('aria-checked')).toBe('true');
    expect(themeBtn?.classList.contains('dark')).toBe(true);
  });

  it('keeps a11y switch untouched when dark theme is activated', () => {
    initThemeSwitcher();
    initA11yContrast();
    const a11yBtn = document.getElementById('a11y-toggle');

    // Initially a11y is inactive
    expect(isA11yContrastActive()).toBe(false);
    expect(a11yBtn?.getAttribute('aria-checked')).toBe('false');
    expect(a11yBtn?.classList.contains('active')).toBe(false);

    // Switch theme to dark
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // A11y switch must remain inactive!
    expect(isA11yContrastActive()).toBe(false);
    expect(a11yBtn?.getAttribute('aria-checked')).toBe('false');
    expect(a11yBtn?.classList.contains('active')).toBe(false);
    expect(document.documentElement.getAttribute('data-a11y')).toBeNull();
  });

  it('toggles high-contrast accessibility mode independently', () => {
    initA11yContrast();
    const a11yBtn = document.getElementById('a11y-toggle');

    const activated = toggleA11yContrast();
    expect(activated).toBe(true);
    expect(isA11yContrastActive()).toBe(true);
    expect(document.documentElement.getAttribute('data-a11y')).toBe('high-contrast');
    expect(a11yBtn?.getAttribute('aria-checked')).toBe('true');
    expect(a11yBtn?.classList.contains('active')).toBe(true);

    const deactivated = toggleA11yContrast();
    expect(deactivated).toBe(false);
    expect(isA11yContrastActive()).toBe(false);
    expect(document.documentElement.getAttribute('data-a11y')).toBeNull();
    expect(a11yBtn?.getAttribute('aria-checked')).toBe('false');
    expect(a11yBtn?.classList.contains('active')).toBe(false);
  });
});

