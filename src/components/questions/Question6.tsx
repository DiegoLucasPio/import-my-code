import { useState, useEffect } from 'react';
import { VirtualKeyboard } from '../VirtualKeyboard';
import imgBilhete from '@assets/6_1.png';
import imgMoldura from '@assets/6_3.png';

interface Question6Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

type ActiveField = 'answerA' | 'answerB' | 'answerC' | 'answerD';

export function Question6({ onSave, savedData, savedObservations }: Question6Props) {
  const [subScreen, setSubScreen] = useState(0);
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [observations, setObservations] = useState(savedObservations);
  const [activeField, setActiveField] = useState<ActiveField | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object') {
      const data = savedData as { answerA?: string; answerB?: string; answerC?: string; answerD?: string };
      if (data.answerA) setAnswerA(data.answerA);
      if (data.answerB) setAnswerB(data.answerB);
      if (data.answerC) setAnswerC(data.answerC);
      if (data.answerD) setAnswerD(data.answerD);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ answerA, answerB, answerC, answerD }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [answerA, answerB, answerC, answerD, observations]);

  const setters: Record<ActiveField, React.Dispatch<React.SetStateAction<string>>> = {
    answerA: setAnswerA,
    answerB: setAnswerB,
    answerC: setAnswerC,
    answerD: setAnswerD,
  };

  const values: Record<ActiveField, string> = {
    answerA, answerB, answerC, answerD,
  };

  const handleKeyboardInput = (text: string) => {
    if (!activeField) return;
    setters[activeField](prev => prev + text);
  };

  const handleKeyboardBackspace = () => {
    if (!activeField) return;
    setters[activeField](prev => prev.slice(0, -1));
  };

  const keyboard = (
    <div className="bg-gray-100 rounded-lg p-4 mt-4">
      <VirtualKeyboard
        onInput={handleKeyboardInput}
        onBackspace={handleKeyboardBackspace}
        inputValue={activeField ? values[activeField] : ''}
      />
    </div>
  );

  const bilheteImg = (
    <img src={imgBilhete} alt="Bilhete" className="w-full rounded-lg shadow mb-6" />
  );

  const subScreenNav = (total: number) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Questão 6 — Tela {subScreen + 1} de {total}
      </span>
      <div className="flex gap-2">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => setSubScreen(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              subScreen === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Tela {i + 1}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {subScreenNav(3)}

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          6 – ESTUDANDO BILHETES...
        </h2>

        {subScreen === 0 && (
          <>
            {bilheteImg}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A) PARA QUEM FOI ESCRITO?
              </label>
              <input
                type="text"
                value={answerA}
                onChange={(e) => setAnswerA(e.target.value)}
                onFocus={() => setActiveField('answerA')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Digite a resposta..."
              />
            </div>
            {keyboard}
          </>
        )}

        {subScreen === 1 && (
          <>
            {bilheteImg}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  B) QUE PEDIDO TEM NO BILHETE?
                </label>
                <input
                  type="text"
                  value={answerB}
                  onChange={(e) => setAnswerB(e.target.value)}
                  onFocus={() => setActiveField('answerB')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Digite a resposta..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  C) EM QUE DIA FOI ESCRITO?
                </label>
                <input
                  type="text"
                  value={answerC}
                  onChange={(e) => setAnswerC(e.target.value)}
                  onFocus={() => setActiveField('answerC')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Digite a resposta..."
                />
              </div>
            </div>
            {keyboard}
          </>
        )}

        {subScreen === 2 && (
          <>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              D) AGORA IMAGINE QUE VOCÊ É MARCELINO E RESPONDA O BILHETE.
            </p>
            <div className="relative w-full">
              <img src={imgMoldura} alt="Moldura do bilhete" className="w-full rounded-lg" />
              <textarea
                value={answerD}
                onChange={(e) => setAnswerD(e.target.value)}
                onFocus={() => setActiveField('answerD')}
                className="absolute inset-0 w-full h-full bg-transparent resize-none focus:outline-none text-gray-800 font-semibold leading-relaxed"
                style={{ padding: '35% 12% 10% 12%', fontSize: '1.25rem', textAlign: 'center' }}
                placeholder="Escreva sua resposta aqui..."
              />
            </div>
            {keyboard}
          </>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setSubScreen(s => Math.max(s - 1, 0))}
          disabled={subScreen === 0}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Tela Anterior
        </button>
        <button
          onClick={() => setSubScreen(s => Math.min(s + 1, 2))}
          disabled={subScreen === 2}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Próxima Tela →
        </button>
      </div>
    </div>
  );
}
