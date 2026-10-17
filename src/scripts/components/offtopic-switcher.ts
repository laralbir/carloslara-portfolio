/**
 * Offtopic Dual-View Switcher & Accessible Lightbox
 * Allows seamless switching between CSS/SVG animations and authentic real-life photography.
 */

export function switchOfftopicView(card: HTMLElement, targetView: 'anim' | 'photo'): void {
  const tabs = card.querySelectorAll<HTMLButtonElement>('.offtopic-tab');
  const animLayer = card.querySelector<HTMLElement>('.offtopic-layer-anim');
  const photoLayer = card.querySelector<HTMLElement>('.offtopic-layer-photo');

  tabs.forEach((tab) => {
    const isTarget = tab.getAttribute('data-target') === targetView;
    tab.classList.toggle('is-active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  const isAnim = targetView === 'anim';

  if (animLayer) {
    animLayer.classList.toggle('is-visible', isAnim);
    animLayer.setAttribute('aria-hidden', isAnim ? 'false' : 'true');
    // Toggle paused state to preserve CPU when photos are viewed
    animLayer.classList.toggle('is-paused', !isAnim);
  }

  if (photoLayer) {
    photoLayer.classList.toggle('is-visible', !isAnim);
    photoLayer.setAttribute('aria-hidden', !isAnim ? 'false' : 'true');
  }
}

export function openOfftopicLightbox(imgSrc: string, imgAlt: string, caption: string): void {
  const dialog = document.getElementById('offtopic-lightbox') as HTMLDialogElement | null;
  if (!dialog) return;

  const lightboxImg = dialog.querySelector<HTMLImageElement>('.lightbox-img');
  const lightboxCaption = dialog.querySelector<HTMLElement>('.lightbox-caption');

  if (lightboxImg) {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
  }

  if (lightboxCaption) {
    lightboxCaption.textContent = caption;
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

export function closeOfftopicLightbox(): void {
  const dialog = document.getElementById('offtopic-lightbox') as HTMLDialogElement | null;
  if (!dialog) return;

  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
}

export function initOfftopicSwitcher(): void {
  const cards = document.querySelectorAll<HTMLElement>('.offtopic-card');

  cards.forEach((card) => {
    const tabs = Array.from(card.querySelectorAll<HTMLButtonElement>('.offtopic-tab'));

    tabs.forEach((tab, index) => {
      // Click handler
      tab.addEventListener('click', () => {
        const target = (tab.getAttribute('data-target') || 'anim') as 'anim' | 'photo';
        switchOfftopicView(card, target);
      });

      // Keyboard navigation (ArrowLeft / ArrowRight)
      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        let nextIndex = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        }

        if (nextIndex >= 0) {
          const nextTab = tabs[nextIndex];
          nextTab.focus();
          const target = (nextTab.getAttribute('data-target') || 'anim') as 'anim' | 'photo';
          switchOfftopicView(card, target);
        }
      });
    });

    // Setup photo click -> Lightbox
    const realImg = card.querySelector<HTMLImageElement>('.offtopic-real-img');
    if (realImg) {
      const handleImageClick = () => {
        const src = realImg.getAttribute('src') || '';
        const alt = realImg.getAttribute('alt') || '';
        const caption = realImg.getAttribute('data-caption') || alt;
        openOfftopicLightbox(src, alt, caption);
      };

      realImg.addEventListener('click', handleImageClick);
      realImg.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleImageClick();
        }
      });
    }
  });

  // Setup lightbox dialog listeners
  const dialog = document.getElementById('offtopic-lightbox') as HTMLDialogElement | null;
  if (dialog) {
    const closeBtn = dialog.querySelector<HTMLButtonElement>('.lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeOfftopicLightbox());
    }

    // Close when clicking outside the dialog content (on the native backdrop)
    dialog.addEventListener('click', (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeOfftopicLightbox();
      }
    });

    // Close on Escape key
    dialog.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeOfftopicLightbox();
      }
    });
  }
}

