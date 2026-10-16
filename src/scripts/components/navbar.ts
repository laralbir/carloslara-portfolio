import { setLanguage, getCurrentLanguage, Language } from '../i18n/engine';

export function initNavbar(): void {
  const langSelect = document.getElementById('lang-select') as HTMLSelectElement | null;
  const mobileToggle = document.getElementById('mobile-toggle') as HTMLButtonElement | null;
  const mobileNav = document.getElementById('mobile-nav') as HTMLElement | null;

  if (langSelect) {
    langSelect.value = getCurrentLanguage();
    langSelect.addEventListener('change', (e) => {
      const val = (e.target as HTMLSelectElement).value as Language;
      setLanguage(val);
    });
  }

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

