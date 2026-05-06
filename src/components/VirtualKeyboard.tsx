import { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';

interface VirtualKeyboardProps {
  onInput: (text: string) => void;
  onBackspace: () => void;
  inputValue: string;
  lettersOnly?: boolean;
}

export function VirtualKeyboard({ onInput, onBackspace, inputValue, lettersOnly = false }: VirtualKeyboardProps) {
  const [shiftActive, setShiftActive] = useState(false);

  const numberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const rows = lettersOnly
    ? [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ]
    : [
        numberRow,
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ];
  const shiftRowIndex = lettersOnly ? 1 : 2;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'SHIFT') { setShiftActive(true); e.preventDefault(); return; }
      if (key === 'BACKSPACE') { onBackspace(); e.preventDefault(); return; }
      if (key === ' ') { onInput(' '); e.preventDefault(); return; }
      if (key === 'ENTER') { onInput('\n'); e.preventDefault(); return; }
      if (/^[A-Z0-9]$/.test(key)) {
        onInput(key);
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => { if (e.key === 'Shift') setShiftActive(false); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); };
  }, [shiftActive, onInput, onBackspace]);

  const handleKeyClick = (key: string) => {
    onInput(key);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-4 space-y-2 shadow-2xl">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {rowIndex === shiftRowIndex && (
            <button
              onClick={() => setShiftActive(!shiftActive)}
              className={`px-6 py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95 ${
                shiftActive ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
              style={{ minWidth: '60px' }}
            >
              ⇧
            </button>
          )}
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className={`flex-1 min-w-0 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all transform active:scale-95 shadow-md hover:shadow-lg ${
                lettersOnly ? 'px-4 py-6 text-2xl' : 'px-3 py-4 text-lg'
              }`}
              style={{ minWidth: lettersOnly ? '64px' : '50px' }}
            >
              {key}
            </button>
          ))}
          {rowIndex === shiftRowIndex && (
            <button
              onClick={onBackspace}
              className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform active:scale-95 shadow-md hover:shadow-lg"
              style={{ minWidth: '60px' }}
            >
              <Delete size={24} />
            </button>
          )}
        </div>
      ))}
      <div className="flex gap-2 pt-2">
        <button onClick={() => onInput(' ')} className="flex-1 px-4 py-4 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all transform active:scale-95 shadow-md hover:shadow-lg">
          ESPAÇO
        </button>
        <button onClick={() => onInput('\n')} className="flex-1 px-4 py-4 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all transform active:scale-95 shadow-md hover:shadow-lg">
          ENTER
        </button>
      </div>
    </div>
  );
}
