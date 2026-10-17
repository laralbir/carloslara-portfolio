/**
 * Offtopic Hobby Interactive Easter Eggs
 * 1. Archery: Interactive aiming dot click with instant score calculation & feedback.
 * 2. HiFi: Interactive vinyl rotation toggle (33 ⅓ RPM <-> 45 RPM Turbo) with visual grooves & sheen.
 * 3. Motorcycle: Perspective rear-view motorcycle with click-to-accelerate exhaust smoke & road speed-up.
 */

export interface ArcheryScoreResult {
  score: number;
  zone: string;
  label: string;
}

export function calculateArcheryScore(dx: number, dy: number): ArcheryScoreResult {
  const dist = Math.hypot(dx, dy);

  if (dist <= 6) {
    return { score: 10, zone: 'X (Centro)', label: '🎯 ¡10+ (X) Pleno al Centro!' };
  }
  if (dist <= 14) {
    return { score: 10, zone: 'Amarillo', label: '🎯 ¡10 AMARILLO!' };
  }
  if (dist <= 21) {
    return { score: 9, zone: 'Amarillo', label: '🎯 9 AMARILLO' };
  }
  if (dist <= 28) {
    return { score: 8, zone: 'Rojo', label: '🎯 8 ROJO' };
  }
  if (dist <= 35) {
    return { score: 7, zone: 'Rojo', label: '🎯 7 ROJO' };
  }
  if (dist <= 42) {
    return { score: 6, zone: 'Azul', label: '🎯 6 AZUL' };
  }
  if (dist <= 49) {
    return { score: 5, zone: 'Azul', label: '🎯 5 AZUL' };
  }
  if (dist <= 56) {
    return { score: 4, zone: 'Negro', label: '🎯 4 NEGRO' };
  }
  if (dist <= 63) {
    return { score: 3, zone: 'Negro', label: '🎯 3 NEGRO' };
  }
  if (dist <= 70) {
    return { score: 2, zone: 'Blanco', label: '🎯 2 BLANCO' };
  }
  return { score: 1, zone: 'Blanco', label: '🎯 1 BLANCO' };
}

let isAimingManual = false;
let currentAimX = 0;
let currentAimY = 0;
let targetAimX = 0;
let targetAimY = 0;
let aimRafId: number | null = null;

export function getManualAimState(): { isManual: boolean; x: number; y: number } {
  return { isManual: isAimingManual, x: currentAimX, y: currentAimY };
}

export function startManualAim(area: HTMLElement, clientX: number, clientY: number): void {
  const aimer = area.querySelector<HTMLElement>('.archery-sight-aimer');
  const targetSvg = area.querySelector<SVGSVGElement>('.archery-target-svg');
  if (!aimer || !targetSvg) return;

  isAimingManual = true;
  area.classList.add('is-aiming-manual');

  const updateCoords = (cx: number, cy: number) => {
    const svgRect = targetSvg.getBoundingClientRect();
    if (svgRect.width <= 0) return;
    const centerX = svgRect.left + svgRect.width / 2;
    const centerY = svgRect.top + svgRect.height / 2;
    const scaleX = 160 / svgRect.width;
    const scaleY = 160 / svgRect.height;

    let x = (cx - centerX) * scaleX;
    let y = (cy - centerY) * scaleY;
    const dist = Math.hypot(x, y);
    const maxRadius = 68;
    if (dist > maxRadius) {
      x = (x / dist) * maxRadius;
      y = (y / dist) * maxRadius;
    }
    targetAimX = x;
    targetAimY = y;
  };

  updateCoords(clientX, clientY);
  currentAimX = targetAimX;
  currentAimY = targetAimY;

  if (aimRafId) {
    cancelAnimationFrame(aimRafId);
  }

  const loop = () => {
    if (!isAimingManual) return;

    // Smooth inertia lerp (bow weight/stabilizer feeling)
    currentAimX += (targetAimX - currentAimX) * 0.22;
    currentAimY += (targetAimY - currentAimY) * 0.22;

    // Subtle breath tremor (simulates muscular bow holding under tension)
    const time = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    const tremorX = Math.sin(time * 0.007) * 1.5 + Math.sin(time * 0.017) * 0.7;
    const tremorY = Math.cos(time * 0.008) * 1.5 + Math.cos(time * 0.019) * 0.7;

    const finalX = currentAimX + tremorX;
    const finalY = currentAimY + tremorY;

    aimer.style.transform = `translate(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px)`;
    aimRafId = requestAnimationFrame(loop);
  };

  aimRafId = requestAnimationFrame(loop);
}

