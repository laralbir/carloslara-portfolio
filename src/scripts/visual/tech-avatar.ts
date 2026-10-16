/**
 * Cyber HUD 3D Holographic Gyroscope & Radar Telemetry Avatar
 * Renders 3D concentric gimbal rings, telemetry radar sweep,
 * reticle crosshairs, and digital targeting coordinates.
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

  let angleX = 0.25;
  let angleY = 0.45;
  let targetRotX = 0;
  let targetRotY = 0;
  let sweepAngle = 0;

  // Track mouse over canvas container for interactive 3D tilt
  const container = canvas.closest('.hero-avatar-wrapper');
  if (container) {
    container.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = container.getBoundingClientRect();
      const nx = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
      const ny = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 1.5;
      targetRotX = -ny * 1.5;
    });

    container.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });
  }

  // Draw 3D tilted ring
  function draw3DRing(
    radius: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    color: string,
    lineWidth: number,
    dashPattern: number[] = [],
    numTicks = 0
  ) {
    if (!ctx) return;
    const segments = 64;
    const points: { x: number; y: number; z: number }[] = [];

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosZ = Math.cos(rotZ);
    const sinZ = Math.sin(rotZ);

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      // 2D Circle in X-Y plane
      const rx = radius * Math.cos(theta);
      const ry = radius * Math.sin(theta);
      const rz = 0;

      // Rotate Z
      const x1 = rx * cosZ - ry * sinZ;
      const y1 = rx * sinZ + ry * cosZ;
      const z1 = rz;

      // Rotate Y
      const x2 = x1 * cosY + z1 * sinY;
      const y2 = y1;
      const z2 = -x1 * sinY + z1 * cosY;

      // Rotate X
      const x3 = x2;
      const y3 = y2 * cosX - z2 * sinX;
      const z3 = y2 * sinX + z2 * cosX;

      points.push({ x: x3, y: y3, z: z3 });
    }

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth * dpr;
    if (dashPattern.length > 0) {
      ctx.setLineDash(dashPattern.map(d => d * dpr));
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // Draw ticks if specified
    if (numTicks > 0) {
      ctx.setLineDash([]);
      for (let i = 0; i < numTicks; i++) {
        const idx = Math.floor((i / numTicks) * segments);
        const p = points[idx];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    ctx.restore();
  }

  function render() {
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    sweepAngle += 0.025;
    angleX += 0.005 + (targetRotX - angleX) * 0.03;
    angleY += 0.008 + (targetRotY - angleY) * 0.03;

    const cx = width / 2;
    const cy = height / 2;
    const baseScale = Math.min(width, height) * 0.42;

    ctx.save();
    ctx.translate(cx, cy);

    // 1. Radar Sweep Beam (2D Background)
    const sweepRadius = baseScale * 0.95;
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, sweepRadius);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
    grad.addColorStop(1, 'transparent');

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, sweepRadius, sweepAngle, sweepAngle + 0.45);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Sweep lead line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(sweepAngle + 0.45) * sweepRadius, Math.sin(sweepAngle + 0.45) * sweepRadius);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
    ctx.lineWidth = 1.25 * dpr;
    ctx.stroke();
    ctx.restore();

    // 2. Fixed Outer Telemetry Compass Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, baseScale * 0.96, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.lineWidth = 1 * dpr;
    ctx.stroke();

    // 4 Cardinal tick reticles
    const cardinalLen = 8 * dpr;
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5 * dpr;
    // North
    ctx.beginPath(); ctx.moveTo(0, -baseScale * 0.96); ctx.lineTo(0, -baseScale * 0.96 + cardinalLen); ctx.stroke();
    // South
    ctx.beginPath(); ctx.moveTo(0, baseScale * 0.96); ctx.lineTo(0, baseScale * 0.96 - cardinalLen); ctx.stroke();
    // East
    ctx.beginPath(); ctx.moveTo(baseScale * 0.96, 0); ctx.lineTo(baseScale * 0.96 - cardinalLen, 0); ctx.stroke();
    // West
    ctx.beginPath(); ctx.moveTo(-baseScale * 0.96, 0); ctx.lineTo(-baseScale * 0.96 + cardinalLen, 0); ctx.stroke();
    ctx.restore();

    // 3. 3D Concentric Gimbal Gyroscope Rings
    // Ring 1: Outer cyan ring rotating on angleX, angleY
    draw3DRing(baseScale * 0.85, angleX, angleY, sweepAngle * 0.4, '#06b6d4', 1.5, [6, 4], 8);

    // Ring 2: Middle violet ring rotating counter-clockwise
    draw3DRing(baseScale * 0.65, angleX + 0.5, -angleY + 0.3, -sweepAngle * 0.6, '#a855f7', 1.25, [4, 6], 6);

    // Ring 3: Inner fast cyan orbital ring
    draw3DRing(baseScale * 0.46, angleX * 1.5, angleY * 1.5, sweepAngle * 1.2, 'rgba(6, 182, 212, 0.6)', 1, [], 4);

    // 4. Central Target Reticle & Monogram 'CLA'
    const badgeRadius = baseScale * 0.32;

    // Dark solid aperture circle
    ctx.beginPath();
    ctx.arc(0, 0, badgeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(3, 7, 18, 0.94)';
    ctx.fill();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();

    // Crosshair lines inside aperture
    const chLen = 6 * dpr;
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
    ctx.lineWidth = 1 * dpr;
    ctx.beginPath(); ctx.moveTo(-badgeRadius, 0); ctx.lineTo(-badgeRadius + chLen, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(badgeRadius, 0); ctx.lineTo(badgeRadius - chLen, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -badgeRadius); ctx.lineTo(0, -badgeRadius + chLen); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, badgeRadius); ctx.lineTo(0, badgeRadius - chLen); ctx.stroke();

    // Monogram CLA
    ctx.font = `700 ${Math.round(22 * dpr)}px 'Chakra Petch', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('CLA', 0, 1);

    // Telemetry text below aperture
    ctx.font = `500 ${Math.round(8 * dpr)}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = 'rgba(6, 182, 212, 0.75)';
    ctx.fillText('SYS::39.46°N 0.37°W', 0, badgeRadius + 14 * dpr);

    ctx.restore();

    animationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}
