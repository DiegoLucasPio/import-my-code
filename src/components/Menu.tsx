const QUESTIONS = [
  { number: 1, title: 'MEU NOME', icon: '✏️', color: 'border-slate-300' },
  { number: 2, title: 'MINHA IDADE', icon: '🖐️', color: 'border-emerald-400 bg-emerald-50' },
  { number: 3, title: 'LETRAS E NÚMEROS', icon: '📝', color: 'border-slate-300' },
  { number: 4, title: 'VOGAIS E FIGURAS', icon: '🐻', color: 'border-slate-300' },
  { number: 5, title: 'FORMAS IGUAIS', icon: '⚫', color: 'border-slate-300' },
  { number: 6, title: 'QUANTIDADE', icon: '🎈', color: 'border-slate-300' },
  { number: 7, title: 'NO PARQUE', icon: '🌳', color: 'border-slate-300' },
  { number: 8, title: 'ADIÇÃO', icon: '➕', color: 'border-slate-300' },
  { number: 9, title: 'SUBTRAÇÃO', icon: '➖', color: 'border-slate-300' },
  { number: 10, title: 'COR VERDE', icon: '🟢', color: 'border-slate-300' },
  { number: 11, title: 'COR VERMELHA', icon: '🔴', color: 'border-slate-300' },
  { number: 12, title: 'POSIÇÕES', icon: '⚽', color: 'border-slate-300' },
  { number: 13, title: 'DIFERENTE', icon: '🦋', color: 'border-slate-300' },
  { number: 14, title: 'HIGIENE', icon: '🪥', color: 'border-slate-300' },
];

interface MenuProps {
  onSelectType: (type: 'initial' | 'final', questionNumber?: number) => void;
}

export function Menu({ onSelectType }: MenuProps) {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">📚</div>
            <h1 className="text-3xl md:text-4xl font-black text-purple-600">
              AVALIAÇÃO PEDAGÓGICA INICIAL S.A
            </h1>
          </div>
          <p className="text-slate-600 text-sm font-medium">
            1 DE 14 QUESTÕES • 7%
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {QUESTIONS.map(({ number, title, icon, color }) => (
            <button
              key={number}
              onClick={() => onSelectType('initial', number)}
              className={`group relative rounded-2xl border-2 ${color} bg-white p-4 transition-all duration-300 hover:shadow-lg min-h-40 flex flex-col items-center justify-center text-center`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {title}
              </h3>
              <p className="text-xs text-slate-500 mt-2">
                QUESTÃO {number}
              </p>
              {number === 2 && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onSelectType('initial')}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            📊 INICIAR AVALIAÇÃO
          </button>
          <button
            className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            🔄 RESETAR
          </button>
        </div>

        <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-200">
          <p className="text-slate-600 text-sm text-center">
            <span className="font-semibold text-slate-900">Centro de Formação dos Profissionais em Educação - Paulo Freire</span>
            <br className="hidden md:block" />
            Rua Euclides Pires de Assis, nº 205 – Remanso Campineiro – Hortolândia
          </p>
        </div>
      </div>
    </div>
  );
}
