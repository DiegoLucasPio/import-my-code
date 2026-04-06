const ctx = () => {
  if (!(window as any).__audioCtx) {
    (window as any).__audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return (window as any).__audioCtx as AudioContext;
};

const beep = (freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) => {
  try {
    const c = ctx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  } catch {}
};

export const playSelect = () => {
  beep(600, 0.12, 'sine', 0.25);
  setTimeout(() => beep(900, 0.15, 'sine', 0.2), 80);
};

export const playDeselect = () => {
  beep(500, 0.12, 'sine', 0.2);
  setTimeout(() => beep(350, 0.15, 'sine', 0.15), 80);
};

export const playTransition = () => {
  beep(440, 0.08, 'triangle', 0.15);
  setTimeout(() => beep(550, 0.08, 'triangle', 0.15), 60);
  setTimeout(() => beep(700, 0.12, 'triangle', 0.2), 120);
};
