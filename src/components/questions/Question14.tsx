import { useState, useEffect } from 'react';
import imgCasa from '@assets/14_casa.png';
import imgEscola from '@assets/14_escola.png';

interface Question14Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question14({ onSave, savedData, savedObservations }: Question14Props) {
  const [selectedPath, setSelectedPath] = useState<'straight' | 'curved' | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'selectedPath' in savedData) {
      setSelectedPath((savedData as { selectedPath: 'straight' | 'curved' }).selectedPath);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ selectedPath }, savedObservations);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedPath]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        14 - PINTE O CAMINHO MAIS CURTO ATÉ A ESCOLA
      </h2>

      <div className="relative bg-green-50 p-8 rounded-lg min-h-[400px]">
        <div className="absolute top-4 left-4 flex flex-col items-center">
          <img src={imgCasa} alt="A minha casa" className="h-28 w-auto object-contain" />
          <p className="mt-1 font-bold text-gray-800 text-sm">A MINHA CASA</p>
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-center">
          <img src={imgEscola} alt="A minha escola" className="h-28 w-auto object-contain" />
          <p className="mt-1 font-bold text-gray-800 text-sm">A MINHA ESCOLA</p>
        </div>

        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <path
            d="M 120 80 L 650 80"
            stroke={selectedPath === 'straight' ? '#22c55e' : '#94a3b8'}
            strokeWidth={selectedPath === 'straight' ? '12' : '4'}
            fill="none"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={() => setSelectedPath('straight')}
          />
          <path
            d="M 120 80 Q 200 300 300 350 Q 400 380 500 350 Q 600 320 650 80"
            stroke={selectedPath === 'curved' ? '#22c55e' : '#94a3b8'}
            strokeWidth={selectedPath === 'curved' ? '12' : '4'}
            fill="none"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={() => setSelectedPath('curved')}
          />
        </svg>
      </div>
    </div>
  );
}
