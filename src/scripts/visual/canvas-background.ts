/**
 * Interactive Background: 2D/3D Event-Driven Node Network
 * Simulates microservices, async event queues, and message pulses.
 */

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
}

export function initCanvasBackground(): () => void {
  const canvas = document.getElementById('canvas-background') as HTMLCanvasElement | null;
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return () => {};

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let animationId = 0;
  let isVisible = true;

  // Mouse coords
  let mouseX = -1000;
  let mouseY = -1000;

  const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
  const nodes: NodePoint[] = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.75 + 1,
      pulse: Math.random() * Math.PI,
    });
  }

  function handleResize() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function handleVisibilityChange() {
    isVisible = !document.hidden;
    if (isVisible) {
      render();
    } else {
      cancelAnimationFrame(animationId);
    }
  }

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);

  function render() {
    if (!ctx || !isVisible) return;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const nodeColor = isDark ? 'rgba(0, 187, 167, ' : 'rgba(0, 187, 167, ';
    const lineColor = isDark ? 'rgba(0, 187, 167, ' : 'rgba(0, 187, 167, ';

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off boundaries
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      node.pulse += 0.02;
      const pulsingRadius = node.radius + Math.sin(node.pulse) * 0.5;

      // Interactive gentle push away from cursor
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        node.x -= (dx / dist) * force * 1.5;
        node.y -= (dy / dist) * force * 1.5;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, pulsingRadius, 0, Math.PI * 2);
      ctx.fillStyle = `${nodeColor}${isDark ? 0.45 : 0.25})`;
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j];
        const lineDx = node.x - nodeB.x;
        const lineDy = node.y - nodeB.y;
        const distance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

        if (distance < 130) {
          const alpha = (1 - distance / 130) * (isDark ? 0.15 : 0.08);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `${lineColor}${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}

