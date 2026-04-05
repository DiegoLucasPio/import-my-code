import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

interface Question10Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question10({ onSave, savedData, savedObservations }: Question10Props) {
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

  const sequence = [
    { color: 'blue', arrows: ['up', 'up', 'down', 'down'] },
    { color: 'green', arrows: ['up', 'up', 'down', 'down'] },
    { color: 'red', arrows: ['up', 'up', 'down', 'down'] },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        10 - OBSERVE A SEQUÊNCIA
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {sequence.map((group, groupIndex) => (
            <div key={groupIndex} className="flex gap-1">
              {group.arrows.map((arrow, arrowIndex) => (
                <div key={`${groupIndex}-${arrowIndex}`} className="flex items-center">
                  {arrow === 'up' && (
                    <ArrowUp
                      size={48}
                      className={`${
                        group.color === 'blue'
                          ? 'text-blue-500'
                          : group.color === 'green'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                      strokeWidth={3}
                    />
                  )}
                  {arrow === 'down' && (
                    <ArrowDown
                      size={48}
                      className={`${
                        group.color === 'blue'
                          ? 'text-blue-500'
                          : group.color === 'green'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                      strokeWidth={3}
                    />
                  )}
                </div>
              ))}
              {groupIndex < sequence.length - 1 && (
                <ArrowRight
                  size={48}
                  className={`mx-2 ${
                    group.color === 'blue'
                      ? 'text-blue-500'
                      : group.color === 'green'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                  strokeWidth={3}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          O ITEM QUE CONTINUA CORRETAMENTE A SEQUÊNCIA É:
        </p>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setSelected(0)}
            className={`p-6 border-4 rounded-xl transition-all ${
              selected === 0
                ? 'border-red-600 bg-red-50 shadow-lg scale-105'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <ArrowUp size={64} className="mx-auto text-red-500" strokeWidth={3} />
          </button>

          <button
            onClick={() => setSelected(1)}
            className={`p-6 border-4 rounded-xl transition-all ${
              selected === 1
                ? 'border-red-600 bg-red-50 shadow-lg scale-105'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <ArrowDown size={64} className="mx-auto text-red-500" strokeWidth={3} />
          </button>

          <button
            onClick={() => setSelected(2)}
            className={`p-6 border-4 rounded-xl transition-all ${
              selected === 2
                ? 'border-red-600 bg-red-50 shadow-lg scale-105'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <ArrowRight size={64} className="mx-auto text-red-500" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          OBSERVAÇÕES:
        </label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]"
          placeholder="Observações do professor..."
        />
      </div>
    </div>
  );
}
