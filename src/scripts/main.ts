import '../styles/themes.css';
import '../styles/main.css';
import '../styles/components.css';

import { initThemeSwitcher } from './theme-switcher';
import { applyTranslations, resolveInitialLanguage } from './i18n/engine';
import { initCanvasBackground } from './visual/canvas-background';
import { initTechAvatar } from './visual/tech-avatar';
import { initCounterAnimator } from './visual/counter-animator';
import { initNavbar } from './components/navbar';
import { initSddModal } from './components/sdd-modal';
import { initNerdTech } from './visual/nerd-tech';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme
  initThemeSwitcher();

  // 2. Initialize Language
  const initialLang = resolveInitialLanguage();
  applyTranslations(initialLang);

  // 3. Initialize Visuals (Canvas Background + Tech Avatar)
  initCanvasBackground();
  initTechAvatar();

  // 4. Initialize Navigation & Controls
  initNavbar();

  // 5. Initialize Metrics Animated Counters
  initCounterAnimator();

  // 6. Initialize SDD Modal & Interaction
  initSddModal();

  // 7. Initialize Nerd-Tech Features & Console Easter Egg
  initNerdTech();
});

