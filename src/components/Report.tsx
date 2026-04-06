import { Printer, ArrowLeft } from 'lucide-react';
import type { Assessment } from '../lib/supabase';
import HoverButton from './HoverButton';

interface ReportProps {
  assessment: Assessment;
  responses: Record<number, { data: unknown; observations: string }>;
  onBackToMenu: () => void;
}

const questionTitles: Record<number, string> = {
  1: 'Meu Nome',
  2: 'Minha Idade',
  3: 'Escreva as Palavras',
  4: 'Complete as Frases',
  5: 'Leitura',
  6: 'Bilhete',
  7: 'Sequência Numérica',
  8: 'Adição e Subtração',
  9: 'Meu Corpo',
  10: 'Sequência Lógica',
  11: 'Gráfico',
  12: 'Dias da Semana',
  13: 'Nomeie as Formas',
  14: 'Direções',
};

const formatResponse = (questionNumber: number, data: unknown): string => {
  if (!data) return 'Não respondida';
  try {
    if (typeof data === 'string') return data;
    return JSON.stringify(data);
  } catch {
    return String(data);
  }
};

export function Report({ assessment, responses, onBackToMenu }: ReportProps) {
  const totalQuestions = 14;
  const completedQuestions = Object.keys(responses).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-600 mb-2 text-center">
          Relatório da Avaliação
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Avaliação Pedagógica Inicial S.A
        </p>

        {/* Student info */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-bold text-gray-500">Nome do Aluno</span>
              <p className="text-lg text-gray-800 font-semibold">{assessment.student_name}</p>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-500">Professor(a) AEE</span>
              <p className="text-lg text-gray-800 font-semibold">{assessment.teacher_name}</p>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-500">Unidade Escolar</span>
              <p className="text-lg text-gray-800 font-semibold">{assessment.school_unit}</p>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-500">Data</span>
              <p className="text-lg text-gray-800 font-semibold">
                {new Date(assessment.assessment_date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border">
          <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2">
            <span>{completedQuestions} de {totalQuestions} questões</span>
            <span>{Math.round((completedQuestions / totalQuestions) * 100)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Responses */}
        <div className="space-y-3 mb-8">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(num => {
            const response = responses[num];
            const completed = !!response;
            return (
              <div
                key={num}
                className={`rounded-xl p-4 border-2 ${
                  completed
                    ? 'bg-green-50 border-green-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-gray-800">
                    Questão {num}: {questionTitles[num] || ''}
                  </span>
                  {completed && (
                    <span className="ml-auto text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      ✓ Completa
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {completed ? formatResponse(num, response.data) : 'Não respondida'}
                </p>
                {completed && response.observations && (
                  <p className="text-xs text-gray-500 mt-1">
                    <strong>Observações:</strong> {response.observations}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-lg inline-flex items-center gap-2 hover:bg-green-600 transition-colors"
          >
            <Printer size={18} /> Imprimir
          </button>
          <HoverButton
            onHoverComplete={onBackToMenu}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Menu
          </HoverButton>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Centro de Formação dos Profissionais em Educação - Paulo Freire</p>
          <p>Rua Euclides Pires de Assis, nº 205 – Remanso Campineiro – Hortolândia</p>
        </div>
      </div>
    </div>
  );
}
