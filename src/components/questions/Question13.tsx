import { useState, useEffect } from 'react';

interface Question13Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question13({ onSave, savedData, savedObservations }: Question13Props) {
  const [shapes, setShapes] = useState({ square: '', triangle: '', circle: '', rectangle: '' });
  const [observations, setObservations] = useState(savedObservations);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'shapes' in savedData) {
      setShapes((savedData as { shapes: typeof shapes }).shapes);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ shapes }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [shapes, observations]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">13 - ESCREVA O NOME DAS FIGURAS PLANAS ABAIXO:</h2>
      <div className="space-y-6 mb-6">
        <div className="flex items-center gap-6 bg-purple-50 p-6 rounded-lg">
          <div className="w-32 h-32 bg-purple-400 rounded border-4 border-purple-600 flex-shrink-0"></div>
          <input type="text" value={shapes.square} onChange={(e) => setShapes({ ...shapes, square: e.target.value })} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" placeholder="Nome da figura..." />
        </div>
        <div className="flex items-center gap-6 bg-purple-50 p-6 rounded-lg">
          <div className="w-32 h-32 flex items-center justify-center flex-shrink-0">
            <div className="w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-b-[110px] border-b-purple-400"></div>
          </div>
          <input type="text" value={shapes.triangle} onChange={(e) => setShapes({ ...shapes, triangle: e.target.value })} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" placeholder="Nome da figura..." />
        </div>
        <div className="flex items-center gap-6 bg-purple-50 p-6 rounded-lg">
          <div className="w-32 h-32 flex items-center justify-center flex-shrink-0"><div className="w-28 h-28 bg-purple-400 rounded-full border-4 border-purple-600"></div></div>
          <input type="text" value={shapes.circle} onChange={(e) => setShapes({ ...shapes, circle: e.target.value })} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" placeholder="Nome da figura..." />
        </div>
        <div className="flex items-center gap-6 bg-purple-50 p-6 rounded-lg">
          <div className="w-32 h-32 flex items-center justify-center flex-shrink-0"><div className="w-32 h-24 bg-purple-400 rounded border-4 border-purple-600"></div></div>
          <input type="text" value={shapes.rectangle} onChange={(e) => setShapes({ ...shapes, rectangle: e.target.value })} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" placeholder="Nome da figura..." />
        </div>
      </div>
      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
