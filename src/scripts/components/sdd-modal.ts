import { t } from '../i18n/engine';

export function initSddModal(): void {
  const modal = document.getElementById('sdd-modal') as HTMLDialogElement | null;
  const openButtons = document.querySelectorAll('.open-sdd-modal');
  const closeButtons = document.querySelectorAll('.close-sdd-modal');

  if (!modal) return;

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.showModal();
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.close();
    });
  });

  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });

  // Email clipboard copy with toast
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('copy-toast');

  if (copyEmailBtn && toast) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'laralbir@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        toast.textContent = t('contact.emailCopied');
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }
}

