import type { Assessment } from '../lib/supabase';

interface HeaderProps {
  assessment: Assessment | null;
  onBackToMenu?: () => void;
}

export function Header({ assessment, onBackToMenu }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          {onBackToMenu && (
            <button onClick={onBackToMenu} className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              ← Voltar ao Menu
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              H
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AVALIAÇÃO PEDAGÓGICA INICIAL S.A</h1>
              <p className="text-sm text-gray-600">Departamento de Pedagogia e Formação Continuada</p>
            </div>
          </div>
        </div>

        {assessment && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              AVALIAÇÃO PEDAGÓGICA INICIAL/FINAL – A.E.E. (SA)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Unidade Escolar:</span>
                <p className="text-gray-800">{assessment.school_unit}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Prof.ª do AEE:</span>
                <p className="text-gray-800">{assessment.teacher_name}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Data:</span>
                <p className="text-gray-800">{new Date(assessment.assessment_date).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="md:col-span-3">
                <span className="font-semibold text-gray-700">Nome:</span>
                <p className="text-gray-800">{assessment.student_name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
