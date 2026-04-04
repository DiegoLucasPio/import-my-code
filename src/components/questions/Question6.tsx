import { useState, useEffect } from 'react';

interface Question6Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question6({ onSave, savedData, savedObservations }: Question6Props) {
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [observations, setObservations] = useState(savedObservations);

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
    const timer = setTimeout(() => { onSave({ answerA, answerB, answerC, answerD }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [answerA, answerB, answerC, answerD, observations]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">6 – ESTUDANDO BILHETES...</h2>
      <div className="bg-yellow-50 p-6 rounded-lg mb-8 border-2 border-yellow-200">
        <div className="bg-yellow-100 p-6 rounded border-2 border-yellow-300">
          <p className="font-bold text-lg mb-2">MARCELINO,</p>
          <p className="mb-4 leading-relaxed">FUI AO SHOPPING TROCAR A SANDÁLIA. AO SE LEVANTAR, POR FAVOR, ARRUME O SEU QUARTO.</p>
          <p className="mb-2">BEIJÃO...</p>
          <div className="flex justify-between items-end"><p className="font-semibold">21/09/2020</p><p className="font-bold">MAMÃE</p></div>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mb-6"><p className="text-center font-bold text-gray-700">BILHETE É UMA MENSAGEM CURTA QUE TRÁS ALGUMA INFORMAÇÃO.</p></div>
      <div className="space-y-4">
        <div><label className="block text-sm font-semibold text-gray-700 mb-2">A) PARA QUEM FOI ESCRITO?</label><input type="text" value={answerA} onChange={(e) => setAnswerA(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Digite a resposta..." /></div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-2">B) QUE PEDIDO TEM NO BILHETE?</label><input type="text" value={answerB} onChange={(e) => setAnswerB(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Digite a resposta..." /></div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-2">C) EM QUE DIA FOI ESCRITO?</label><input type="text" value={answerC} onChange={(e) => setAnswerC(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Digite a resposta..." /></div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-2">D) AGORA IMAGINE QUE VOCÊ É MARCELINO E RESPONDA O BILHETE.</label><textarea value={answerD} onChange={(e) => setAnswerD(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[150px]" placeholder="Escreva a resposta do bilhete..." /></div>
      </div>
      <div className="pt-6 border-t border-gray-200 mt-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
