export type ThemeSetting = 'light' | 'dark' | 'system';
export type ActiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'user_theme';
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

export function getSavedThemeSetting(): ThemeSetting {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeSetting | null;
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'dark'; // Default: dark theme as requested
}

export function resolveEffectiveTheme(setting: ThemeSetting): ActiveTheme {
  if (setting === 'system') {
    return mediaQuery.matches ? 'dark' : 'light';
  }
  return setting;
}

let currentSetting: ThemeSetting = getSavedThemeSetting();

export function applyTheme(setting: ThemeSetting): void {
  currentSetting = setting;
  localStorage.setItem(STORAGE_KEY, setting);

  const effectiveTheme = resolveEffectiveTheme(setting);
  document.documentElement.setAttribute('data-theme', effectiveTheme);
  document.documentElement.setAttribute('data-theme-setting', setting);

  window.dispatchEvent(
    new CustomEvent('themechange', {
      detail: { setting, effectiveTheme },
    })
  );
}

const A11Y_STORAGE_KEY = 'a11y_contrast';

export function isA11yContrastActive(): boolean {
  return document.documentElement.getAttribute('data-a11y') === 'high-contrast';
}

export function setA11yContrast(active: boolean): void {
  const toggleBtn = document.getElementById('a11y-toggle');
  if (active) {
    document.documentElement.setAttribute('data-a11y', 'high-contrast');
    localStorage.setItem(A11Y_STORAGE_KEY, 'high-contrast');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.classList.add('active');
    }
  } else {
    document.documentElement.removeAttribute('data-a11y');
    localStorage.removeItem(A11Y_STORAGE_KEY);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.classList.remove('active');
    }
  }

  window.dispatchEvent(
    new CustomEvent('a11ychange', {
      detail: { highContrast: active },
    })
  );
}

export function toggleA11yContrast(): boolean {
  const current = isA11yContrastActive();
  setA11yContrast(!current);
  return !current;
}

export function initA11yContrast(): void {
  const saved = localStorage.getItem(A11Y_STORAGE_KEY);
  if (saved === 'high-contrast') {
    setA11yContrast(true);
  } else {
    setA11yContrast(false);
  }

  const toggleBtn = document.getElementById('a11y-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      toggleA11yContrast();
    });
  }
}

export function initThemeSwitcher(): void {
  // Apply saved or system theme initially
  applyTheme(currentSetting);

  // Initialize accessibility high contrast mode
  initA11yContrast();

  // Listen to system changes if currently on 'system' mode
  mediaQuery.addEventListener('change', () => {
    if (currentSetting === 'system') {
      applyTheme('system');
    }
  });
}

export function getCurrentThemeSetting(): ThemeSetting {
  return currentSetting;
}

export function getEffectiveTheme(): ActiveTheme {
  return resolveEffectiveTheme(currentSetting);
}

