/**
 * Atuin Terminal Interactive Shell Monitor 3D Avatar
 * Renders a retro-modern developer terminal with phosphor green CRT glow,
 * live shell history command telemetry, and 3D mouse parallax tilt.
 */

export function initTechAvatar(): () => void {
  const canvas = document.getElementById('tech-avatar-canvas') as HTMLCanvasElement | null;
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animationId = 0;
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let time = 0;

  const terminalLines = [
    { prefix: '$', text: 'atuin search --host edge' },
    { prefix: '>', text: '✔ 341 PRs merged [0 reverts]' },
    { prefix: '>', text: '✔ 211 instances migrated (11d)' },
    { prefix: '>', text: '✔ 99.99% sync uptime (OTA)' },
    { prefix: '>', text: '✔ Claude Code + Antigravity SDD' },
    { prefix: '$', text: 'status --all --active' },
    { prefix: '✔', text: 'Senior Backend Architect: READY' },
  ];

  // Track mouse over canvas container for interactive 3D monitor tilt
  const container = canvas.closest('.hero-avatar-wrapper');
  if (container) {
    container.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = container.getBoundingClientRect();
      const nx = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
      const ny = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * 14;
      targetTiltX = -ny * 14;
    });

    container.addEventListener('mouseleave', () => {
      targetTiltX = 0;
      targetTiltY = 0;
    });
  }

  function render() {
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    time += 0.02;
    tiltX += (targetTiltX - tiltX) * 0.08;
    tiltY += (targetTiltY - tiltY) * 0.08;

    const cx = width / 2;
    const cy = height / 2;
    const monitorW = Math.min(width, height) * 0.88;
    const monitorH = monitorW * 0.76;

    ctx.save();
    ctx.translate(cx + tiltY * 1.5, cy + tiltX * 1.5);

    // 1. Monitor Ambient Phosphor Shadow / Glow
    ctx.shadowColor = 'rgba(56, 200, 90, 0.25)';
    ctx.shadowBlur = 30 * dpr;

    // 2. Outer Monitor Bezel (Atuin Chamfered Slate Shell)
    const rad = 16 * dpr;
    ctx.beginPath();
    ctx.roundRect(-monitorW / 2, -monitorH / 2, monitorW, monitorH, rad);
    ctx.fillStyle = '#141d27';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(56, 200, 90, 0.35)';
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();

    // 3. Inner CRT Screen
    const screenInset = 12 * dpr;
    const screenW = monitorW - screenInset * 2;
    const screenH = monitorH - screenInset * 2;
    const screenRad = 8 * dpr;

    ctx.beginPath();
    ctx.roundRect(-screenW / 2, -screenH / 2, screenW, screenH, screenRad);
    ctx.fillStyle = '#0a1017';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 200, 90, 0.15)';
    ctx.lineWidth = 1 * dpr;
    ctx.stroke();

    // 4. Subtle Scanlines
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'rgba(56, 200, 90, 0.035)';
    ctx.lineWidth = 1 * dpr;
    for (let y = -screenH / 2; y < screenH / 2; y += 4 * dpr) {
      ctx.beginPath();
      ctx.moveTo(-screenW / 2, y);
      ctx.lineTo(screenW / 2, y);
      ctx.stroke();
    }
    ctx.restore();

    // 5. Screen Header Bar
    const headerH = 22 * dpr;
    ctx.beginPath();
    ctx.rect(-screenW / 2, -screenH / 2, screenW, headerH);
    ctx.fillStyle = 'rgba(20, 29, 39, 0.85)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 200, 90, 0.2)';
    ctx.lineWidth = 1 * dpr;
    ctx.stroke();

    // Terminal macOS-style window dots (in terminal colors)
    const dotStartX = -screenW / 2 + 14 * dpr;
    const dotY = -screenH / 2 + headerH / 2;
    const dotR = 3.5 * dpr;

    ctx.beginPath(); ctx.arc(dotStartX, dotY, dotR, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.beginPath(); ctx.arc(dotStartX + 11 * dpr, dotY, dotR, 0, Math.PI * 2); ctx.fillStyle = '#f59e0b'; ctx.fill();
    ctx.beginPath(); ctx.arc(dotStartX + 22 * dpr, dotY, dotR, 0, Math.PI * 2); ctx.fillStyle = '#38c85a'; ctx.fill();

    // Header title
    ctx.font = `700 ${Math.round(9 * dpr)}px 'Space Mono', monospace`;
    ctx.fillStyle = '#8fa1a8';
    ctx.textAlign = 'center';
    ctx.fillText('atuin::sh — carlos@edge [CLA]', 0, dotY + 3 * dpr);

    // 6. Terminal Output Content
    const textStartX = -screenW / 2 + 14 * dpr;
    let textY = -screenH / 2 + headerH + 18 * dpr;
    const lineSpacing = 16 * dpr;

    ctx.textAlign = 'left';
    ctx.font = `400 ${Math.round(9.5 * dpr)}px 'Space Mono', monospace`;

    const visibleCount = Math.min(terminalLines.length, Math.floor((time * 1.5) % (terminalLines.length + 3)));

    for (let i = 0; i < terminalLines.length; i++) {
      if (i > visibleCount) break;

      const line = terminalLines[i];
      if (line.prefix === '$') {
        ctx.fillStyle = '#38c85a';
        ctx.fillText(line.prefix, textStartX, textY);
        ctx.fillStyle = '#e8f0e9';
        ctx.fillText(' ' + line.text, textStartX + 8 * dpr, textY);
      } else if (line.prefix === '✔') {
        ctx.fillStyle = '#38c85a';
        ctx.fillText(line.prefix, textStartX, textY);
        ctx.fillStyle = '#a8ecba';
        ctx.fillText(' ' + line.text, textStartX + 12 * dpr, textY);
      } else {
        ctx.fillStyle = '#5a6870';
        ctx.fillText(line.prefix, textStartX, textY);
        ctx.fillStyle = '#8fa1a8';
        ctx.fillText(' ' + line.text, textStartX + 10 * dpr, textY);
      }
      textY += lineSpacing;
    }

    // Blinking Cursor
    if (Math.sin(time * 5) > 0) {
      ctx.fillStyle = '#38c85a';
      ctx.fillRect(textStartX + 4 * dpr, textY - 9 * dpr, 6 * dpr, 11 * dpr);
    }

    ctx.restore();

    animationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}
