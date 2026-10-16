/**
 * Radix UI Interactive 3D Prismatic Polyhedron (Crystal Core)
 * Renders an architectural 3D icosahedral crystal with translucent Radix Indigo/Cyan
 * faceted refraction, glowing vertex nodes, specular edge highlights, and an
 * embedded central CLA monogram badge.
 */

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  scale: number;
}

interface Face3D {
  indices: [number, number, number];
  normalZ: number;
  avgZ: number;
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

  // Generate 12 vertices of an icosahedron
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVertices: Point3D[] = [
    { x: -1, y: phi, z: 0 },
    { x: 1, y: phi, z: 0 },
    { x: -1, y: -phi, z: 0 },
    { x: 1, y: -phi, z: 0 },

    { x: 0, y: -1, z: phi },
    { x: 0, y: 1, z: phi },
    { x: 0, y: -1, z: -phi },
    { x: 0, y: 1, z: -phi },

    { x: phi, y: 0, z: -1 },
    { x: phi, y: 0, z: 1 },
    { x: -phi, y: 0, z: -1 },
    { x: -phi, y: 0, z: 1 },
  ];

  // Normalize vertices onto sphere
  const radiusNorm = Math.sqrt(1 + phi * phi);
  const vertices: Point3D[] = rawVertices.map(v => ({
    x: v.x / radiusNorm,
    y: v.y / radiusNorm,
    z: v.z / radiusNorm,
  }));

  // Define the 20 triangular faces
  const faceIndices: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  let angleX = 0.25;
  let angleY = 0.35;
  let targetRotX = 0;
  let targetRotY = 0;
  let time = 0;

  // Track cursor movement across hero container for interactive 3D rotation
  const container = canvas.closest('.hero-avatar-wrapper');
  if (container) {
    container.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = container.getBoundingClientRect();
      const nx = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
      const ny = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 1.8;
      targetRotX = -ny * 1.8;
    });

    container.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });
  }

  function project(p: Point3D, scale: number, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number): ProjectedPoint {
    // Rotate Y
    const x1 = p.x * cosY + p.z * sinY;
    const y1 = p.y;
    const z1 = -p.x * sinY + p.z * cosY;

    // Rotate X
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    const distance = 3.2;
    const fov = 1 / (distance - z2 * 0.4);

    return {
      x: cx + x2 * scale * fov,
      y: cy + y2 * scale * fov,
      z: z2,
      scale: fov,
    };
  }

  function render() {
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    time += 0.012;

    // Smooth inertia interpolation
    angleX += 0.005 + (targetRotX - angleX) * 0.04;
    angleY += 0.008 + (targetRotY - angleY) * 0.04;

    const cx = width / 2;
    const cy = height / 2;
    const crystalRadius = Math.min(width, height) * 0.38;

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // 1. Project all vertices
    const projected: ProjectedPoint[] = vertices.map(v =>
      project(v, crystalRadius, cx, cy, cosX, sinX, cosY, sinY)
    );

    // 2. Outer Radix Orbital Rings
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, crystalRadius * 1.35, crystalRadius * 0.55, angleY * 0.3, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(0, 187, 167, 0.25)' : 'rgba(0, 187, 167, 0.18)';
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([3 * dpr, 6 * dpr]);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx, cy, crystalRadius * 1.15, crystalRadius * 0.95, -angleX * 0.4, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.18)';
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([2 * dpr, 8 * dpr]);
    ctx.stroke();
    ctx.restore();

    // 3. Compute and sort faces by average Z depth
    const faces: Face3D[] = faceIndices.map(indices => {
      const p0 = projected[indices[0]];
      const p1 = projected[indices[1]];
      const p2 = projected[indices[2]];

      // Cross product for normal in screen space
      const ux = p1.x - p0.x;
      const uy = p1.y - p0.y;
      const vx = p2.x - p0.x;
      const vy = p2.y - p0.y;
      const normalZ = ux * vy - uy * vx;
      const avgZ = (p0.z + p1.z + p2.z) / 3;

      return { indices, normalZ, avgZ };
    });

    faces.sort((a, b) => a.avgZ - b.avgZ);

    // 4. Render translucent crystal facets
    for (const face of faces) {
      const [i0, i1, i2] = face.indices;
      const p0 = projected[i0];
      const p1 = projected[i1];
      const p2 = projected[i2];

      const isFacing = face.normalZ < 0;

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();

      if (isFacing) {
        // Front-facing facet: vibrant Seafoam Teal to Oceanic Cyan shimmer
        const depthFactor = (face.avgZ + 1) / 2; // 0 to 1
        const alpha = isDark ? 0.2 + depthFactor * 0.2 : 0.14 + depthFactor * 0.14;

        const grad = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(0, 187, 167, ${alpha * 1.15})`);
        grad.addColorStop(0.5, `rgba(6, 182, 212, ${alpha})`);
        grad.addColorStop(1, `rgba(14, 165, 233, ${alpha * 1.2})`);

        ctx.fillStyle = grad;
        ctx.fill();

        // Facet edge highlights
        ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${0.12 + depthFactor * 0.22})` : `rgba(0, 187, 167, ${0.25 + depthFactor * 0.25})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();
      } else {
        // Back-facing facet: subtle dark translucent mesh
        ctx.fillStyle = isDark ? 'rgba(17, 17, 19, 0.25)' : 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
        ctx.strokeStyle = isDark ? 'rgba(0, 187, 167, 0.08)' : 'rgba(0, 187, 167, 0.06)';
        ctx.lineWidth = 0.8 * dpr;
        ctx.stroke();
      }
    }

    // 5. Draw glowing vertex nodes
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      if (p.z < -0.4) continue; // Behind crystal

      const pulse = (Math.sin(time * 3 + i) + 1) / 2;
      const nodeRadius = (2.5 + pulse * 1.5) * dpr;

      // Glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, nodeRadius * 3, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? `rgba(14, 165, 233, ${0.18 + pulse * 0.22})` : `rgba(0, 187, 167, ${0.14 + pulse * 0.18})`;
      ctx.fill();

      // Sharp node core
      ctx.beginPath();
      ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#38bdf8' : '#00bba7';
      ctx.fill();
    }

    // 6. Central Radix High-Craft Monogram Badge
    ctx.save();
    const badgeRadius = crystalRadius * 0.38;

    // Ambient radial glow behind badge
    const badgeGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, badgeRadius * 1.5);
    badgeGlow.addColorStop(0, isDark ? 'rgba(0, 187, 167, 0.45)' : 'rgba(0, 187, 167, 0.25)');
    badgeGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = badgeGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, badgeRadius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Solid Glass Badge with Radix slate surface
    ctx.beginPath();
    ctx.arc(cx, cy, badgeRadius, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? 'rgba(17, 17, 19, 0.92)' : 'rgba(255, 255, 255, 0.92)';
    ctx.fill();

    // Inset specular border
    ctx.strokeStyle = isDark ? 'rgba(0, 187, 167, 0.85)' : 'rgba(0, 187, 167, 0.65)';
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();

    // Monogram Typography
    ctx.font = `800 ${Math.round(22 * dpr)}px 'Inter', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isDark ? '#eeeeee' : '#111113';
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
