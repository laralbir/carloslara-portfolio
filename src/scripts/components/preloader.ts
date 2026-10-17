export function hidePreloader(): void {
  const preloader = document.getElementById('app-preloader');
  if (!preloader || preloader.classList.contains('preloader-hidden')) return;

  preloader.classList.add('preloader-hidden');
  preloader.setAttribute('aria-busy', 'false');
  preloader.setAttribute('aria-hidden', 'true');

  setTimeout(() => {
    preloader.style.display = 'none';
  }, 400);
}

export function initPreloader(): void {
  const preloader = document.getElementById('app-preloader');
  if (!preloader) return;

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 100);
  } else {
    window.addEventListener(
      'load',
      () => {
        setTimeout(hidePreloader, 100);
      },
      { once: true }
    );
  }

  // Safety fallback: Never keep preloader visible indefinitely
  setTimeout(() => {
    hidePreloader();
  }, 2500);
}
