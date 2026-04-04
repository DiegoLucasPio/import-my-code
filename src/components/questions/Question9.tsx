import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface Question9Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question9({ onSave, savedData, savedObservations }: Question9Props) {
  const [bodyParts, setBodyParts] = useState({ head: '', arm: '', body: '', leg: '' });
  const [observations, setObservations] = useState(savedObservations);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'bodyParts' in savedData) {
      setBodyParts((savedData as { bodyParts: typeof bodyParts }).bodyParts);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ bodyParts }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [bodyParts, observations]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">9 - ESCREVA O NOME DAS PARTES DO CORPO.</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-6">
        <div className="relative">
          <User size={200} className="text-blue-600" strokeWidth={2} />
          <input type="text" value={bodyParts.head} onChange={(e) => setBodyParts({ ...bodyParts, head: e.target.value })} placeholder="Cabeça" className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 px-2 py-1 text-sm border-2 border-blue-500 rounded bg-white focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={bodyParts.arm} onChange={(e) => setBodyParts({ ...bodyParts, arm: e.target.value })} placeholder="Braço" className="absolute top-20 -right-20 w-32 px-2 py-1 text-sm border-2 border-blue-500 rounded bg-white focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={bodyParts.body} onChange={(e) => setBodyParts({ ...bodyParts, body: e.target.value })} placeholder="Corpo" className="absolute top-28 -left-20 w-32 px-2 py-1 text-sm border-2 border-blue-500 rounded bg-white focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={bodyParts.leg} onChange={(e) => setBodyParts({ ...bodyParts, leg: e.target.value })} placeholder="Perna" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 px-2 py-1 text-sm border-2 border-blue-500 rounded bg-white focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="space-y-4 w-full md:w-auto">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Parte superior</label><input type="text" value={bodyParts.head} onChange={(e) => setBodyParts({ ...bodyParts, head: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ex: cabeça" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Membro superior</label><input type="text" value={bodyParts.arm} onChange={(e) => setBodyParts({ ...bodyParts, arm: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ex: braço" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tronco</label><input type="text" value={bodyParts.body} onChange={(e) => setBodyParts({ ...bodyParts, body: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ex: corpo" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Membro inferior</label><input type="text" value={bodyParts.leg} onChange={(e) => setBodyParts({ ...bodyParts, leg: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ex: perna" /></div>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
