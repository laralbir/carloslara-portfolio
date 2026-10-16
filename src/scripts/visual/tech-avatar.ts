/**
 * Editorial Creative 3D Sculptural Ribbon Avatar
 * Parametric kinetic torus sculpture reminiscent of contemporary museum art,
 * architectural wireframe styling, and acid lime specular illumination.
 */

interface Point3D {
  x: number;
  y: number;
  z: number;
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

  // Generate parametric 3D Trefoil Torus Knot Ribbon
  const segments = 100;
  const ribbonWidth = 0.22;
  const strandA: Point3D[] = [];
  const strandB: Point3D[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    // Trefoil Knot parametric equations
    const r = 1.35 + 0.45 * Math.cos(3 * t);
    const cx = r * Math.cos(2 * t);
    const cy = r * Math.sin(2 * t);
    const cz = 0.7 * Math.sin(3 * t);

    // Tangent approximation
    const dt = 0.001;
    const rNext = 1.35 + 0.45 * Math.cos(3 * (t + dt));
    const tx = (rNext * Math.cos(2 * (t + dt)) - cx) / dt;
    const ty = (rNext * Math.sin(2 * (t + dt)) - cy) / dt;
    const tz = (0.7 * Math.sin(3 * (t + dt)) - cz) / dt;

    // Normal approximation (cross product with up vector)
    const len = Math.sqrt(tx * tx + ty * ty + tz * tz);
    const nx = -ty / len;
    const ny = tx / len;
    const nz = 0;

    strandA.push({
      x: cx + nx * ribbonWidth,
      y: cy + ny * ribbonWidth,
      z: cz + nz * ribbonWidth,
    });

    strandB.push({
      x: cx - nx * ribbonWidth,
      y: cy - ny * ribbonWidth,
      z: cz - nz * ribbonWidth,
    });
  }

  let angleX = 0.35;
  let angleY = 0.25;
  let targetRotX = 0;
  let targetRotY = 0;

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

  function projectPoint(p: Point3D, scale: number, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number) {
    const x1 = p.x * cosY + p.z * sinY;
    const y1 = p.y;
    const z1 = -p.x * sinY + p.z * cosY;

    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    const distance = 4.2;
    const fov = 1 / (distance - z2 * 0.3);

    return {
      x: cx + x2 * scale * fov,
      y: cy + y2 * scale * fov,
      z: z2,
    };
  }

  function render() {
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Continuous kinetic rotation + mouse response
    angleX += 0.006 + (targetRotX - angleX) * 0.03;
    angleY += 0.01 + (targetRotY - angleY) * 0.03;

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) * 0.24;

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    const projA = strandA.map(p => projectPoint(p, scale, cx, cy, cosX, sinX, cosY, sinY));
    const projB = strandB.map(p => projectPoint(p, scale, cx, cy, cosX, sinX, cosY, sinY));

    // Draw connecting architectural cross-ribs
    ctx.lineWidth = 1 * dpr;
    for (let i = 0; i < segments; i += 2) {
      const pa = projA[i];
      const pb = projB[i];
      const avgZ = (pa.z + pb.z) / 2;
      const alpha = Math.max(0.1, Math.min(0.5, (avgZ + 1.2) / 2.4));

      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = `rgba(212, 255, 56, ${alpha * 0.4})`;
      ctx.stroke();
    }

    // Draw main Strand A (Luminous Acid Line)
    ctx.beginPath();
    ctx.moveTo(projA[0].x, projA[0].y);
    for (let i = 1; i < projA.length; i++) {
      ctx.lineTo(projA[i].x, projA[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#d4ff38';
    ctx.lineWidth = 1.75 * dpr;
    ctx.stroke();

    // Draw Strand B (Graphite Secondary Line)
    ctx.beginPath();
    ctx.moveTo(projB[0].x, projB[0].y);
    for (let i = 1; i < projB.length; i++) {
      ctx.lineTo(projB[i].x, projB[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.2 * dpr;
    ctx.stroke();

    // Accent Vertex Nodes on key inflection points
    for (let i = 0; i < segments; i += 10) {
      const p = projA[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = '#d4ff38';
      ctx.fill();
    }

    // Central Monogram Block 'CLA' (Architectural Octagon / Diamond)
    ctx.save();
    const boxSize = Math.min(width, height) * 0.16;

    // Dark solid faceted backdrop
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.rect(-boxSize, -boxSize, boxSize * 2, boxSize * 2);
    ctx.fillStyle = '#0a0b0e';
    ctx.fill();
    ctx.strokeStyle = '#d4ff38';
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();

    // Subtle corner markers
    const markerLen = 6 * dpr;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5 * dpr;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(-boxSize - 3 * dpr, -boxSize + markerLen);
    ctx.lineTo(-boxSize - 3 * dpr, -boxSize - 3 * dpr);
    ctx.lineTo(-boxSize + markerLen, -boxSize - 3 * dpr);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(boxSize + 3 * dpr, boxSize - markerLen);
    ctx.lineTo(boxSize + 3 * dpr, boxSize + 3 * dpr);
    ctx.lineTo(boxSize - markerLen, boxSize + 3 * dpr);
    ctx.stroke();

    // Monogram Typography in Syne
    ctx.font = `800 ${Math.round(24 * dpr)}px 'Syne', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#d4ff38';
    ctx.fillText('CLA', 0, 1);

    ctx.restore();

    animationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}
