import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface HeadTrackerContextType {
  headTrackerEnabled: boolean;
  toggleHeadTracker: () => void;
  sensitivity: number;
  setSensitivity: (v: number) => void;
  cursorPos: React.MutableRefObject<{ x: number; y: number }> | null;
  dwellEnabled: boolean;
  toggleDwellMode: () => void;
}

const HeadTrackerContext = createContext<HeadTrackerContextType>({
  headTrackerEnabled: false,
  toggleHeadTracker: () => {},
  sensitivity: 2.5,
  setSensitivity: () => {},
  cursorPos: null,
  dwellEnabled: false,
  toggleDwellMode: () => {},
});

export const useHeadTracker = () => useContext(HeadTrackerContext);

export const HeadTrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headTrackerEnabled, setHeadTrackerEnabled] = useState(false);
  const [sensitivity, setSensitivity] = useState(2.5);
  const [dwellEnabled, setDwellEnabled] = useState(false);
  const cursorPos = useRef({ x: -1, y: -1 });

  const toggleHeadTracker = useCallback(() => {
    setHeadTrackerEnabled(prev => {
      const next = !prev;
      if (next) setDwellEnabled(true);
      else setDwellEnabled(false);
      return next;
    });
  }, []);

  const toggleDwellMode = useCallback(() => {
    setDwellEnabled(prev => !prev);
  }, []);

  return (
    <HeadTrackerContext.Provider value={{ headTrackerEnabled, toggleHeadTracker, sensitivity, setSensitivity, cursorPos, dwellEnabled, toggleDwellMode }}>
      {children}
    </HeadTrackerContext.Provider>
  );
};

export default HeadTrackerContext;
