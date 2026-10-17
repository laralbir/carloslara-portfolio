import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { initPreloader, hidePreloader } from '../src/scripts/components/preloader';

describe('Preloader Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <div id="app-preloader" class="app-preloader" aria-busy="true">
        <div class="preloader-content">
          <span class="preloader-monogram">CLA</span>
        </div>
      </div>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hides the preloader when hidePreloader is called', () => {
    const preloader = document.getElementById('app-preloader');
    expect(preloader?.classList.contains('preloader-hidden')).toBe(false);
    expect(preloader?.getAttribute('aria-busy')).toBe('true');

    hidePreloader();

    expect(preloader?.classList.contains('preloader-hidden')).toBe(true);
    expect(preloader?.getAttribute('aria-busy')).toBe('false');
    expect(preloader?.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets display none after transition timeout', () => {
    const preloader = document.getElementById('app-preloader');
    hidePreloader();

    expect(preloader?.style.display).not.toBe('none');
    vi.advanceTimersByTime(500);
    expect(preloader?.style.display).toBe('none');
  });

  it('initPreloader auto-hides after safety timeout if load event did not fire', () => {
    initPreloader();
    const preloader = document.getElementById('app-preloader');
    expect(preloader?.classList.contains('preloader-hidden')).toBe(false);

    vi.advanceTimersByTime(3000);
    expect(preloader?.classList.contains('preloader-hidden')).toBe(true);
  });

  it('initPreloader hides on window load event', () => {
    initPreloader();
    const preloader = document.getElementById('app-preloader');
    expect(preloader?.classList.contains('preloader-hidden')).toBe(false);

    window.dispatchEvent(new Event('load'));
    vi.advanceTimersByTime(150);
    expect(preloader?.classList.contains('preloader-hidden')).toBe(true);
  });

  it('does not crash when preloader element is missing', () => {
    document.body.innerHTML = '';
    expect(() => hidePreloader()).not.toThrow();
    expect(() => initPreloader()).not.toThrow();
  });
});
