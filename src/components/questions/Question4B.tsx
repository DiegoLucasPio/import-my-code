import { useState, useEffect } from 'react';
import { VirtualKeyboard } from '../VirtualKeyboard';
import imgKing from '@assets/4B.png';

interface Question4BProps {
  onSave: (data: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  savedData?: unknown;
}

export function Question4B({ onSave, onNext, onBack, savedData }: Question4BProps) {
  const [sentence2, setSentence2] = useState('');
  const [activeInput, setActiveInput] = useState<string | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object') {
      const data = savedData as { sentence2?: string };
      if (data.sentence2) setSentence2(data.sentence2);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ sentence2 });
    }, 500);
    return () => clearTimeout(timer);
  }, [sentence2, onSave]);

  const handleKeyboardInput = (text: string) => {
    if (activeInput === 'sentence2') {
      setSentence2(prev => prev + text);
    }
  };

  const handleKeyboardBackspace = () => {
    if (activeInput === 'sentence2') {
      setSentence2(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        4B - COMPLETE AS FRASES DO SEU JEITO.
      </h2>

      <div className="space-y-8">
        <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 flex items-center justify-center">
              <img src={imgKing} alt="Rei" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xl font-medium flex items-center gap-2">
              <span>O REI É</span>
              <input
                type="text"
                value={sentence2}
                onChange={(e) => setSentence2(e.target.value)}
                onFocus={() => setActiveInput('sentence2')}
                className="flex-1 px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 bg-gray-100 rounded-lg p-4">
        <VirtualKeyboard
          onInput={handleKeyboardInput}
          onBackspace={handleKeyboardBackspace}
          inputValue=""
        />
      </div>

      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
        >
          VOLTAR
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          PRÓXIMA
        </button>
      </div>
    </div>
  );
}
