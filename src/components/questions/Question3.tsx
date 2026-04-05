import { useState } from 'react';
import { Question3A } from './Question3A';
import { Question3B } from './Question3B';

interface Question3Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question3({ onSave, savedData, savedObservations }: Question3Props) {
  const [currentScreen, setCurrentScreen] = useState<'3A' | '3B'>('3A');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Questão 3 — Tela {currentScreen === '3A' ? '1' : '2'} de 2
        </span>
        <div className="flex gap-2">
          {(['3A', '3B'] as const).map((screen) => (
            <button
              key={screen}
              onClick={() => setCurrentScreen(screen)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                currentScreen === screen
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {screen}
            </button>
          ))}
        </div>
      </div>

      {currentScreen === '3A' && (
        <Question3A onSave={onSave} savedData={savedData} savedObservations={savedObservations} />
      )}
      {currentScreen === '3B' && (
        <Question3B onSave={onSave} savedData={savedData} savedObservations={savedObservations} />
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentScreen('3A')}
          disabled={currentScreen === '3A'}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Tela Anterior
        </button>
        <button
          onClick={() => setCurrentScreen('3B')}
          disabled={currentScreen === '3B'}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Próxima Tela →
        </button>
      </div>
    </div>
  );
}
