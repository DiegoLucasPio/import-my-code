import { useState, useEffect } from 'react';
import img5A1 from '@assets/5A_1.png';
import img5A2 from '@assets/5A_2.png';
import img5A3 from '@assets/5A_3.png';
import img5B1 from '@assets/5B_1.png';
import img5B2 from '@assets/5B_2.png';
import img5B3 from '@assets/5B_3.png';

interface Question5Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

const group1 = [
  { img: img5A1, alt: 'Menino sentado na cadeira da escola' },
  { img: img5A2, alt: 'Menino deitado no sofá' },
  { img: img5A3, alt: 'Menino brincando com blocos' },
];

const group2 = [
  { img: img5B1, alt: 'Menina pulando corda' },
  { img: img5B2, alt: 'Menina lavando as mãos' },
  { img: img5B3, alt: 'Menina comendo' },
];

export function Question5({ onSave, savedData, savedObservations }: Question5Props) {
  const [subScreen, setSubScreen] = useState(0);
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
    const timer = setTimeout(() => {
      onSave({ selected1, selected2 }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [selected1, selected2, observations]);

  const renderImageGroup = (
    items: { img: string; alt: string }[],
    selected: number | null,
    onSelect: (i: number) => void,
    selectedBorder: string,
    selectedBg: string,
  ) => (
    <div className="grid grid-cols-3 gap-4">
      {items.map(({ img, alt }, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`border-4 rounded-xl transition-all overflow-hidden ${
            selected === index
              ? `${selectedBorder} ${selectedBg} shadow-lg scale-105`
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <img src={img} alt={alt} className="w-full h-auto object-contain" />
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Questão 5 — Tela {subScreen + 1} de 2
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setSubScreen(0)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              subScreen === 0
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Tela 1
          </button>
          <button
            onClick={() => setSubScreen(1)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              subScreen === 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Tela 2
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          5 - LEIA A FRASE E CIRCULE A IMAGEM QUE ELA REPRESENTA.
        </h2>

        {subScreen === 0 ? (
          <>
            <div className="bg-blue-100 p-4 rounded-lg mb-6">
              <p className="text-2xl font-bold text-center text-gray-800">
                O MENINO ESTÁ SENTADO NO CHÃO
              </p>
            </div>
            {renderImageGroup(group1, selected1, setSelected1, 'border-blue-600', 'bg-blue-50')}
          </>
        ) : (
          <>
            <div className="bg-green-100 p-4 rounded-lg mb-6">
              <p className="text-2xl font-bold text-center text-gray-800">
                A MENINA ESTÁ LAVANDO AS MÃOS
              </p>
            </div>
            {renderImageGroup(group2, selected2, setSelected2, 'border-green-600', 'bg-green-50')}
          </>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setSubScreen(0)}
          disabled={subScreen === 0}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Tela Anterior
        </button>
        <button
          onClick={() => setSubScreen(1)}
          disabled={subScreen === 1}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Próxima Tela →
        </button>
      </div>
    </div>
  );
}
