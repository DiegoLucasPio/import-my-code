import { useState, useEffect } from 'react';
import { Apple, Grape, Banana } from 'lucide-react';

interface Question11Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question11({ onSave, savedData, savedObservations }: Question11Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [observations, setObservations] = useState(savedObservations);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'selected' in savedData) {
      setSelected((savedData as { selected: number }).selected);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ selected }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [selected, observations]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        11 - O GRÁFICO ABAIXO REPRESENTA QUANTAS FRUTAS MARIA COMEU NO FIM DE SEMANA:
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex justify-center items-end gap-8 h-64">
          <div className="flex flex-col items-center">
            <div className="flex flex-col-reverse gap-1 mb-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 bg-red-500 rounded border-2 border-red-700"></div>
              ))}
            </div>
            <Apple size={40} className="text-red-600" />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col-reverse gap-1 mb-3">
              {[1, 2].map((i) => (
                <div key={i} className="w-16 h-16 bg-purple-500 rounded border-2 border-purple-700"></div>
              ))}
            </div>
            <Grape size={40} className="text-purple-600" />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col-reverse gap-1 mb-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 bg-yellow-400 rounded border-2 border-yellow-600"></div>
              ))}
            </div>
            <Banana size={40} className="text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          QUANTAS FRUTAS MARIA COMEU AO TODO?
        </p>

        <div className="grid grid-cols-4 gap-4">
          {[5, 10, 8, 3].map((num, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`p-6 border-4 rounded-xl transition-all ${
                selected === index
                  ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className="text-3xl font-bold">{num}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
