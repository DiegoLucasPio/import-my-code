import { useState, useEffect } from 'react';

interface Question12Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question12({ onSave, savedData, savedObservations }: Question12Props) {
  const [selectedDays, setSelectedDays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const daysOfWeek = [
    { name: 'DOMINGO', color: 'bg-orange-400' },
    { name: 'SEGUNDA-FEIRA', color: 'bg-yellow-400' },
    { name: 'TERÇA-FEIRA', color: 'bg-green-400' },
    { name: 'QUARTA-FEIRA', color: 'bg-blue-400' },
    { name: 'QUINTA-FEIRA', color: 'bg-cyan-400' },
    { name: 'SEXTA-FEIRA', color: 'bg-purple-400' },
    { name: 'SÁBADO', color: 'bg-pink-400' },
  ];

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'selectedDays' in savedData) {
      setSelectedDays((savedData as { selectedDays: boolean[] }).selectedDays);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ selectedDays }, savedObservations);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedDays]);

  const toggleDay = (index: number) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    setSelectedDays(newDays);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        12 - MARQUE ABAIXO OS DIAS DA SEMANA EM QUE HAVERÁ AULA:
      </h2>

      <div className="overflow-x-auto mb-6">
        <div className="flex gap-1 min-w-max">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="flex flex-col">
              <div className={`${day.color} px-4 py-3 text-center font-bold text-sm border-2 border-gray-800 min-w-[100px]`}>
                {day.name}
              </div>
              <button
                onClick={() => toggleDay(index)}
                className={`min-w-[100px] h-20 border-2 border-gray-800 transition-all ${
                  selectedDays[index]
                    ? 'bg-green-500 text-white font-bold text-2xl'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                {selectedDays[index] && '✓'}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
