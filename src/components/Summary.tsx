import { CheckCircle } from 'lucide-react';
import type { Assessment } from '../lib/supabase';

interface SummaryProps {
  assessment: Assessment;
  responses: Record<number, { data: unknown; observations: string }>;
}

export function Summary({ assessment, responses }: SummaryProps) {
  const completedQuestions = Object.keys(responses).length;
  const totalQuestions = 14;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Avaliação Concluída!</h1>
        <p className="text-gray-600">A avaliação pedagógica foi finalizada com sucesso.</p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Informações da Avaliação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><span className="font-semibold text-gray-700">Aluno:</span><p className="text-gray-800">{assessment.student_name}</p></div>
          <div><span className="font-semibold text-gray-700">Unidade Escolar:</span><p className="text-gray-800">{assessment.school_unit}</p></div>
          <div><span className="font-semibold text-gray-700">Professor(a) AEE:</span><p className="text-gray-800">{assessment.teacher_name}</p></div>
          <div><span className="font-semibold text-gray-700">Data:</span><p className="text-gray-800">{new Date(assessment.assessment_date).toLocaleDateString('pt-BR')}</p></div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Progresso</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Questões Respondidas:</span>
          <span className="text-2xl font-bold text-green-600">{completedQuestions} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Questões Avaliadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
            <div key={num} className={`p-3 rounded-lg border-2 ${responses[num] ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-100 border-gray-300 text-gray-500'}`}>
              <div className="flex items-center gap-2">
                {responses[num] && <CheckCircle size={20} />}
                <span className="font-semibold">Questão {num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button onClick={() => window.print()} className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Imprimir Avaliação
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Centro de Formação dos Profissionais em Educação - Paulo Freire</p>
        <p>Rua Euclides Pires de Assis, nº 205 – Remanso Campineiro – Hortolândia</p>
      </div>
    </div>
  );
}
