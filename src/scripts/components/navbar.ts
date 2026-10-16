import { setLanguage, getCurrentLanguage, Language } from '../i18n/engine';

export function initNavbar(): void {
  const langButtons = document.querySelectorAll<HTMLButtonElement>('.lang-segment-btn');
  const mobileToggle = document.getElementById('mobile-toggle') as HTMLButtonElement | null;
  const mobileNav = document.getElementById('mobile-nav') as HTMLElement | null;

  function updateLangSegmentUI(activeLang: Language) {
    langButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-lang') === activeLang;
      btn.setAttribute('aria-checked', String(isMatch));
      if (isMatch) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Initialize UI with currently active language
  updateLangSegmentUI(getCurrentLanguage());

  // Listen for language changes dispatched by engine
  window.addEventListener('languagechange', ((e: CustomEvent<{ lang: Language }>) => {
    if (e.detail?.lang) {
      updateLangSegmentUI(e.detail.lang);
    }
  }) as EventListener);

  // Click & keyboard arrow navigation (WAI-ARIA radiogroup pattern)
  langButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') as Language;
      if (lang) {
        setLanguage(lang);
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % langButtons.length;
        langButtons[nextIndex].focus();
        const nextLang = langButtons[nextIndex].getAttribute('data-lang') as Language;
        if (nextLang) setLanguage(nextLang);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + langButtons.length) % langButtons.length;
        langButtons[prevIndex].focus();
        const prevLang = langButtons[prevIndex].getAttribute('data-lang') as Language;
        if (prevLang) setLanguage(prevLang);
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scrollspy to highlight active nav link
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link[href^="#"]');

  function handleScroll() {
    const scrollY = window.scrollY;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
}