export function updateManualAimCoords(area: HTMLElement, clientX: number, clientY: number): void {
  if (!isAimingManual) return;
  const targetSvg = area.querySelector<SVGSVGElement>('.archery-target-svg');
  if (!targetSvg) return;

  const svgRect = targetSvg.getBoundingClientRect();
  if (svgRect.width <= 0) return;
  const centerX = svgRect.left + svgRect.width / 2;
  const centerY = svgRect.top + svgRect.height / 2;
  const scaleX = 160 / svgRect.width;
  const scaleY = 160 / svgRect.height;

  let x = (clientX - centerX) * scaleX;
  let y = (clientY - centerY) * scaleY;
  const dist = Math.hypot(x, y);
  const maxRadius = 68;
  if (dist > maxRadius) {
    x = (x / dist) * maxRadius;
    y = (y / dist) * maxRadius;
  }
  targetAimX = x;
  targetAimY = y;
}

export function stopManualAim(area: HTMLElement): void {
  isAimingManual = false;
  area.classList.remove('is-aiming-manual');

  if (aimRafId) {
    cancelAnimationFrame(aimRafId);
    aimRafId = null;
  }

  const aimer = area.querySelector<HTMLElement>('.archery-sight-aimer');
  if (aimer) {
    aimer.style.transform = '';
  }
}

export function triggerArcheryShot(area: HTMLElement): void {
  const feedback = area.querySelector<HTMLElement>('.archery-hit-feedback');
  const aimer = area.querySelector<HTMLElement>('#archery-sight-aimer') || area.querySelector<HTMLElement>('.archery-sight-aimer');
  const targetSvg = area.querySelector<SVGSVGElement>('.archery-target-svg') || area.querySelector<HTMLElement>('.archery-target-center');

  let dx = 0;
  let dy = 0;

  if (isAimingManual) {
    const time = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    const tremorX = Math.sin(time * 0.007) * 1.5 + Math.sin(time * 0.017) * 0.7;
    const tremorY = Math.cos(time * 0.008) * 1.5 + Math.cos(time * 0.019) * 0.7;
    dx = currentAimX + tremorX;
    dy = currentAimY + tremorY;
  } else if (aimer && targetSvg && typeof aimer.getBoundingClientRect === 'function') {
    const aimerRect = aimer.getBoundingClientRect();
    const svgRect = targetSvg.getBoundingClientRect();

    if (aimerRect.width > 0 && svgRect.width > 0) {
      const aimerX = aimerRect.left + aimerRect.width / 2;
      const aimerY = aimerRect.top + aimerRect.height / 2;
      const centerX = svgRect.left + svgRect.width / 2;
      const centerY = svgRect.top + svgRect.height / 2;

      // Convert pixel distance to SVG coordinate scale (target SVG is 160x160)
      const scaleX = 160 / svgRect.width;
      const scaleY = 160 / svgRect.height;
      dx = (aimerX - centerX) * scaleX;
      dy = (aimerY - centerY) * scaleY;
    } else {
      // Natural simulated drift if layout is not calculated (e.g. JSDOM)
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 62;
      dx = Math.cos(angle) * radius;
      dy = Math.sin(angle) * radius;
    }
  } else {
    dx = 4;
    dy = 4;
  }

  const result = calculateArcheryScore(dx, dy);

  if (feedback) {
    // Clear previous hit badge
    feedback.innerHTML = '';

    const hitBadge = document.createElement('div');
    hitBadge.className = 'archery-score-pop';
    hitBadge.textContent = result.label;
    feedback.appendChild(hitBadge);

    // Trigger target pulse
    area.classList.remove('is-shot');
    void area.offsetWidth; // Force reflow
    area.classList.add('is-shot');

    setTimeout(() => {
      area.classList.remove('is-shot');
    }, 800);
  }
}

