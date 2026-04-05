import { useState, useEffect } from 'react';
import imgBody from '@assets/9_corpo.png';
import { VirtualKeyboard } from '../VirtualKeyboard';

interface Question9Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

type PartKey = 'hair' | 'ear' | 'eye' | 'finger' | 'belly' | 'knee';

const POSITIONS: Record<PartKey, { x: number; y: number }> = {
  hair:   { x: 9,     y: 13    },
  ear:    { x: 9,     y: 22    },
  eye:    { x: 92.81, y: 21.54 },
  finger: { x: 98,    y: 33.0  },
  belly:  { x: 80.12, y: 49.32 },
  knee:   { x: 85.31, y: 68.62 },
};

const INITIAL_PARTS = { hair: '', ear: '', eye: '', finger: '', belly: '', knee: '' };

export function Question9({ onSave, savedData, savedObservations }: Question9Props) {
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [activeKey, setActiveKey] = useState<PartKey | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'hair' in (savedData as object)) {
      setParts(savedData as typeof INITIAL_PARTS);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => onSave(parts, savedObservations), 500);
    return () => clearTimeout(timer);
  }, [parts]);

  const handleInput = (text: string) => {
    if (!activeKey) return;
    setParts(prev => ({ ...prev, [activeKey]: prev[activeKey] + text }));
  };

  const handleBackspace = () => {
    if (!activeKey) return;
    setParts(prev => ({ ...prev, [activeKey]: prev[activeKey].slice(0, -1) }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        9 - ESCREVA O NOME DAS PARTES DO CORPO.
      </h2>

      <div className="relative mx-auto mb-6" style={{ maxWidth: 520 }}>
        <img
          src={imgBody}
          alt="Partes do corpo"
          className="w-full block"
          draggable={false}
        />

        {(Object.keys(POSITIONS) as PartKey[]).map(key => (
          <input
            key={key}
            type="text"
            value={parts[key]}
            onChange={(e) => setParts(prev => ({ ...prev, [key]: e.target.value }))}
            onFocus={() => setActiveKey(key)}
            style={{
              position: 'absolute',
              left: `${POSITIONS[key].x}%`,
              top: `${POSITIONS[key].y}%`,
              transform: 'translate(-50%, -50%)',
              width: 96,
            }}
            className={`px-2 py-1 text-xs font-semibold border-2 rounded bg-white text-center focus:outline-none transition-colors ${
              activeKey === key
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-blue-400'
            }`}
          />
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <VirtualKeyboard
          onInput={handleInput}
          onBackspace={handleBackspace}
          inputValue={activeKey ? parts[activeKey] : ''}
        />
      </div>
    </div>
  );
}
