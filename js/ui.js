// js/ui.js
import { clearBubbles } from './speech.js';

export function initUiToggle() {
  const btnHide   = document.getElementById('toggle-ui');
  const btnGear   = document.getElementById('toggle-settings');
  const tooltip   = btnHide?.querySelector('.tooltip');

  // ---------- Скрыть/показать ВЕСЬ интерфейс ----------
  function applyHiddenState(hidden) {
    document.body.classList.toggle('ui-hidden', hidden);
    if (tooltip) {
      tooltip.textContent = hidden ? 'Показать настройки' : 'Скрыть настройки';
    }
    btnHide?.setAttribute('aria-pressed', String(hidden));

    if (hidden) {
      // Закрываем выехавшую панель настроек и убираем облачка
      document.body.classList.remove('settings-open');
      clearBubbles();
    }
  }

  btnHide?.addEventListener('click', () => {
    const willHide = !document.body.classList.contains('ui-hidden');
    applyHiddenState(willHide);
  });

  // ---------- Шестерёнка (мобильная панель настроек) ----------
  function applySettingsOpen(open) {
    document.body.classList.toggle('settings-open', open);
    btnGear?.setAttribute('aria-pressed', String(open));
  }

  btnGear?.addEventListener('click', () => {
    const willOpen = !document.body.classList.contains('settings-open');
    applySettingsOpen(willOpen);
  });

  // ---------- Клавиша H — тоггл интерфейса ----------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H' || e.key === 'р' || e.key === 'Р') {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      const willHide = !document.body.classList.contains('ui-hidden');
      applyHiddenState(willHide);
    }
  });

  // ---------- Клик по канве — закрыть настройки на мобильном ----------
  document.getElementById('c')?.addEventListener('touchstart', () => {
    if (document.body.classList.contains('settings-open')) {
      applySettingsOpen(false);
    }
  }, { passive: true });

  // Начальное состояние — интерфейс виден
  applyHiddenState(false);
}