export function toggleVinylSpeed(disc: HTMLElement): void {
  const currentSpeed = disc.getAttribute('data-speed') || '33';
  const newSpeed = currentSpeed === '33' ? '45' : '33';
  disc.setAttribute('data-speed', newSpeed);

  const isTurbo = newSpeed === '45';
  disc.classList.toggle('is-turbo', isTurbo);

  const container = disc.closest('.hifi-scene');
  const feedback = container ? container.querySelector<HTMLElement>('.hifi-feedback') : null;

  if (feedback) {
    feedback.textContent = isTurbo
      ? '🎵 45 RPM Turbo'
      : '🎵 33 ⅓ RPM';

    feedback.classList.remove('is-active');
    void feedback.offsetWidth;
    feedback.classList.add('is-active');
  }
}

let motoTimeout: ReturnType<typeof setTimeout> | null = null;

export function triggerMotoAcceleration(scene: HTMLElement): void {
  scene.classList.add('is-accelerating');

  const smokeContainer = scene.querySelector<HTMLElement>('.moto-exhaust-smoke');
  const feedback = scene.querySelector<HTMLElement>('.moto-feedback');

  if (smokeContainer) {
    smokeContainer.innerHTML = '';
    // Generate exhaust smoke puffs
    for (let i = 0; i < 4; i++) {
      const puff = document.createElement('span');
      puff.className = `smoke-puff smoke-puff-${i + 1}`;
      puff.textContent = '💨';
      smokeContainer.appendChild(puff);
    }
  }

  if (feedback) {
    feedback.textContent = '💨 ¡Gasss! Acelerando 🏍️';
    feedback.classList.remove('is-active');
    void feedback.offsetWidth;
    feedback.classList.add('is-active');
  }

  if (motoTimeout) {
    clearTimeout(motoTimeout);
  }

  motoTimeout = setTimeout(() => {
    scene.classList.remove('is-accelerating');
    if (smokeContainer) {
      smokeContainer.innerHTML = '';
    }
  }, 1800);
}

export function initHobbyEasterEggs(): void {
  // Helper for 0ms mobile touch response without double triggers
  const attachResponsiveHandler = (element: HTMLElement, handler: () => void) => {
    let lastTrigger = 0;
    const trigger = (e: Event) => {
      const now = Date.now();
      if (now - lastTrigger < 280) return;
      lastTrigger = now;
      handler();
    };

    element.addEventListener('pointerdown', (e) => {
      // Trigger immediately on touch or primary mouse click
      if (e.button === 0 || e.pointerType === 'touch') {
        trigger(e);
      }
    });

    element.addEventListener('click', (e) => {
      trigger(e);
    });

    element.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  };

  // 1. Archery Scene
  const archeryArea = document.querySelector<HTMLElement>('.archery-interactive-area');
  if (archeryArea) {
    // Follow mouse pointer with realistic bow holding inertia & micro-sway
    archeryArea.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') {
        startManualAim(archeryArea, e.clientX, e.clientY);
      }
    });

    archeryArea.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse') {
        if (!getManualAimState().isManual) {
          startManualAim(archeryArea, e.clientX, e.clientY);
        } else {
          updateManualAimCoords(archeryArea, e.clientX, e.clientY);
        }
      }
    });

    // When pointer leaves focus/hover, revert to autonomous wandering across entire target
    archeryArea.addEventListener('pointerleave', () => {
      stopManualAim(archeryArea);
    });

    attachResponsiveHandler(archeryArea, () => triggerArcheryShot(archeryArea));
  }

  // 2. HiFi Vinyl Disc
  const vinylDisc = document.querySelector<HTMLElement>('.vinyl-disc');
  if (vinylDisc) {
    attachResponsiveHandler(vinylDisc, () => toggleVinylSpeed(vinylDisc));
  }

  // 3. Motorcycle Scene
  const motoScene = document.querySelector<HTMLElement>('.moto-scene');
  if (motoScene) {
    attachResponsiveHandler(motoScene, () => triggerMotoAcceleration(motoScene));
  }
}
