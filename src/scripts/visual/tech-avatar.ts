/**
 * Cruip Simple Interactive 3D Global Network Sphere
 * Renders an elegant 3D wireframe globe with live distributed nodes,
 * orbital arcs, and Cruip Royal Blue specular highlights.
 */

interface Node3D {
  lat: number;
  lon: number;
  label: string;
  pulsePhase: number;
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

  // Network nodes representing distributed global edge locations
  const nodes: Node3D[] = [
    { lat: 0.7, lon: -0.1, label: 'Madrid', pulsePhase: 0 },
    { lat: 0.85, lon: 0.2, label: 'Frankfurt', pulsePhase: 1 },
    { lat: 0.65, lon: -1.3, label: 'US-East', pulsePhase: 2 },
    { lat: 0.6, lon: 2.4, label: 'Tokyo', pulsePhase: 3 },
    { lat: 0.2, lon: 1.8, label: 'Singapore', pulsePhase: 4 },
    { lat: -0.5, lon: 2.6, label: 'Sydney', pulsePhase: 5 },
    { lat: -0.4, lon: -0.8, label: 'São Paulo', pulsePhase: 1.5 },
  ];

  let angleX = 0.2;
  let angleY = 0.3;
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
      targetRotY = nx * 1.4;
      targetRotX = -ny * 1.4;
    });

    container.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });
  }

  function project(x: number, y: number, z: number, scale: number, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number) {
    // Rotation Y
    const x1 = x * cosY + z * sinY;
    const y1 = y;
    const z1 = -x * sinY + z * cosY;

    // Rotation X
    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    const distance = 3.6;
    const fov = 1 / (distance - z2 * 0.3);

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

    time += 0.015;

    // Smooth rotation towards target + continuous idle drift
    angleX += 0.004 + (targetRotX - angleX) * 0.03;
    angleY += 0.008 + (targetRotY - angleY) * 0.03;

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.34;

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const primaryColor = '#2563eb';
    const wireColor = isDark ? 'rgba(59, 130, 246, 0.22)' : 'rgba(37, 99, 235, 0.16)';

    // 1. Draw Globe Latitude Rings
    const latCount = 5;
    for (let i = 1; i <= latCount; i++) {
      const latAngle = ((i / (latCount + 1)) - 0.5) * Math.PI;
      const rRing = radius * Math.cos(latAngle);
      const yRing = radius * Math.sin(latAngle);

      const segments = 40;
      ctx.beginPath();
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI * 2;
        const px = rRing * Math.cos(phi);
        const pz = rRing * Math.sin(phi);
        const pt = project(px, yRing, pz, 1, cx, cy, cosX, sinX, cosY, sinY);
        if (j === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = wireColor;
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();
    }

    // 2. Draw Globe Longitude Meridians
    const lonCount = 6;
    for (let i = 0; i < lonCount; i++) {
      const lonAngle = (i / lonCount) * Math.PI;
      const segments = 40;
      ctx.beginPath();
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        const px = radius * Math.sin(theta) * Math.cos(lonAngle);
        const py = radius * Math.cos(theta);
        const pz = radius * Math.sin(theta) * Math.sin(lonAngle);
        const pt = project(px, py, pz, 1, cx, cy, cosX, sinX, cosY, sinY);
        if (j === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = wireColor;
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();
    }

    // 3. Draw Outer Floating Orbit Ring
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius * 1.25, radius * 0.45, angleY * 0.4, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.25)';
    ctx.lineWidth = 1.25 * dpr;
    ctx.setLineDash([4 * dpr, 6 * dpr]);
    ctx.stroke();
    ctx.restore();

    // 4. Project and Draw Distributed Network Nodes
    const projectedNodes = nodes.map(n => {
      const px = radius * Math.cos(n.lat) * Math.sin(n.lon);
      const py = radius * Math.sin(n.lat);
      const pz = radius * Math.cos(n.lat) * Math.cos(n.lon);
      const pt = project(px, py, pz, 1, cx, cy, cosX, sinX, cosY, sinY);
      return { ...n, pt };
    });

    // Draw connecting sync lines between front nodes
    ctx.lineWidth = 1 * dpr;
    for (let i = 0; i < projectedNodes.length; i++) {
      const n1 = projectedNodes[i];
      if (n1.pt.z < -0.2) continue; // Skip nodes on the back of the globe

      for (let j = i + 1; j < projectedNodes.length; j++) {
        const n2 = projectedNodes[j];
        if (n2.pt.z < -0.2) continue;

        ctx.beginPath();
        ctx.moveTo(n1.pt.x, n1.pt.y);
        ctx.lineTo(n2.pt.x, n2.pt.y);
        ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(37, 99, 235, 0.2)';
        ctx.stroke();
      }
    }

    // Draw nodes
    for (const node of projectedNodes) {
      if (node.pt.z < -0.3) continue; // Behind sphere

      const pulse = (Math.sin(time * 3 + node.pulsePhase) + 1) / 2;
      const nodeSize = 3 * dpr;

      // Glow halo
      ctx.beginPath();
      ctx.arc(node.pt.x, node.pt.y, (4 + pulse * 4) * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37, 99, 235, ${0.15 + pulse * 0.2})`;
      ctx.fill();

      // Core point
      ctx.beginPath();
      ctx.arc(node.pt.x, node.pt.y, nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();
    }

    // 5. Central Clean Glass Badge with 'CLA' Monogram
    ctx.save();
    const badgeRadius = radius * 0.42;

    // Ambient glow behind badge
    const badgeGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, badgeRadius * 1.4);
    badgeGlow.addColorStop(0, isDark ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.15)');
    badgeGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = badgeGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, badgeRadius * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Solid Glass Badge
    ctx.beginPath();
    ctx.arc(cx, cy, badgeRadius, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    ctx.fill();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2 * dpr;
    ctx.stroke();

    // Monogram Typography in Inter
    ctx.font = `800 ${Math.round(24 * dpr)}px 'Inter', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isDark ? '#ffffff' : '#111827';
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
