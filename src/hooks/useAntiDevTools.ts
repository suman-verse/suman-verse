import { useEffect } from 'react';

export function useAntiDevTools() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'CANVAS') {
        e.preventDefault();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (key === 'F12') { e.preventDefault(); return; }
      if (ctrl && shift && (key === 'I' || key === 'i')) { e.preventDefault(); return; }
      if (ctrl && shift && (key === 'J' || key === 'j')) { e.preventDefault(); return; }
      if (ctrl && shift && (key === 'C' || key === 'c')) { e.preventDefault(); return; }
      if (ctrl && shift && (key === 'K' || key === 'k')) { e.preventDefault(); return; }
      if (ctrl && (key === 'u' || key === 'U')) { e.preventDefault(); return; }
      if (ctrl && (key === 's' || key === 'S')) { e.preventDefault(); return; }
      if (ctrl && (key === 'p' || key === 'P')) { e.preventDefault(); return; }
    };

    const onDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') e.preventDefault();
    };

    const onSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'CANVAS') e.preventDefault();
    };

    const THRESHOLD = 200;
    let devToolsOpen = false;

    const showOverlay = () => {
      if (document.getElementById('devtools-overlay')) return;
      document.body.style.filter = 'blur(10px)';
      document.body.style.userSelect = 'none';
      document.body.style.pointerEvents = 'none';

      const overlay = document.createElement('div');
      overlay.id = 'devtools-overlay';
      overlay.style.cssText = [
        'position:fixed;inset:0;z-index:999999',
        'display:flex;flex-direction:column;align-items:center;justify-content:center',
        'background:rgba(15,23,42,0.96);color:#fff',
        'font-family:sans-serif;text-align:center;gap:14px',
        'backdrop-filter:blur(6px)',
        'pointer-events:auto',
      ].join(';');

      overlay.innerHTML = `
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <h2 style="font-size:1.5rem;font-weight:800;margin:0;letter-spacing:-0.02em">Access Restricted</h2>
        <p style="font-size:0.875rem;opacity:0.7;margin:0;max-width:300px;line-height:1.6">
          Developer tools are restricted on this page.<br/>Please close DevTools to continue browsing.
        </p>
      `;
      document.body.appendChild(overlay);
    };

    const hideOverlay = () => {
      document.body.style.filter = '';
      document.body.style.userSelect = '';
      document.body.style.pointerEvents = '';
      document.getElementById('devtools-overlay')?.remove();
    };

    const detectDevTools = () => {
      if (window.innerWidth <= 768 || 'ontouchstart' in window) return;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const opened = widthDiff > THRESHOLD || heightDiff > THRESHOLD;

      if (opened && !devToolsOpen) {
        devToolsOpen = true;
        showOverlay();
      } else if (!opened && devToolsOpen) {
        devToolsOpen = false;
        hideOverlay();
      }
    };

    const intervalId = setInterval(detectDevTools, 1200);

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('selectstart', onSelectStart);

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('dragstart', onDragStart);
      document.removeEventListener('selectstart', onSelectStart);
      clearInterval(intervalId);
      hideOverlay();
    };
  }, []);
}
