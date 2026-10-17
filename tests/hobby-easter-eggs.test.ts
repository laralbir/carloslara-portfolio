import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculateArcheryScore,
  initHobbyEasterEggs,
  triggerArcheryShot,
  toggleVinylSpeed,
  triggerMotoAcceleration,
} from '../src/scripts/components/hobby-easter-eggs';

describe('Hobby Interactive Easter Eggs', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section id="offtopic">
        <!-- Archery Card -->
        <div class="glass-card offtopic-card" data-hobby="archery">
          <div class="offtopic-visual-container">
            <div class="offtopic-layer offtopic-layer-anim is-visible">
              <div class="archery-interactive-area" role="button" tabindex="0" aria-label="Disparar flecha">
                <svg class="archery-target-svg" viewBox="0 0 160 160">
                  <circle class="archery-target-center" cx="80" cy="80" r="6" />
                  <g class="archery-sight-aimer" id="archery-sight-aimer">
                    <circle class="aimer-dot" cx="80" cy="80" r="2.5" />
                  </g>
                </svg>
                <div class="archery-hit-feedback" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- HiFi Card -->
        <div class="glass-card offtopic-card" data-hobby="hifi">
          <div class="offtopic-visual-container">
            <div class="offtopic-layer offtopic-layer-anim is-visible">
              <div class="hifi-scene">
                <div class="vinyl-disc" role="button" tabindex="0" aria-label="Girar vinilo" data-speed="33">
                  <div class="vinyl-label"></div>
                </div>
                <div class="vu-equalizer">
                  <div class="vu-bar"></div>
                </div>
                <div class="hifi-feedback" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Moto Card -->
        <div class="glass-card offtopic-card" data-hobby="moto">
          <div class="offtopic-visual-container">
            <div class="offtopic-layer offtopic-layer-anim is-visible">
              <div class="moto-scene" role="button" tabindex="0" aria-label="Acelerar moto">
                <div class="moto-road-perspective">
                  <div class="moto-road-line"></div>
                </div>
                <div class="moto-rear-view">
                  <svg class="moto-rear-svg"></svg>
                </div>
                <div class="moto-exhaust-smoke" aria-hidden="true"></div>
                <div class="moto-feedback" aria-live="polite"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  });

  describe('Archery Score Calculator & Shot Interaction', () => {
    it('calculates 10+ (X) when aim dot is within radius 6', () => {
      const result = calculateArcheryScore(2, 3); // dist = 3.6
      expect(result.score).toBe(10);
      expect(result.zone).toBe('X (Centro)');
      expect(result.label).toContain('10+ (X)');
    });

    it('calculates 10 (Amarillo) when aim dot is within radius 14', () => {
      const result = calculateArcheryScore(7, 8); // dist = 10.6
      expect(result.score).toBe(10);
      expect(result.zone).toBe('Amarillo');
      expect(result.label).toContain('10 AMARILLO');
    });

    it('calculates 9 (Amarillo) when aim dot is within radius 21', () => {
      const result = calculateArcheryScore(12, 14); // dist = 18.4
      expect(result.score).toBe(9);
      expect(result.zone).toBe('Amarillo');
      expect(result.label).toContain('9 AMARILLO');
    });

    it('calculates 8 (Rojo) when aim dot is within radius 28', () => {
      const result = calculateArcheryScore(18, 18); // dist = 25.4
      expect(result.score).toBe(8);
      expect(result.zone).toBe('Rojo');
    });

    it('calculates 6 (Azul) when aim dot is within radius 42', () => {
      const result = calculateArcheryScore(25, 25); // dist = 35.3
      expect(result.score).toBe(6);
      expect(result.zone).toBe('Azul');
    });

    it('triggers shot feedback when user clicks the archery area', () => {
      const area = document.querySelector<HTMLElement>('.archery-interactive-area')!;
      const feedback = document.querySelector<HTMLElement>('.archery-hit-feedback')!;

      triggerArcheryShot(area);

      expect(feedback.children.length).toBeGreaterThan(0);
      expect(feedback.textContent).toMatch(/🎯/);
    });
  });

  describe('HiFi Vinyl Speed & Rotation Interaction', () => {
    it('toggles vinyl speed between 33 RPM and 45 RPM on click', () => {
      const disc = document.querySelector<HTMLElement>('.vinyl-disc')!;
      const feedback = document.querySelector<HTMLElement>('.hifi-feedback')!;

      expect(disc.getAttribute('data-speed')).toBe('33');

      toggleVinylSpeed(disc);

      expect(disc.getAttribute('data-speed')).toBe('45');
      expect(disc.classList.contains('is-turbo')).toBe(true);
      expect(feedback.textContent).toContain('45 RPM');

      toggleVinylSpeed(disc);

      expect(disc.getAttribute('data-speed')).toBe('33');
      expect(disc.classList.contains('is-turbo')).toBe(false);
      expect(feedback.textContent).toContain('33 ⅓ RPM');
    });
  });

  describe('Motorcycle Acceleration & Smoke Interaction', () => {
    it('triggers acceleration effect, smoke clouds, and speed feedback', () => {
      vi.useFakeTimers();
      const scene = document.querySelector<HTMLElement>('.moto-scene')!;
      const smokeContainer = document.querySelector<HTMLElement>('.moto-exhaust-smoke')!;
      const feedback = document.querySelector<HTMLElement>('.moto-feedback')!;

      triggerMotoAcceleration(scene);

      expect(scene.classList.contains('is-accelerating')).toBe(true);
      expect(smokeContainer.children.length).toBeGreaterThan(0);
      expect(feedback.textContent).toMatch(/💨/);

      // After acceleration timeout (e.g. 1800ms) it resets smoothly
      vi.advanceTimersByTime(2000);
      expect(scene.classList.contains('is-accelerating')).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('initHobbyEasterEggs', () => {
    it('attaches click and keyboard listeners to all 3 hobby scenes', () => {
      initHobbyEasterEggs();

      const archeryArea = document.querySelector<HTMLElement>('.archery-interactive-area')!;
      const vinylDisc = document.querySelector<HTMLElement>('.vinyl-disc')!;
      const motoScene = document.querySelector<HTMLElement>('.moto-scene')!;

      // Click archery
      archeryArea.click();
      const archeryFeedback = document.querySelector<HTMLElement>('.archery-hit-feedback')!;
      expect(archeryFeedback.children.length).toBeGreaterThan(0);

      // Keydown Enter on vinyl
      vinylDisc.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(vinylDisc.getAttribute('data-speed')).toBe('45');

      // Click moto
      motoScene.click();
      expect(motoScene.classList.contains('is-accelerating')).toBe(true);
    });
  });
});
