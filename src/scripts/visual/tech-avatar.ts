/**
 * Holographic 3D Interactive Tech Avatar
 * Renders a rotating 3D geometric wireframe core with monogram 'CLA'
 * Designed for the initial version without photo.
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

  // 3D Icosahedron / Octahedron Geometry Vertices
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

  // Edges connecting vertices
  const edges: [number, number][] = [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [1, 9], [1, 8], [1, 7],
    [2, 11], [2, 4], [2, 3], [2, 6], [2, 10],
    [3, 4], [3, 9], [3, 8], [3, 6],
    [4, 11], [4, 5], [4, 9],
    [5, 9], [6, 10], [6, 7], [6, 8],
    [7, 8], [8, 9], [10, 11],
  ];

  let angleX = 0.2;
  let angleY = 0.4;
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

  function render() {
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const primaryColor = isDark ? '#3b82f6' : '#2563eb';
    const edgeColor = isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.35)';

    // Smooth rotation towards target + continuous idle rotation
    angleX += 0.006 + (targetRotX - angleX) * 0.03;
    angleY += 0.01 + (targetRotY - angleY) * 0.03;

    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) * 0.26;

    // Rotate and project vertices to 2D
    const projected: { x: number; y: number; z: number }[] = [];

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    for (const v of rawVertices) {
      // Rotation Y
      const x1 = v.x * cosY + v.z * sinY;
      const y1 = v.y;
      const z1 = -v.x * sinY + v.z * cosY;

      // Rotation X
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // Perspective projection
      const distance = 3.5;
      const fov = 1 / (distance - z2 * 0.3);

      projected.push({
        x: cx + x2 * scale * fov,
        y: cy + y2 * scale * fov,
        z: z2,
      });
    }

    // Faces for the icosahedron (triangles)
    const faces: [number, number, number][] = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    // Draw translucent facet fills sorted by depth
    const faceDepths = faces.map(face => {
      const zAvg = (projected[face[0]].z + projected[face[1]].z + projected[face[2]].z) / 3;
      return { face, zAvg };
    });
    faceDepths.sort((a, b) => a.zAvg - b.zAvg);

    for (const item of faceDepths) {
      const f = item.face;
      const p1 = projected[f[0]];
      const p2 = projected[f[1]];
      const p3 = projected[f[2]];

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();

      // Normal brightness based on average z
      const alpha = Math.max(0.03, Math.min(0.18, 0.08 + item.zAvg * 0.06));
      ctx.fillStyle = isDark ? `rgba(99, 102, 241, ${alpha})` : `rgba(37, 99, 235, ${alpha * 0.7})`;
      ctx.fill();
    }

    // Draw connecting wireframe edges
    ctx.lineWidth = 1.25 * dpr;
    for (const [startIndex, endIndex] of edges) {
      const p1 = projected[startIndex];
      const p2 = projected[endIndex];

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = edgeColor;
      ctx.stroke();
    }

    // Outer subtle orbital ring
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, scale * 1.55, scale * 0.55, angleY * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(37, 99, 235, 0.2)';
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([4 * dpr, 6 * dpr]);
    ctx.stroke();
    ctx.restore();

    // Draw vertex glowing dots
    for (const p of projected) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();
      // Glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(37, 99, 235, 0.1)';
      ctx.fill();
    }

    // Central Monogram Badge 'CLA'
    ctx.save();
    const badgeRadius = Math.min(width, height) * 0.17;

    // Central circular ambient shadow & glass backdrop
    ctx.beginPath();
    ctx.arc(cx, cy, badgeRadius, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? 'rgba(7, 8, 12, 0.92)' : 'rgba(255, 255, 255, 0.95)';
    ctx.fill();
    ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.6)' : 'rgba(37, 99, 235, 0.5)';
    ctx.lineWidth = 1.5 * dpr;
    ctx.stroke();

    // Text monogram
    ctx.font = `800 ${Math.round(24 * dpr)}px 'Plus Jakarta Sans', system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isDark ? '#ffffff' : '#07080c';
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

