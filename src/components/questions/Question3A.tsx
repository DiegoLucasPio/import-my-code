import { useState, useEffect } from 'react';
import { VirtualKeyboard } from '../VirtualKeyboard';
import imgChave from '@assets/3A.png';
import imgLobo from '@assets/3B.png';

interface Question3AProps {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

interface WordData {
  word: string;
  syllable1: string;
  syllable2: string;
  letters: string[];
}

export function Question3A({ onSave, savedData, savedObservations }: Question3AProps) {
  const [items, setItems] = useState<Record<string, WordData>>({
    key: { word: '', syllable1: '', syllable2: '', letters: ['', '', '', '', ''] },
    cat: { word: '', syllable1: '', syllable2: '', letters: ['', '', '', ''] },
  });
  const [observations, setObservations] = useState(savedObservations);
  const [activeInput, setActiveInput] = useState<{
    itemKey: string;
    field: keyof WordData;
    letterIndex?: number;
  } | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'items' in savedData) {
      setItems((savedData as { items: Record<string, WordData> }).items);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ items }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [items, observations]);

  const updateItem = (key: string, field: keyof WordData, value: string | string[]) => {
    setItems(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const updateLetter = (key: string, index: number, value: string) => {
    setItems(prev => {
      const newLetters = [...prev[key].letters];
      newLetters[index] = value.toUpperCase();
      return {
        ...prev,
        [key]: { ...prev[key], letters: newLetters }
      };
    });
  };

  const handleKeyboardInput = (text: string) => {
    if (!activeInput) return;

    const { itemKey, field, letterIndex } = activeInput;

    if (field === 'letters' && letterIndex !== undefined) {
      updateLetter(itemKey, letterIndex, text);
      setActiveInput(null);
    } else if (field !== 'letters') {
      const current = items[itemKey][field] as string;
      updateItem(itemKey, field, current + text);
    }
  };

  const handleKeyboardBackspace = () => {
    if (!activeInput) return;

    const { itemKey, field, letterIndex } = activeInput;

    if (field === 'letters' && letterIndex !== undefined) {
      updateLetter(itemKey, letterIndex, '');
    } else if (field !== 'letters') {
      const current = items[itemKey][field] as string;
      updateItem(itemKey, field, current.slice(0, -1));
    }
  };

  const renderWordCard = (
    icon: React.ReactNode,
    itemKey: string,
    letterCount: number
  ) => (
    <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-gray-300">
          {icon}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="bg-gray-800 text-white text-center py-2 font-semibold rounded-t">
            PALAVRA
          </div>
          <input
            type="text"
            value={items[itemKey].word}
            onChange={(e) => updateItem(itemKey, 'word', e.target.value.toUpperCase())}
            onFocus={() => setActiveInput({ itemKey, field: 'word' })}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-b focus:ring-2 focus:ring-blue-500 uppercase"
          />
        </div>

        <div>
          <div className="bg-gray-800 text-white text-center py-2 font-semibold rounded-t">
            SÍLABAS
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={items[itemKey].syllable1}
              onChange={(e) => updateItem(itemKey, 'syllable1', e.target.value.toUpperCase())}
              onFocus={() => setActiveInput({ itemKey, field: 'syllable1' })}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 uppercase"
            />
            <input
              type="text"
              value={items[itemKey].syllable2}
              onChange={(e) => updateItem(itemKey, 'syllable2', e.target.value.toUpperCase())}
              onFocus={() => setActiveInput({ itemKey, field: 'syllable2' })}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>
        </div>

        <div>
          <div className="bg-gray-800 text-white text-center py-2 font-semibold rounded-t">
            LETRAS
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: letterCount }).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={items[itemKey].letters[i] || ''}
                onChange={(e) => updateLetter(itemKey, i, e.target.value)}
                onFocus={() => setActiveInput({ itemKey, field: 'letters', letterIndex: i })}
                className="w-12 h-12 px-2 py-2 border-2 border-gray-300 rounded text-center font-bold focus:ring-2 focus:ring-blue-500 uppercase"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        3A - COMPLETE OS LACUNADOS, ESCREVENDO AS PALAVRAS, SÍLABAS E LETRAS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {renderWordCard(<img src={imgChave} alt="Chave" className="w-full h-full object-contain" />, 'key', 5)}
        {renderWordCard(<img src={imgLobo} alt="Lobo" className="w-full h-full object-contain" />, 'cat', 4)}
      </div>

      <div className="mb-6 bg-gray-100 rounded-lg p-4">
        <VirtualKeyboard
          onInput={handleKeyboardInput}
          onBackspace={handleKeyboardBackspace}
          inputValue=""
        />
      </div>

    </div>
  );
}
