import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useHeadTracker } from './HeadTrackerContext';
import { playSelect } from '@/lib/sounds';

interface HoverButtonProps {
  children: React.ReactNode;
  onHoverComplete: () => void;
  disabled?: boolean;
  className?: string;
  dwellTime?: number;
  style?: React.CSSProperties;
}

const HoverButton: React.FC<HoverButtonProps> = ({
  children,
  onHoverComplete,
  disabled = false,
  className = '',
  dwellTime = 2000,
  style,
}) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { headTrackerEnabled, cursorPos, dwellEnabled } = useHeadTracker();

  const isRealMouseOver = useRef(false);
  const isVirtualOver = useRef(false);

  const handleComplete = useCallback(() => {
    playSelect();
    onHoverComplete();
  }, [onHoverComplete]);

  const startDwell = useCallback(() => {
    if (disabled || timerRef.current) return;
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min((elapsed / dwellTime) * 100, 100);
      setProgress(prog);
      if (prog >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        handleComplete();
        setProgress(0);
      }
    }, 30);
  }, [disabled, dwellTime, handleComplete]);

  const stopDwell = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setProgress(0);
  }, []);

  const updateHoverState = useCallback(() => {
    if (!dwellEnabled) return;
    if (isRealMouseOver.current || isVirtualOver.current) startDwell();
    else stopDwell();
  }, [dwellEnabled, startDwell, stopDwell]);

  const handleMouseEnter = useCallback(() => {
    isRealMouseOver.current = true;
    updateHoverState();
  }, [updateHoverState]);

  const handleMouseLeave = useCallback(() => {
    isRealMouseOver.current = false;
    updateHoverState();
  }, [updateHoverState]);

  useEffect(() => {
    if (!dwellEnabled) stopDwell();
  }, [dwellEnabled, stopDwell]);

  useEffect(() => {
    if (!dwellEnabled || !headTrackerEnabled || !cursorPos || disabled) {
      isVirtualOver.current = false;
      return;
    }

    const checkInterval = setInterval(() => {
      if (!divRef.current || !cursorPos) return;
      const rect = divRef.current.getBoundingClientRect();
      const { x, y } = cursorPos.current;
      const wasOver = isVirtualOver.current;
      const isOver = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      if (isOver !== wasOver) {
        isVirtualOver.current = isOver;
        if (isOver) startDwell();
        else if (!isRealMouseOver.current) stopDwell();
      }
    }, 50);

    return () => {
      clearInterval(checkInterval);
      isVirtualOver.current = false;
    };
  }, [dwellEnabled, headTrackerEnabled, cursorPos, disabled, startDwell, stopDwell]);

  return (
    <div
      ref={divRef}
      style={style}
      className={`relative overflow-hidden cursor-pointer select-none transition-transform hover:scale-[1.02] ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => !disabled && handleComplete()}
    >
      {children}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300/40">
          <div
            className="h-full bg-blue-500/60 transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default HoverButton;
