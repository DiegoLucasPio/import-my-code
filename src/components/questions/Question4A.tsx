import { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';
import { VirtualKeyboard } from '../VirtualKeyboard';

interface Question4AProps {
  onSave: (data: unknown) => void;
  onNext: () => void;
  savedData?: unknown;
}

export function Question4A({ onSave, onNext, savedData }: Question4AProps) {
  const [sentence1, setSentence1] = useState('');
  const [activeInput, setActiveInput] = useState<string | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object') {
      const data = savedData as { sentence1?: string };
      if (data.sentence1) setSentence1(data.sentence1);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ sentence1 }); }, 500);
    return () => clearTimeout(timer);
  }, [sentence1, onSave]);

  const handleKeyboardInput = (text: string) => { if (activeInput === 'sentence1') setSentence1(prev => prev + text); };
  const handleKeyboardBackspace = () => { if (activeInput === 'sentence1') setSentence1(prev => prev.slice(0, -1)); };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">4A - COMPLETE AS FRASES DO SEU JEITO.</h2>
      <div className="space-y-8">
        <div className="flex items-center gap-4 bg-pink-50 p-6 rounded-lg">
          <div className="flex-shrink-0"><div className="w-24 h-24 bg-pink-200 rounded-full flex items-center justify-center"><Crown size={48} className="text-pink-600" /></div></div>
          <div className="flex-1">
            <div className="text-xl font-medium flex items-center gap-2">
              <span>A</span>
              <input type="text" value={sentence1} onChange={(e) => setSentence1(e.target.value)} onFocus={() => setActiveInput('sentence1')} className="flex-1 px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:border-blue-500 focus:outline-none" />
              <span>É CORAJOSA.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 bg-gray-100 rounded-lg p-4"><VirtualKeyboard onInput={handleKeyboardInput} onBackspace={handleKeyboardBackspace} inputValue="" /></div>
      <div className="flex justify-end gap-4 mt-8">
        <button onClick={onNext} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">PRÓXIMA</button>
      </div>
    </div>
  );
}
