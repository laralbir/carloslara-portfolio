/**
 * Nerd-Tech & Engineering Interactive Elements
 * Includes DevTools console ASCII art easter egg, latency telemetry,
 * interactive skills filtering, and delightful micro-interactions.
 */

export function initNerdTech(): void {
  // 1. DevTools Console ASCII Art Easter Egg
  printConsoleEasterEgg();

  // 2. Real-time latency measurement in the telemetry bar
  initLatencyTelemetry();

  // 3. Dynamic branch detection in telemetry bar
  initBranchTelemetry();

  // 4. Interactive Skills Filter Bar
  initSkillsFilter();

  // 5. Interactive Hobby Elements ("Gracia y Fantasía")
  initInteractiveHobbies();
}

function printConsoleEasterEgg(): void {
  const asciiArt = `
   ____           _               _                           _    _ _     _      
  / ___|__ _ _ __| | ___  ___    | |    __ _ _ __ __ _       / \\  | | |__ (_)_ __ 
 | |   / _\` | '__| |/ _ \\/ __|   | |   / _\` | '__/ _\` |     / _ \\ | | '_ \\| | '__|
 | |__| (_| | |  | | (_) \\__ \\   | |__| (_| | | | (_| |    / ___ \\| | |_) | | |   
  \\____\\__,_|_|  |_|\\___/|___/   |_____\\__,_|_|  \\__,_|   /_/   \\_\\_|_.__/|_|_|   
  `;

  const bannerStyle = `
    color: #3b82f6;
    font-weight: bold;
    font-size: 11px;
    font-family: monospace;
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  `;

  const textStyle = `
    color: #10b981;
    font-family: monospace;
    font-size: 12px;
    line-height: 1.6;
  `;

  const linkStyle = `
    color: #60a5fa;
    font-family: monospace;
    font-size: 12px;
    text-decoration: underline;
  `;

  console.log(`%c${asciiArt}`, bannerStyle);
  console.log(
    `%c> [SYS_INIT]: Welcome fellow engineer / recruiter to Carlos Lara Albir's portfolio!
> [ARCHITECTURE]: Distributed Systems · Event-Driven Architecture (AWS SQS/SNS, EventBridge) · High-Throughput Microservices · Real-time OTA Sync
> [METHODOLOGY]: 100% Spec-Driven Development (SDD) orchestrated with AI (Claude Code + Antigravity)
> [METRICS 2026]: 341 PRs merged (0 reverts) · 313 code reviews · 211 companies migrated in 11 days
> [CONNECT]: info@carloslara.dev | https://www.linkedin.com/in/carlos-lara-albir-687277a4`,
    textStyle
  );
  console.log('%c> Inspect the raw SDD specs on GitHub: https://github.com/laralbir/carloslara-portfolio', linkStyle);
}

function initLatencyTelemetry(): void {
  const latencyEl = document.getElementById('telemetry-latency');
  if (!latencyEl) return;

  window.addEventListener('load', () => {
    try {
      const perfEntries = performance.getEntriesByType('navigation');
      if (perfEntries.length > 0) {
        const navTiming = perfEntries[0] as PerformanceNavigationTiming;
        const latency = Math.round(navTiming.responseStart - navTiming.requestStart);
        latencyEl.textContent = `${Math.max(latency, 8)}ms`;
      }
    } catch {
      latencyEl.textContent = '12ms';
    }
  });
}

function initBranchTelemetry(): void {
  const branchEl = document.getElementById('telemetry-branch');
  if (!branchEl) return;

  const hostname = window.location.hostname;
  if (hostname.includes('preview')) {
    branchEl.textContent = 'preview';
  } else {
    branchEl.textContent = 'main';
  }
}

function initSkillsFilter(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.skills-filter-btn');
  const skillCards = document.querySelectorAll<HTMLElement>('.skills-category-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter || 'all';

      skillCards.forEach((card) => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('fade-out');
        } else {
          card.classList.add('fade-out');
        }
      });
    });
  });
}

function initInteractiveHobbies(): void {
  // 1. Archery Target Click
  const targetSvg = document.querySelector<SVGElement>('.archery-target-svg');
  if (targetSvg) {
    targetSvg.style.cursor = 'crosshair';
    targetSvg.addEventListener('click', (e) => {
      const parent = targetSvg.closest('.offtopic-visual');
      if (!parent) return;

      const existingFloat = parent.querySelector('.target-hit-popup');
      if (existingFloat) existingFloat.remove();

      const floatEl = document.createElement('div');
      floatEl.className = 'target-hit-popup';
      floatEl.textContent = '🎯 10! ¡Pleno en el centro!';
      floatEl.style.cssText = `
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #eab308;
        color: #000;
        font-weight: 800;
        font-size: 0.75rem;
        padding: 0.25rem 0.6rem;
        border-radius: 9999px;
        box-shadow: 0 0 15px rgba(234, 179, 8, 0.8);
        pointer-events: none;
        z-index: 10;
        animation: float-hit 1.5s ease-out forwards;
      `;
      parent.appendChild(floatEl);

      setTimeout(() => floatEl.remove(), 1500);
    });
  }

  // 2. Vinyl Record Toggle Click
  const vinylDisc = document.querySelector<HTMLElement>('.vinyl-disc');
  const vuEqualizer = document.querySelector<HTMLElement>('.vu-equalizer');
  if (vinylDisc) {
    vinylDisc.style.cursor = 'pointer';
    vinylDisc.addEventListener('click', () => {
      vinylDisc.classList.toggle('vinyl-paused');
      const isPaused = vinylDisc.classList.contains('vinyl-paused');
      if (vuEqualizer) {
        vuEqualizer.style.opacity = isPaused ? '0.2' : '1';
      }
    });
  }
}

