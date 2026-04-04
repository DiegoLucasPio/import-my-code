import { useState, useEffect, useRef } from 'react';
import { VirtualKeyboard } from '../VirtualKeyboard';

interface Question2Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question2({ onSave, savedData, savedObservations }: Question2Props) {
  const [birthday, setBirthday] = useState('');
  const [observations, setObservations] = useState(savedObservations);
  const [activeInput, setActiveInput] = useState<'birthday' | 'observations'>('birthday');
  const birthdayInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'birthday' in savedData) {
      setBirthday((savedData as { birthday: string }).birthday);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ birthday }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [birthday, observations]);

  const handleVirtualInput = (text: string) => {
    if (activeInput === 'birthday') { setBirthday(prev => prev + text); birthdayInputRef.current?.focus(); }
    else { setObservations(prev => prev + text); }
  };

  const handleVirtualBackspace = () => {
    if (activeInput === 'birthday') { setBirthday(prev => prev.slice(0, -1)); birthdayInputRef.current?.focus(); }
    else { setObservations(prev => prev.slice(0, -1)); }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">2 - ESCREVA A DATA DO SEU ANIVERSÁRIO (DIA E MÊS)</h2>
        <textarea ref={birthdayInputRef} value={birthday} onChange={(e) => setBirthday(e.target.value)} onFocus={() => setActiveInput('birthday')}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[120px] text-lg ${activeInput === 'birthday' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          placeholder="Exemplo: 15 de março" />
      </div>
      <div className="flex justify-center"><div className="w-full max-w-4xl"><VirtualKeyboard onInput={handleVirtualInput} onBackspace={handleVirtualBackspace} inputValue={birthday} /></div></div>
      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} onFocus={() => setActiveInput('observations')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
