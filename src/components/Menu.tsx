import imgCasa from '@assets/14_casa.png';
import imgChave from '@assets/3A.png';
import imgPrincess from '@assets/4A.png';
import imgLeitura from '@assets/5A_1.png';
import imgBilhete from '@assets/6_1.png';
import imgCorpo from '@assets/9_corpo.png';
import HoverButton from './HoverButton';
import { ClipboardList, RotateCcw } from 'lucide-react';

const GRID_NUMBERS = [
  ['50', '',   '52', '',   '',   '55', '',   '',   '58', ''  ],
  ['',   '61', '',   '63', '',   '',   '66', '',   '',   '69'],
  ['',   '',   '72', '',   '74', '',   '',   '77', '',   '79'],
  ['',   '81', '',   '',   '',   '85', '86', '',   '88', ''  ],
  ['',   '',   '',   '93', '',   '95', '',   '97', '',   '99'],
];

function MiniGrid() {
  const cols = 10;
  const rows = 5;
  const cw = 9;
  const ch = 8;
  const w = cols * cw;
  const h = rows * ch;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w * 0.9} height={h * 0.9} style={{ display: 'block' }}>
      {GRID_NUMBERS.map((row, ri) =>
        row.map((val, ci) => (
          <g key={`${ri}-${ci}`}>
            <rect
              x={ci * cw}
              y={ri * ch}
              width={cw}
              height={ch}
              fill={val ? '#f1f5f9' : '#ffffff'}
              stroke="#94a3b8"
              strokeWidth="0.4"
            />
            {val && (
              <text
                x={ci * cw + cw / 2}
                y={ri * ch + ch / 2 + 1.5}
                textAnchor="middle"
                fontSize="4"
                fontWeight="bold"
                fill="#1e293b"
              >
                {val}
              </text>
            )}
          </g>
        ))
      )}
    </svg>
  );
}

type Question = {
  number: number;
  title: string;
  color: string;
  icon?: string;
  iconImg?: string;
  iconAlt?: string;
  iconNode?: React.ReactNode;
};

const QUESTIONS: Question[] = [
  { number: 1,  title: 'MEU NOME',           icon: '✏️',         color: 'border-slate-300' },
  { number: 2,  title: 'MINHA IDADE',         icon: '🖐️',         color: 'border-slate-300' },
  { number: 3,  title: 'ESCREVA AS PALAVRAS', iconImg: imgChave,    iconAlt: 'Chave',    color: 'border-slate-300' },
  { number: 4,  title: 'COMPLETE AS FRASES',  iconImg: imgPrincess, iconAlt: 'Princesa', color: 'border-slate-300' },
  { number: 5,  title: 'LEITURA',             iconImg: imgLeitura,  iconAlt: 'Leitura',  color: 'border-slate-300' },
  { number: 6,  title: 'BILHETE',             iconImg: imgBilhete,  iconAlt: 'Bilhete',  color: 'border-slate-300' },
  { number: 7,  title: 'SEQUÊNCIA NUMÉRICA',  iconNode: <MiniGrid />,                    color: 'border-slate-300' },
  { number: 8,  title: 'ADIÇÃO E SUBTRAÇÃO',  iconNode: <span className="flex gap-1 text-3xl font-black text-gray-700">＋ －</span>, color: 'border-slate-300' },
  { number: 9,  title: 'MEU CORPO',            iconImg: imgCorpo,   iconAlt: 'Meu corpo',    color: 'border-slate-300' },
  { number: 10, title: 'SEQUÊNCIA LÓGICA',    iconNode: <span className="flex gap-0.5 text-2xl font-black text-gray-700">→ → →</span>, color: 'border-slate-300' },
  { number: 11, title: 'GRÁFICO',              iconNode: <svg viewBox="0 0 48 48" width={48} height={48}><rect x="4" y="28" width="8" height="16" fill="#3b82f6" rx="1"/><rect x="16" y="18" width="8" height="26" fill="#8b5cf6" rx="1"/><rect x="28" y="8" width="8" height="36" fill="#f59e0b" rx="1"/><line x1="2" y1="44" x2="38" y2="44" stroke="#64748b" strokeWidth="2"/></svg>, color: 'border-slate-300' },
  { number: 12, title: 'DIAS DA SEMANA',      icon: '📅',          color: 'border-slate-300' },
  { number: 13, title: 'NOMEIE AS FORMAS',    iconNode: <svg viewBox="0 0 48 48" width={48} height={48}><rect x="4" y="4" width="18" height="18" fill="#a855f7" rx="2"/><circle cx="35" cy="35" r="10" fill="#3b82f6"/><polygon points="24,28 14,46 34,46" fill="#f59e0b"/></svg>, color: 'border-slate-300' },
  { number: 14, title: 'DIREÇÕES',            iconImg: imgCasa,    iconAlt: 'Casa',     color: 'border-slate-300' },
];

interface MenuProps {
  onSelectType: (type: 'initial' | 'final', questionNumber?: number) => void;
  onShowReport?: () => void;
  onReset?: () => void;
  completedQuestions?: number[];
}

export function Menu({ onSelectType, onShowReport, onReset, completedQuestions = [] }: MenuProps) {
  const progress = Math.round((completedQuestions.length / QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">📚</div>
            <h1 className="text-3xl md:text-4xl font-black text-purple-600">
              AVALIAÇÃO PEDAGÓGICA INICIAL S.A
            </h1>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm font-semibold text-gray-500 mb-1">
            <span>{completedQuestions.length} de {QUESTIONS.length} questões</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {QUESTIONS.map(({ number, title, icon, iconImg, iconAlt, iconNode, color }) => {
            const completed = completedQuestions.includes(number);
            return (
              <HoverButton
                key={number}
                onHoverComplete={() => onSelectType('initial', number)}
                className={`group rounded-2xl border-2 ${completed ? 'border-green-400 bg-green-50' : color + ' bg-white'} p-4 transition-all duration-300 hover:shadow-lg min-h-40 flex flex-col items-center justify-center text-center`}
              >
                {completed && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">✓</span>
                  </span>
                )}
                <div className="mb-3 group-hover:scale-110 transition-transform flex items-center justify-center h-12">
                  {iconNode ? (
                    iconNode
                  ) : iconImg ? (
                    <img src={iconImg} alt={iconAlt} className="h-12 w-auto object-contain" />
                  ) : (
                    <span className="text-4xl">{icon}</span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  QUESTÃO {number}
                </p>
              </HoverButton>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <HoverButton
            onHoverComplete={() => onSelectType('initial')}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            📊 INICIAR AVALIAÇÃO
          </HoverButton>
          {onShowReport && (
            <HoverButton
              onHoverComplete={onShowReport}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ClipboardList size={18} /> VER RELATÓRIO
            </HoverButton>
          )}
          {onReset && (
            <HoverButton
              onHoverComplete={onReset}
              className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> RESETAR
            </HoverButton>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Modo acessível: mantenha o cursor sobre um item por 2 segundos para selecionar
        </p>

      </div>
    </div>
  );
}
