/**
 * Atmospheric Kinetic 3D Avatar
 * Living particle nebula with organic breathing oscillations,
 * kinetic constellations, and frosted monogram glass core.
 */

interface Particle3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  speed: number;
  phase: number;
  size: number;
  hue: number;
}

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

  // Generate 120 spherical / orbital nebula particles
  const particleCount = 120;
  const particles: Particle3D[] = [];
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.random() * Math.PI * 2;
    // Vary radius between 0.75 and 1.35
    const r = 0.75 + Math.random() * 0.6;
    particles.push({
      baseX: r * Math.sin(theta) * Math.cos(phi),
      baseY: r * Math.sin(theta) * Math.sin(phi),
      baseZ: r * Math.cos(theta),
      speed: 0.8 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      size: 1.5 + Math.random() * 2,
      hue: Math.random() > 0.45 ? 270 : 190, // Violet or Cyan
    });
  }

  let angleX = 0.2;
  let angleY = 0.4;
  let targetRotX = 0;
  let targetRotY = 0;
  let time = 0;

  // Track mouse over canvas container for interactive tilt
  const container = canvas.closest('.hero-avatar-wrapper');
  if (container) {
    container.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = container.getBoundingClientRect();
      const nx = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
      const ny = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 1.6;
      targetRotX = -ny * 1.6;
    });

    container.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });
  }

  function render() {
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    time += 0.015;

    // Smooth rotation towards mouse target + continuous slow drift
    angleX += 0.005 + (targetRotX - angleX) * 0.03;
    angleY += 0.008 + (targetRotY - angleY) * 0.03;

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) * 0.28;

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    const projected: { x: number; y: number; z: number; size: number; hue: number; alpha: number }[] = [];

    // Calculate dynamic 3D positions with breathing harmonic wave
    for (const p of particles) {
      const wave = Math.sin(time * p.speed + p.phase) * 0.12;
      const currentRadiusScale = 1 + wave;

      const px = p.baseX * currentRadiusScale;
      const py = p.baseY * currentRadiusScale;
      const pz = p.baseZ * currentRadiusScale;

      // Rotation Y
      const x1 = px * cosY + pz * sinY;
      const y1 = py;
      const z1 = -px * sinY + pz * cosY;

      // Rotation X
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // Perspective projection
      const distance = 3.2;
      const fov = 1 / (distance - z2 * 0.35);

      projected.push({
        x: cx + x2 * scale * fov,
        y: cy + y2 * scale * fov,
        z: z2,
        size: p.size * fov * dpr,
        hue: p.hue,
        alpha: Math.max(0.2, Math.min(0.9, (z2 + 1.5) / 3)),
      });
    }

    // Sort particles by depth for painter's algorithm
    projected.sort((a, b) => a.z - b.z);

    // Draw kinetic constellation connections between close neighbor particles
    const maxDist = 55 * dpr;
    const maxDistSq = maxDist * maxDist;

    ctx.lineWidth = 0.8 * dpr;
    for (let i = 0; i < projected.length; i++) {
      const p1 = projected[i];
      for (let j = i + 1; j < projected.length; j++) {
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const proximity = 1 - Math.sqrt(distSq) / maxDist;
          const lineAlpha = proximity * 0.25 * ((p1.alpha + p2.alpha) / 2);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of projected) {
      // Glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = p.hue === 270 
        ? `rgba(139, 92, 246, ${p.alpha * 0.25})`
        : `rgba(6, 182, 212, ${p.alpha * 0.25})`;
      ctx.fill();

      // Sharp core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.hue === 270
        ? `rgba(216, 180, 254, ${p.alpha})`
        : `rgba(165, 243, 252, ${p.alpha})`;
      ctx.fill();
    }

    // Central Frosted Glass Core with Monogram 'CLA'
    ctx.save();
    const badgeRadius = Math.min(width, height) * 0.175;

    // Diffused radiant glow
    const radialGrad = ctx.createRadialGradient(cx, cy, badgeRadius * 0.2, cx, cy, badgeRadius * 1.6);
    radialGrad.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
    radialGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.15)');
    radialGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, badgeRadius * 1.6, 0, Math.PI * 2);
    ctx.fill();

    // Central frosted circle
    ctx.beginPath();
    ctx.arc(cx, cy, badgeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14, 21, 51, 0.88)';
    ctx.fill();

    // Subtle iridescent ring
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.65)';
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();

    // Typography Monogram
    ctx.font = `800 ${Math.round(26 * dpr)}px 'Outfit', system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('CLA', cx, cy + 1);

    ctx.restore();

    animationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}
