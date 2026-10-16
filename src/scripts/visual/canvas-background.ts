/**
 * Interactive Background: Digital Flow Streams (Sine Waves)
 * Ultra-smooth, relaxing harmonic waves in margins that simulate event-driven
 * data pipelines without crossing or obscuring main text readability.
 */

interface StreamPacket {
  pos: number; // 0 to 1 along stream
  speed: number;
  radius: number;
}

interface FlowStream {
  baseYPercent: number;
  amplitude: number;
  frequency: number;
  speed: number;
  secondaryAmp: number;
  secondaryFreq: number;
  secondarySpeed: number;
  phase: number;
  lineWidth: number;
  themeType: 'teal' | 'cyan';
  packets: StreamPacket[];
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
  let time = 0;

  // Mouse coords
  let mouseX = -1000;
  let mouseY = -1000;

  // Define 5 harmonic digital flow streams concentrated in upper and lower margins
  const streams: FlowStream[] = [
    {
      baseYPercent: 0.07,
      amplitude: 22,
      frequency: 0.0016,
      speed: 0.0009,
      secondaryAmp: 10,
      secondaryFreq: 0.0032,
      secondarySpeed: 0.0014,
      phase: 0.2,
      lineWidth: 1.1,
      themeType: 'teal',
      packets: [
        { pos: 0.15, speed: 0.00035, radius: 2.2 },
        { pos: 0.82, speed: 0.00045, radius: 2.5 },
      ],
    },
    {
      baseYPercent: 0.14,
      amplitude: 28,
      frequency: 0.0012,
      speed: 0.0012,
      secondaryAmp: 14,
      secondaryFreq: 0.0028,
      secondarySpeed: 0.0018,
      phase: 1.5,
      lineWidth: 0.95,
      themeType: 'cyan',
      packets: [
        { pos: 0.08, speed: 0.0004, radius: 2.0 },
        { pos: 0.74, speed: 0.0005, radius: 2.4 },
      ],
    },
    {
      baseYPercent: 0.78,
      amplitude: 30,
      frequency: 0.0014,
      speed: 0.001,
      secondaryAmp: 12,
      secondaryFreq: 0.003,
      secondarySpeed: 0.0015,
      phase: 2.8,
      lineWidth: 1.05,
      themeType: 'teal',
      packets: [
        { pos: 0.2, speed: 0.00045, radius: 2.2 },
        { pos: 0.88, speed: 0.00038, radius: 2.4 },
      ],
    },
    {
      baseYPercent: 0.86,
      amplitude: 36,
      frequency: 0.0011,
      speed: 0.0013,
      secondaryAmp: 16,
      secondaryFreq: 0.0022,
      secondarySpeed: 0.002,
      phase: 4.1,
      lineWidth: 1.2,
      themeType: 'cyan',
      packets: [
        { pos: 0.12, speed: 0.0005, radius: 2.6 },
        { pos: 0.79, speed: 0.00042, radius: 2.2 },
      ],
    },
    {
      baseYPercent: 0.93,
      amplitude: 24,
      frequency: 0.0018,
      speed: 0.0008,
      secondaryAmp: 11,
      secondaryFreq: 0.0036,
      secondarySpeed: 0.0012,
      phase: 5.4,
      lineWidth: 0.85,
      themeType: 'teal',
      packets: [
        { pos: 0.25, speed: 0.00032, radius: 1.9 },
        { pos: 0.85, speed: 0.00048, radius: 2.1 },
      ],
    },
  ];

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

  function getStreamY(stream: FlowStream, x: number): number {
    const baseY = stream.baseYPercent * height;

    // Smooth mouse ripple deflection
    const dx = mouseX - x;
    const dy = mouseY - baseY;
    const mouseDist = Math.sqrt(dx * dx + dy * dy);
    let mouseOffset = 0;
    if (mouseDist < 200) {
      const force = Math.sin(((200 - mouseDist) / 200) * Math.PI);
      mouseOffset = force * 16 * (dy > 0 ? -1 : 1);
    }

    return (
      baseY +
      Math.sin(x * stream.frequency + time * stream.speed + stream.phase) * stream.amplitude +
      Math.cos(x * stream.secondaryFreq - time * stream.secondarySpeed) * stream.secondaryAmp +
      mouseOffset
    );
  }

