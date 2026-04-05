import { useState, useEffect, useRef } from 'react';
import { VirtualKeyboard } from '../VirtualKeyboard';

interface Question1Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question1({ onSave, savedData, savedObservations }: Question1Props) {
  const [fullName, setFullName] = useState('');
  const [observations, setObservations] = useState(savedObservations);
  const [activeInput, setActiveInput] = useState<'name' | 'observations'>('name');
  const nameInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'fullName' in savedData) {
      setFullName((savedData as { fullName: string }).fullName);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ fullName }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [fullName, observations]);

  const handleVirtualInput = (text: string) => {
    if (activeInput === 'name') {
      setFullName(prev => prev + text);
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } else {
      setObservations(prev => prev + text);
    }
  };

  const handleVirtualBackspace = () => {
    if (activeInput === 'name') {
      setFullName(prev => prev.slice(0, -1));
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } else {
      setObservations(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          1 - ESCREVA SEU NOME COMPLETO
        </h2>

        <textarea
          ref={nameInputRef}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onFocus={() => setActiveInput('name')}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[120px] text-lg ${
            activeInput === 'name' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          placeholder="Digite o nome completo aqui..."
        />
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <VirtualKeyboard
            onInput={handleVirtualInput}
            onBackspace={handleVirtualBackspace}
            inputValue={fullName}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          OBSERVAÇÕES:
        </label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          onFocus={() => setActiveInput('observations')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]"
          placeholder="Observações do professor..."
        />
      </div>
    </div>
  );
}
