import { useState, useEffect } from 'react';
import { VirtualKeyboard } from '../VirtualKeyboard';
import imgQueen from '@assets/4C.png';

interface Question4CProps {
  onSave: (data: unknown, observations: string) => void;
  onBack: () => void;
  allData?: unknown;
  savedObservations: string;
}

interface AllQuestion4Data {
  sentence1?: string;
  sentence2?: string;
  sentence3?: string;
}

export function Question4C({ onSave, onBack, allData, savedObservations }: Question4CProps) {
  const [sentence3, setSentence3] = useState('');
  const [observations, setObservations] = useState(savedObservations);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  useEffect(() => {
    if (allData && typeof allData === 'object') {
      const data = allData as AllQuestion4Data;
      if (data.sentence3) setSentence3(data.sentence3);
    }
  }, [allData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ sentence1: '', sentence2: '', sentence3 }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [sentence3, observations, onSave]);

  const handleKeyboardInput = (text: string) => {
    if (activeInput === 'sentence3') {
      setSentence3(prev => prev + text);
    }
  };

  const handleKeyboardBackspace = () => {
    if (activeInput === 'sentence3') {
      setSentence3(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        4C - COMPLETE AS FRASES DO SEU JEITO.
      </h2>

      <div className="space-y-8">
        <div className="flex items-center gap-4 bg-yellow-50 p-6 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 flex items-center justify-center">
              <img src={imgQueen} alt="Rainha" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xl font-medium flex items-center gap-2">
              <span>A RAINHA</span>
              <input
                type="text"
                value={sentence3}
                onChange={(e) => setSentence3(e.target.value)}
                onFocus={() => setActiveInput('sentence3')}
                className="flex-1 px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:border-blue-500 focus:outline-none"
              />
              <span>NO CASTELO.</span>
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
      </div>
    </div>
  );
}
