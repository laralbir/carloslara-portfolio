/**
 * Nerd-Tech & Engineering Interactive Elements
 * Includes DevTools console ASCII art easter egg and latency telemetry.
 */

export function initNerdTech(): void {
  // 1. DevTools Console ASCII Art Easter Egg
  printConsoleEasterEgg();

  // 2. Real-time latency measurement in the terminal telemetry bar
  initLatencyTelemetry();
}

function printConsoleEasterEgg(): void {
  const asciiArt = `
   ____           _             _                      _     _     _      
  / ___|__ _ _ __| | ___  ___  | |    __ _ _ __ __ _  / \\   | |__ (_)_ __ 
 | |   / _\` | '__| |/ _ \\/ __| | |   / _\` | '__/ _\` |/ _ \\  | '_ \\| | '__|
 | |__| (_| | |  | | (_) \\__ \\ | |__| (_| | | | (_| / ___ \\ | |_) | | |   
  \\____\\__,_|_|  |_|\\___/|___/ |_____\\__,_|_|  \\__,_/_/   \\_\\_.__/|_|_|   
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
> [CONNECT]: laralbir@gmail.com | https://www.linkedin.com/in/carlos-lara-albir-687277a4`,
    textStyle
  );
  console.log('%c> Inspect the raw SDD specs on GitHub: https://github.com/laralbir/carloslara-portfolio', linkStyle);
}

function initLatencyTelemetry(): void {
  const latencyEl = document.getElementById('telemetry-latency');
  if (!latencyEl) return;

  // Measure initial fetch / load latency via Navigation Timing API
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

