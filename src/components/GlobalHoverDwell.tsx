import { useEffect, useRef } from 'react';
import { useHeadTracker } from './HeadTrackerContext';
import { playSelect } from '@/lib/sounds';

/**
 * Global hover/dwell detector.
 * When dwell mode is enabled, ANY clickable element (button, [role=button],
 * input[type=checkbox/radio/button/submit], a, [data-hover-target]) will be
 * "clicked" automatically after the user keeps the cursor (real OR virtual
 * head-tracker cursor) on it for `dwellTime` ms.
 *
 * Excluded: text inputs/textareas (so virtual keyboard typing works), and any
 * element with `data-no-hover` attribute.
 *
 * A progress bar overlay is rendered at the bottom of the active element.
 */
const DWELL_TIME = 2000;
const POLL_MS = 50;

const isInteractive = (el: Element | null): HTMLElement | null => {
  if (!el || !(el instanceof HTMLElement)) return null;
  // Walk up to find an interactive ancestor
  let cur: HTMLElement | null = el;
  while (cur && cur !== document.body) {
    if (cur.dataset.noHover !== undefined) return null;
    const tag = cur.tagName;
    if (tag === 'BUTTON') return cur;
    if (tag === 'A' && (cur as HTMLAnchorElement).href) return cur;
    if (cur.getAttribute('role') === 'button') return cur;
    if (cur.dataset.hoverTarget !== undefined) return cur;
    if (tag === 'INPUT') {
      const t = (cur as HTMLInputElement).type;
      if (t === 'checkbox' || t === 'radio' || t === 'button' || t === 'submit') return cur;
    }
    cur = cur.parentElement;
  }
  return null;
};

const GlobalHoverDwell = () => {
  const { dwellEnabled, headTrackerEnabled, cursorPos } = useHeadTracker();
  const activeElRef = useRef<HTMLElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const realMousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!dwellEnabled) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;pointer-events:none;z-index:9998;height:4px;background:rgba(200,200,200,0.4);border-radius:2px;display:none;';
    const bar = document.createElement('div');
    bar.style.cssText =
      'height:100%;background:hsl(217 91% 60%);border-radius:2px;width:0%;transition:width 60ms linear;';
    overlay.appendChild(bar);
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
    barRef.current = bar;

    const onMouseMove = (e: MouseEvent) => {
      realMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const clearActive = () => {
      activeElRef.current = null;
      startTimeRef.current = 0;
      if (overlayRef.current) overlayRef.current.style.display = 'none';
      if (barRef.current) barRef.current.style.width = '0%';
    };

    const setActive = (el: HTMLElement) => {
      activeElRef.current = el;
      startTimeRef.current = Date.now();
      if (overlayRef.current) {
        const r = el.getBoundingClientRect();
        overlayRef.current.style.display = 'block';
        overlayRef.current.style.left = `${r.left + 4}px`;
        overlayRef.current.style.top = `${r.bottom - 6}px`;
        overlayRef.current.style.width = `${Math.max(20, r.width - 8)}px`;
      }
      if (barRef.current) barRef.current.style.width = '0%';
    };

    const interval = setInterval(() => {
      // Determine cursor coords: prefer head tracker if enabled & valid
      let pt: { x: number; y: number } | null = null;
      if (headTrackerEnabled && cursorPos?.current && cursorPos.current.x >= 0) {
        pt = { x: cursorPos.current.x, y: cursorPos.current.y };
      } else if (realMousePos.current) {
        pt = realMousePos.current;
      }

      if (!pt) return;

      const elAt = document.elementFromPoint(pt.x, pt.y);
      const target = isInteractive(elAt);

      if (!target) {
        if (activeElRef.current) clearActive();
        return;
      }

      if (target !== activeElRef.current) {
        setActive(target);
        return;
      }

      // Update progress
      const elapsed = Date.now() - startTimeRef.current;
      const prog = Math.min((elapsed / DWELL_TIME) * 100, 100);
      if (barRef.current) barRef.current.style.width = `${prog}%`;

      if (prog >= 100) {
        const el = activeElRef.current;
        clearActive();
        if (el) {
          playSelect();
          el.click();
        }
      }
    }, POLL_MS);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', onMouseMove);
      overlay.remove();
      overlayRef.current = null;
      barRef.current = null;
      activeElRef.current = null;
    };
  }, [dwellEnabled, headTrackerEnabled, cursorPos]);

  return null;
};

export default GlobalHoverDwell;
