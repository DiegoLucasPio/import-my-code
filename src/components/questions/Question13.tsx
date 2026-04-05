import { useState, useEffect } from 'react';
import { VirtualKeyboard } from '../VirtualKeyboard';

interface Question13Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

type ShapeKey = 'square' | 'triangle' | 'circle' | 'rectangle';

const SCREENS: { key: ShapeKey; label: string; shape: JSX.Element }[] = [
  {
    key: 'square',
    label: 'A',
    shape: (
      <div className="w-48 h-48 bg-purple-400 border-4 border-purple-600 rounded mx-auto" />
    ),
  },
  {
    key: 'triangle',
    label: 'B',
    shape: (
      <div className="flex items-center justify-center w-48 h-48 mx-auto">
        <div className="w-0 h-0 border-l-[96px] border-l-transparent border-r-[96px] border-r-transparent border-b-[166px] border-b-purple-400" />
      </div>
    ),
  },
  {
    key: 'circle',
    label: 'C',
    shape: (
      <div className="w-48 h-48 bg-purple-400 border-4 border-purple-600 rounded-full mx-auto" />
    ),
  },
  {
    key: 'rectangle',
    label: 'D',
    shape: (
      <div className="w-64 h-40 bg-purple-400 border-4 border-purple-600 rounded mx-auto" />
    ),
  },
];

const INITIAL = { square: '', triangle: '', circle: '', rectangle: '' };

export function Question13({ onSave, savedData, savedObservations }: Question13Props) {
  const [shapes, setShapes] = useState(INITIAL);
  const [subScreen, setSubScreen] = useState(0);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'shapes' in savedData) {
      setShapes((savedData as { shapes: typeof INITIAL }).shapes);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => onSave({ shapes }, savedObservations), 500);
    return () => clearTimeout(timer);
  }, [shapes]);

  const current = SCREENS[subScreen];
  const value = shapes[current.key];

  const handleInput = (text: string) =>
    setShapes(prev => ({ ...prev, [current.key]: prev[current.key] + text }));

  const handleBackspace = () =>
    setShapes(prev => ({ ...prev, [current.key]: prev[current.key].slice(0, -1) }));

  return (
    <div>
      {/* Screen pills + indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Questão 13 — Figura {current.label}
        </span>
        <div className="flex gap-2">
          {SCREENS.map((s, i) => (
            <button
              key={i}
              onClick={() => setSubScreen(i)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                subScreen === i
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          13 - ESCREVA O NOME DAS FIGURAS PLANAS ABAIXO:
        </h2>

        <div className="bg-purple-50 rounded-xl p-10 mb-8 flex items-center justify-center">
          {current.shape}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setShapes(prev => ({ ...prev, [current.key]: e.target.value }))}
          placeholder="Nome da figura..."
          className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold text-center mb-4 transition"
        />

        <div className="bg-gray-100 rounded-lg p-4">
          <VirtualKeyboard
            onInput={handleInput}
            onBackspace={handleBackspace}
            inputValue={value}
          />
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setSubScreen(s => Math.max(s - 1, 0))}
          disabled={subScreen === 0}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Figura Anterior
        </button>
        <button
          onClick={() => setSubScreen(s => Math.min(s + 1, SCREENS.length - 1))}
          disabled={subScreen === SCREENS.length - 1}
          className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Próxima Figura →
        </button>
      </div>
    </div>
  );
}
