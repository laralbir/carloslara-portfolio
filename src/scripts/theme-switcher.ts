export type ThemeSetting = 'light' | 'dark' | 'system';
export type ActiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'user_theme';
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

export function getSavedThemeSetting(): ThemeSetting {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeSetting | null;
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system'; // Default as requested
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

export function initThemeSwitcher(): void {
  // Apply saved or system theme initially
  applyTheme(currentSetting);

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

