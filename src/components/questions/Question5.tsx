import { useState, useEffect } from 'react';
import { Armchair, Activity, User } from 'lucide-react';

interface Question5Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question5({ onSave, savedData, savedObservations }: Question5Props) {
  const [selected1, setSelected1] = useState<number | null>(null);
  const [selected2, setSelected2] = useState<number | null>(null);
  const [observations, setObservations] = useState(savedObservations);

  useEffect(() => {
    if (savedData && typeof savedData === 'object') {
      const data = savedData as { selected1?: number; selected2?: number };
      if (data.selected1 !== undefined) setSelected1(data.selected1);
      if (data.selected2 !== undefined) setSelected2(data.selected2);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ selected1, selected2 }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [selected1, selected2, observations]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">5 - LEIA A FRASE E CIRCULE A IMAGEM QUE ELA REPRESENTA.</h2>
      <div className="space-y-12">
        <div>
          <div className="bg-blue-100 p-4 rounded-lg mb-6"><p className="text-2xl font-bold text-center text-gray-800">O MENINO ESTÁ SENTADO NO CHÃO</p></div>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <button key={index} onClick={() => setSelected1(index)} className={`p-6 border-4 rounded-xl transition-all ${selected1 === index ? 'border-blue-600 bg-blue-50 shadow-lg scale-105' : 'border-gray-300 hover:border-gray-400'}`}>
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  {index === 0 && <Armchair size={64} className="text-gray-600" />}
                  {index === 1 && <User size={64} className="text-blue-600" />}
                  {index === 2 && <Activity size={64} className="text-green-600" />}
                </div>
                <p className="mt-2 text-sm text-center text-gray-600">{index === 0 ? 'Na cadeira' : index === 1 ? 'No sofá' : 'Brincando'}</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-green-100 p-4 rounded-lg mb-6"><p className="text-2xl font-bold text-center text-gray-800">A MENINA ESTÁ LAVANDO AS MÃOS</p></div>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <button key={index} onClick={() => setSelected2(index)} className={`p-6 border-4 rounded-xl transition-all ${selected2 === index ? 'border-green-600 bg-green-50 shadow-lg scale-105' : 'border-gray-300 hover:border-gray-400'}`}>
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  {index === 0 && <Activity size={64} className="text-orange-600" />}
                  {index === 1 && <User size={64} className="text-blue-600" />}
                  {index === 2 && <User size={64} className="text-green-600" />}
                </div>
                <p className="mt-2 text-sm text-center text-gray-600">{index === 0 ? 'Pulando corda' : index === 1 ? 'Lavando as mãos' : 'Comendo'}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-200 mt-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
