/**
 * Counter Animator
 * Smoothly counts up metrics numbers when scrolled into view.
 */

export function initCounterAnimator(): void {
  const counters = document.querySelectorAll<HTMLElement>('.counter-value');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const targetStr = el.getAttribute('data-target') || el.textContent || '0';
          const targetNum = parseInt(targetStr.replace(/\D/g, ''), 10);
          const suffix = targetStr.includes('+') ? '+' : '';

          if (!isNaN(targetNum)) {
            animateValue(el, 0, targetNum, 1600, suffix);
          }
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateValue(el: HTMLElement, start: number, end: number, duration: number, suffix: string) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // EaseOutQuad
    const ease = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(ease * (end - start) + start);
    el.textContent = `${current}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = `${end}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

