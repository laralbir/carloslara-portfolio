/**
 * Engineering Terminal & Code Stack Component
 * Interactive tabs, syntax display, and one-click clipboard copy
 */

export function initTerminal(): void {
  const terminal = document.querySelector('.terminal-window') as HTMLElement | null;
  if (!terminal) return;

  const tabs = terminal.querySelectorAll<HTMLButtonElement>('.terminal-tab');
  const panels = terminal.querySelectorAll<HTMLElement>('.terminal-panel');
  const copyBtn = terminal.querySelector<HTMLButtonElement>('.terminal-copy-btn');
  const toast = document.getElementById('copy-toast');

  function activateTab(targetId: string) {
    tabs.forEach((tab) => {
      const isTarget = tab.dataset.target === targetId;
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', String(isTarget));
      tab.setAttribute('tabindex', isTarget ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isTarget = panel.id === targetId;
      panel.classList.toggle('active', isTarget);
      panel.hidden = !isTarget;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      if (targetId) activateTab(targetId);
    });

    // Keyboard navigation (Left / Right arrows)
    tab.addEventListener('keydown', (e) => {
      let targetIndex = index;
      if (e.key === 'ArrowRight') {
        targetIndex = (index + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      } else if (e.key === 'Home') {
        targetIndex = 0;
        e.preventDefault();
      } else if (e.key === 'End') {
        targetIndex = tabs.length - 1;
        e.preventDefault();
      }

      if (targetIndex !== index) {
        tabs[targetIndex].focus();
        const targetId = tabs[targetIndex].dataset.target;
        if (targetId) activateTab(targetId);
      }
    });
  });

  // Copy code button handler
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const activePanel = terminal.querySelector<HTMLElement>('.terminal-panel.active code');
      if (!activePanel) return;

      const codeText = activePanel.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = copyBtn.getAttribute('data-original-text') || copyBtn.innerText;
        copyBtn.setAttribute('data-original-text', originalText);
        copyBtn.innerText = '✔ ' + (copyBtn.dataset.copiedText || 'Copied!');
        copyBtn.classList.add('copied');

        if (toast) {
          toast.textContent = 'Code snippet copied to clipboard!';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2500);
        }

        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code snippet:', err);
      }
    });
  }
}

