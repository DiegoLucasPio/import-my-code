import { useState, useEffect } from 'react';

interface Question8Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

interface MathOperation { c: string; d: string; u: string; }

export function Question8({ onSave, savedData, savedObservations }: Question8Props) {
  const [operations, setOperations] = useState<MathOperation[]>([
    { c: '', d: '', u: '' }, { c: '', d: '', u: '' }, { c: '', d: '', u: '' }, { c: '', d: '', u: '' },
  ]);
  const [observations, setObservations] = useState(savedObservations);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'operations' in savedData) {
      setOperations((savedData as { operations: MathOperation[] }).operations);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ operations }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [operations, observations]);

  const updateOperation = (index: number, field: keyof MathOperation, value: string) => {
    const newOps = [...operations];
    newOps[index] = { ...newOps[index], [field]: value };
    setOperations(newOps);
  };

  const renderOperation = (index: number, operator: '+' | '-', num1: [string, string, string], num2: [string, string, string]) => (
    <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
      <div className="flex flex-col items-center">
        <div className="flex gap-2 mb-2">
          <span className="text-red-600 font-bold text-lg w-8 text-center">C</span>
          <span className="text-red-600 font-bold text-lg w-8 text-center">D</span>
          <span className="text-red-600 font-bold text-lg w-8 text-center">U</span>
        </div>
        <div className="flex gap-2 mb-2">
          {num1.map((n, i) => <div key={i} className="w-8 h-10 flex items-center justify-center border-b-2 border-gray-800 font-bold text-xl">{n}</div>)}
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-8 h-10 flex items-center justify-center font-bold text-xl">{operator}</div>
          {num2.map((n, i) => <div key={i} className="w-8 h-10 flex items-center justify-center border-b-2 border-gray-800 font-bold text-xl">{n}</div>)}
        </div>
        <div className="w-full border-t-4 border-gray-800 mb-2"></div>
        <div className="flex gap-2">
          {(['c', 'd', 'u'] as const).map(field => (
            <div key={field} className="w-8">
              <input type="text" maxLength={1} value={operations[index][field]} onChange={(e) => updateOperation(index, field, e.target.value)} className="w-full h-12 text-center border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 font-bold text-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">8 - RESOLVA AS OPERAÇÕES.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {renderOperation(0, '+', ['3', '4', '0'], ['1', '3', '5'])}
        {renderOperation(1, '+', ['3', '6', '4'], ['3', '2', '2'])}
        {renderOperation(2, '-', ['3', '6', '4'], ['2', '4', '3'])}
        {renderOperation(3, '-', ['4', '8', '5'], ['2', '1', '3'])}
      </div>
      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
