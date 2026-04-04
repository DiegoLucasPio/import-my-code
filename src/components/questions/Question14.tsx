import { useState, useEffect } from 'react';
import { Home, School } from 'lucide-react';

interface Question14Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question14({ onSave, savedData, savedObservations }: Question14Props) {
  const [selectedPath, setSelectedPath] = useState<'straight' | 'curved' | null>(null);
  const [observations, setObservations] = useState(savedObservations);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'selectedPath' in savedData) {
      setSelectedPath((savedData as { selectedPath: 'straight' | 'curved' }).selectedPath);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ selectedPath }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [selectedPath, observations]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">14 - PINTE O CAMINHO MAIS CURTO ATÉ A ESCOLA</h2>
      <div className="relative bg-green-50 p-8 rounded-lg mb-6 min-h-[400px]">
        <div className="absolute top-8 left-8 flex flex-col items-center">
          <Home size={80} className="text-red-600" />
          <p className="mt-2 font-bold text-gray-800">A MINHA CASA</p>
        </div>
        <div className="absolute top-8 right-8 flex flex-col items-center">
          <School size={80} className="text-blue-600" />
          <p className="mt-2 font-bold text-gray-800">A MINHA ESCOLA</p>
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <path d="M 120 80 L 650 80" stroke={selectedPath === 'straight' ? '#22c55e' : '#94a3b8'} strokeWidth={selectedPath === 'straight' ? '12' : '4'} fill="none" style={{ pointerEvents: 'auto', cursor: 'pointer' }} onClick={() => setSelectedPath('straight')} />
          <path d="M 120 80 Q 200 300 300 350 Q 400 380 500 350 Q 600 320 650 80" stroke={selectedPath === 'curved' ? '#22c55e' : '#94a3b8'} strokeWidth={selectedPath === 'curved' ? '12' : '4'} fill="none" style={{ pointerEvents: 'auto', cursor: 'pointer' }} onClick={() => setSelectedPath('curved')} />
        </svg>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button onClick={() => setSelectedPath('straight')} className={`px-6 py-3 rounded-lg font-bold transition-all ${selectedPath === 'straight' ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            Caminho Reto
          </button>
          <button onClick={() => setSelectedPath('curved')} className={`px-6 py-3 rounded-lg font-bold transition-all ${selectedPath === 'curved' ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            Caminho Curvo
          </button>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
