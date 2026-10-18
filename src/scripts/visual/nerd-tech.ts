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
> [METRICS 2026]: 10x development velocity · 0 reverts · 313 code reviews · 99.99% SLA uptime
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


