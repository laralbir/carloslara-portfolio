import '../styles/themes.css';
import '../styles/main.css';
import '../styles/components.css';

import { initPreloader, hidePreloader } from './components/preloader';
import { initThemeSwitcher } from './theme-switcher';
import { applyTranslations, resolveInitialLanguage } from './i18n/engine';
import { initCanvasBackground } from './visual/canvas-background';
import { initTechAvatar } from './visual/tech-avatar';
import { initCounterAnimator } from './visual/counter-animator';
import { initNavbar } from './components/navbar';
import { initSddModal } from './components/sdd-modal';
import { initOfftopicSwitcher } from './components/offtopic-switcher';
import { initHobbyEasterEggs } from './components/hobby-easter-eggs';
import { initNerdTech } from './visual/nerd-tech';

// Register preloader as early as possible
initPreloader();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme
  initThemeSwitcher();

  // 2. Initialize Language (Translates all DOM nodes)
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

  // 7. Initialize Offtopic Dual-View Switcher & Lightbox
  initOfftopicSwitcher();

  // 8. Initialize Offtopic Interactive Easter Eggs (Archery, HiFi, Moto)
  initHobbyEasterEggs();

  // 9. Initialize Nerd-Tech Features & Console Easter Egg
  initNerdTech();

  // 9. Gracefully hide preloader once everything is 100% mounted and translated
  requestAnimationFrame(() => {
    setTimeout(hidePreloader, 180);
  });
});