  function render() {
    if (!ctx || !isVisible) return;
    ctx.clearRect(0, 0, width, height);

    time += 1.0;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Draw each flow stream with a center-faded linear gradient (zero interference with text)
    for (const stream of streams) {
      const grad = ctx.createLinearGradient(0, 0, width, 0);

      if (isDark) {
        if (stream.themeType === 'teal') {
          grad.addColorStop(0, 'rgba(0, 220, 195, 0.40)');
          grad.addColorStop(0.2, 'rgba(0, 220, 195, 0.28)');
          grad.addColorStop(0.38, 'rgba(0, 220, 195, 0.05)');
          grad.addColorStop(0.5, 'rgba(0, 220, 195, 0.02)');
          grad.addColorStop(0.62, 'rgba(0, 220, 195, 0.05)');
          grad.addColorStop(0.8, 'rgba(0, 220, 195, 0.28)');
          grad.addColorStop(1, 'rgba(0, 220, 195, 0.40)');
        } else {
          grad.addColorStop(0, 'rgba(56, 189, 248, 0.40)');
          grad.addColorStop(0.2, 'rgba(56, 189, 248, 0.28)');
          grad.addColorStop(0.38, 'rgba(56, 189, 248, 0.05)');
          grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.02)');
          grad.addColorStop(0.62, 'rgba(56, 189, 248, 0.05)');
          grad.addColorStop(0.8, 'rgba(56, 189, 248, 0.28)');
          grad.addColorStop(1, 'rgba(56, 189, 248, 0.40)');
        }
      } else {
        // Light Theme: subtle, airy Seafoam Teal & Oceanic Cyan hairlines
        if (stream.themeType === 'teal') {
          grad.addColorStop(0, 'rgba(0, 187, 167, 0.32)');
          grad.addColorStop(0.2, 'rgba(0, 187, 167, 0.22)');
          grad.addColorStop(0.38, 'rgba(0, 187, 167, 0.04)');
          grad.addColorStop(0.5, 'rgba(0, 187, 167, 0.01)');
          grad.addColorStop(0.62, 'rgba(0, 187, 167, 0.04)');
          grad.addColorStop(0.8, 'rgba(0, 187, 167, 0.22)');
          grad.addColorStop(1, 'rgba(0, 187, 167, 0.32)');
        } else {
          grad.addColorStop(0, 'rgba(14, 165, 233, 0.32)');
          grad.addColorStop(0.2, 'rgba(14, 165, 233, 0.22)');
          grad.addColorStop(0.38, 'rgba(14, 165, 233, 0.04)');
          grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.01)');
          grad.addColorStop(0.62, 'rgba(14, 165, 233, 0.04)');
          grad.addColorStop(0.8, 'rgba(14, 165, 233, 0.22)');
          grad.addColorStop(1, 'rgba(14, 165, 233, 0.32)');
        }
      }

      ctx.beginPath();
      const step = 8;
      for (let x = 0; x <= width + step; x += step) {
        const y = getStreamY(stream, x);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = stream.lineWidth;
      ctx.stroke();

      // Telemetry micro-packets traveling quietly along streams
      for (const packet of stream.packets) {
        packet.pos += packet.speed;
        if (packet.pos > 1) packet.pos = 0;

        // Fades smoothly when entering center area (distance from center = 0 to 1)
        const centerDist = Math.abs(packet.pos - 0.5) * 2;
        const packetAlpha = Math.pow(centerDist, 2.2);

        if (packetAlpha > 0.08) {
          const px = packet.pos * width;
          const py = getStreamY(stream, px);

          const colorBase =
            stream.themeType === 'teal'
              ? isDark
                ? '0, 220, 195'
                : '0, 187, 167'
              : isDark
                ? '56, 189, 248'
                : '14, 165, 233';

          // Soft pulse halo
          ctx.beginPath();
          ctx.arc(px, py, packet.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorBase}, ${packetAlpha * (isDark ? 0.25 : 0.18)})`;
          ctx.fill();

          // Sharp micro core
          ctx.beginPath();
          ctx.arc(px, py, packet.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorBase}, ${packetAlpha * (isDark ? 0.85 : 0.65)})`;
          ctx.fill();
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

