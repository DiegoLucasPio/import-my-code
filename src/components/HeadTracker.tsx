import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useHeadTracker } from './HeadTrackerContext';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const HeadTracker: React.FC = () => {
  const { headTrackerEnabled, sensitivity, cursorPos } = useHeadTracker();
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorElRef = useRef<HTMLDivElement>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const animFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const calibRef = useRef<{ x: number; y: number } | null>(null);
  const smoothRef = useRef({ x: 0, y: 0 });

  const [status, setStatus] = useState<'idle' | 'loading' | 'active' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const startTracking = useCallback(async () => {
    try {
      setStatus('loading');

      if (!landmarkerRef.current) {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numFaces: 1,
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
        });
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      calibRef.current = null;
      smoothRef.current = { x: 0, y: 0 };
      if (cursorPos) cursorPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      setStatus('active');

      const detect = () => {
        if (!videoRef.current || !landmarkerRef.current) return;
        const results = landmarkerRef.current.detectForVideo(videoRef.current, performance.now());

        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
          const nose = results.faceLandmarks[0][1];
          if (!calibRef.current) calibRef.current = { x: nose.x, y: nose.y };

          const dx = -(nose.x - calibRef.current.x);
          const dy = nose.y - calibRef.current.y;
          const moveX = dx * window.innerWidth * sensitivity;
          const moveY = dy * window.innerHeight * sensitivity;

          const smoothFactor = 0.3;
          smoothRef.current.x = smoothRef.current.x * (1 - smoothFactor) + moveX * smoothFactor;
          smoothRef.current.y = smoothRef.current.y * (1 - smoothFactor) + moveY * smoothFactor;

          const newX = Math.max(0, Math.min(window.innerWidth, window.innerWidth / 2 + smoothRef.current.x));
          const newY = Math.max(0, Math.min(window.innerHeight, window.innerHeight / 2 + smoothRef.current.y));

          if (cursorPos) cursorPos.current = { x: newX, y: newY };
          if (cursorElRef.current) {
            cursorElRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
          }
        }
        animFrameRef.current = requestAnimationFrame(detect);
      };
      animFrameRef.current = requestAnimationFrame(detect);
    } catch (err: any) {
      console.error('Head tracker error:', err);
      setErrorMsg(err.message || 'Erro ao acessar webcam');
      setStatus('error');
    }
  }, [sensitivity, cursorPos]);

  const stopTracking = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    if (cursorPos) cursorPos.current = { x: -1, y: -1 };
    setStatus('idle');
  }, [cursorPos]);

  useEffect(() => {
    if (headTrackerEnabled) startTracking();
    else stopTracking();
    return () => stopTracking();
  }, [headTrackerEnabled, startTracking, stopTracking]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'r' || e.key === 'R') && headTrackerEnabled) {
        if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
        calibRef.current = null;
        smoothRef.current = { x: 0, y: 0 };
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [headTrackerEnabled]);

  if (!headTrackerEnabled) return null;

  return (
    <>
      <video
        ref={videoRef}
        className="fixed bottom-2 right-2 z-[60] w-32 h-24 rounded-lg border-2 border-blue-500/50 opacity-60 object-cover"
        style={{ transform: 'scaleX(-1)' }}
        muted
        playsInline
      />

      {status === 'active' && (
        <div
          ref={cursorElRef}
          className="fixed top-0 left-0 z-[100] pointer-events-none"
          style={{ transform: `translate(${window.innerWidth / 2}px, ${window.innerHeight / 2}px)` }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 rounded-full border-4 border-blue-500 shadow-lg bg-blue-500/20 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm">
            <div className="text-4xl mb-4 animate-spin">🎯</div>
            <p className="text-xl font-bold text-gray-800 mb-2">Iniciando webcam...</p>
            <p className="text-gray-500">Posicione seu rosto de frente para a câmera</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="fixed bottom-16 right-2 z-[60] bg-red-500 text-white p-3 rounded-lg text-sm max-w-xs">
          ❌ {errorMsg}
        </div>
      )}

      {status === 'active' && (
        <div className="fixed bottom-2 left-2 z-[60] bg-white/90 text-gray-600 text-xs p-2 rounded-lg shadow">
          Pressione <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-800 font-bold">R</kbd> para recalibrar
        </div>
      )}
    </>
  );
};

export default HeadTracker;
