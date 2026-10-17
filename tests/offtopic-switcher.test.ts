import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  initOfftopicSwitcher,
  switchOfftopicView,
  openOfftopicLightbox,
  closeOfftopicLightbox,
} from '../src/scripts/components/offtopic-switcher';

describe('Offtopic Dual-View Switcher & Lightbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section id="offtopic">
        <div class="glass-card offtopic-card" data-hobby="archery">
          <div class="offtopic-switcher-bar">
            <div class="offtopic-segmented-control" role="tablist" aria-label="Visual view toggle">
              <button type="button" class="offtopic-tab is-active" role="tab" aria-selected="true" data-target="anim">
                <span>Animación</span>
              </button>
              <button type="button" class="offtopic-tab" role="tab" aria-selected="false" data-target="photo">
                <span>Foto Real</span>
              </button>
            </div>
          </div>
          <div class="offtopic-visual-container">
            <div class="offtopic-layer offtopic-layer-anim is-visible" aria-hidden="false">
              <svg class="archery-target-svg"></svg>
            </div>
            <div class="offtopic-layer offtopic-layer-photo" aria-hidden="true">
              <img src="/assets/offtopic/archery-real.jpg"
                   alt="Diana con flechas"
                   data-caption="Diana oficial FITA a 50m"
                   class="offtopic-real-img" />
            </div>
          </div>
        </div>
      </section>

      <dialog id="offtopic-lightbox" class="offtopic-lightbox">
        <button class="lightbox-close" aria-label="Cerrar">✕</button>
        <img class="lightbox-img" src="" alt="" />
        <p class="lightbox-caption"></p>
      </dialog>
    `;

    // Mock HTMLDialogElement methods in JSDOM if missing
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
  });

  it('switches view from animation to photo when clicking photo tab', () => {
    initOfftopicSwitcher();

    const card = document.querySelector<HTMLElement>('.offtopic-card')!;
    const photoTab = card.querySelector<HTMLButtonElement>('[data-target="photo"]')!;
    const animTab = card.querySelector<HTMLButtonElement>('[data-target="anim"]')!;
    const animLayer = card.querySelector<HTMLElement>('.offtopic-layer-anim')!;
    const photoLayer = card.querySelector<HTMLElement>('.offtopic-layer-photo')!;

    expect(animTab.classList.contains('is-active')).toBe(true);
    expect(animTab.getAttribute('aria-selected')).toBe('true');
    expect(photoTab.classList.contains('is-active')).toBe(false);
    expect(animLayer.classList.contains('is-visible')).toBe(true);
    expect(photoLayer.classList.contains('is-visible')).toBe(false);

    // Click photo tab
    photoTab.click();

    expect(photoTab.classList.contains('is-active')).toBe(true);
    expect(photoTab.getAttribute('aria-selected')).toBe('true');
    expect(animTab.classList.contains('is-active')).toBe(false);
    expect(animTab.getAttribute('aria-selected')).toBe('false');

    expect(photoLayer.classList.contains('is-visible')).toBe(true);
    expect(photoLayer.getAttribute('aria-hidden')).toBe('false');
    expect(animLayer.classList.contains('is-visible')).toBe(false);
    expect(animLayer.getAttribute('aria-hidden')).toBe('true');
  });

  it('switches view programmatically using switchOfftopicView', () => {
    initOfftopicSwitcher();

    const card = document.querySelector<HTMLElement>('.offtopic-card')!;
    const animLayer = card.querySelector<HTMLElement>('.offtopic-layer-anim')!;
    const photoLayer = card.querySelector<HTMLElement>('.offtopic-layer-photo')!;

    switchOfftopicView(card, 'photo');
    expect(photoLayer.classList.contains('is-visible')).toBe(true);
    expect(animLayer.classList.contains('is-visible')).toBe(false);

    switchOfftopicView(card, 'anim');
    expect(animLayer.classList.contains('is-visible')).toBe(true);
    expect(photoLayer.classList.contains('is-visible')).toBe(false);
  });

  it('supports keyboard ArrowRight / ArrowLeft navigation between tabs', () => {
    initOfftopicSwitcher();

    const card = document.querySelector<HTMLElement>('.offtopic-card')!;
    const animTab = card.querySelector<HTMLButtonElement>('[data-target="anim"]')!;
    const photoTab = card.querySelector<HTMLButtonElement>('[data-target="photo"]')!;

    animTab.focus();
    animTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(photoTab.classList.contains('is-active')).toBe(true);
    expect(document.activeElement).toBe(photoTab);

    photoTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(animTab.classList.contains('is-active')).toBe(true);
    expect(document.activeElement).toBe(animTab);
  });

  it('opens and closes lightbox when photo is clicked', () => {
    initOfftopicSwitcher();

    const img = document.querySelector<HTMLImageElement>('.offtopic-real-img')!;
    const dialog = document.getElementById('offtopic-lightbox') as HTMLDialogElement;
    const lightboxImg = dialog.querySelector<HTMLImageElement>('.lightbox-img')!;
    const lightboxCaption = dialog.querySelector<HTMLElement>('.lightbox-caption')!;
    const closeBtn = dialog.querySelector<HTMLButtonElement>('.lightbox-close')!;

    img.click();

    expect(dialog.showModal).toHaveBeenCalled();
    expect(lightboxImg.getAttribute('src')).toBe('/assets/offtopic/archery-real.jpg');
    expect(lightboxCaption.textContent).toBe('Diana oficial FITA a 50m');

    closeBtn.click();
    expect(dialog.close).toHaveBeenCalled();
  });
});

