export type ThemeSetting = 'light' | 'dark';
export type ActiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'user_theme';

export function getSavedThemeSetting(): ThemeSetting {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeSetting | null;
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  return 'light'; // Default: light theme
}

export function resolveEffectiveTheme(setting: ThemeSetting): ActiveTheme {
  return setting === 'dark' ? 'dark' : 'light';
}

let currentSetting: ThemeSetting = getSavedThemeSetting();

export function toggleTheme(): ThemeSetting {
  const next: ThemeSetting = currentSetting === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function applyTheme(setting: ThemeSetting): void {
  currentSetting = setting;
  localStorage.setItem(STORAGE_KEY, setting);

  const effectiveTheme = resolveEffectiveTheme(setting);
  document.documentElement.setAttribute('data-theme', effectiveTheme);
  document.documentElement.setAttribute('data-theme-setting', setting);

  const isDark = effectiveTheme === 'dark';
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute('aria-checked', String(isDark));
    if (isDark) {
      themeToggle.classList.add('dark');
    } else {
      themeToggle.classList.remove('dark');
    }
  }

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
      toggleBtn.setAttribute('aria-checked', 'true');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.classList.add('active');
    }
  } else {
    document.documentElement.removeAttribute('data-a11y');
    localStorage.removeItem(A11Y_STORAGE_KEY);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-checked', 'false');
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
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleA11yContrast();
      }
    });
  }
}

export function initThemeSwitcher(): void {
  // Apply saved or default (light) theme initially
  applyTheme(currentSetting);

  // Wire up theme toggle switch
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      toggleTheme();
    });
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // Initialize accessibility high contrast mode
  initA11yContrast();
}

export function getCurrentThemeSetting(): ThemeSetting {
  return currentSetting;
}

export function getEffectiveTheme(): ActiveTheme {
  return resolveEffectiveTheme(currentSetting);
}
