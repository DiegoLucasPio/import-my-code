import { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';

interface Question8Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

interface MathOperation {
  c: string;
  d: string;
  u: string;
}

type ActiveField = { opIndex: number; field: keyof MathOperation };

const CELL_W = 'w-10';
const CELL_H = 'h-12';
const OP_W = 'w-8';

export function Question8({ onSave, savedData, savedObservations }: Question8Props) {
  const [operations, setOperations] = useState<MathOperation[]>([
    { c: '', d: '', u: '' },
    { c: '', d: '', u: '' },
    { c: '', d: '', u: '' },
    { c: '', d: '', u: '' },
  ]);
  const [observations, setObservations] = useState(savedObservations);
  const [activeField, setActiveField] = useState<ActiveField | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'operations' in savedData) {
      setOperations((savedData as { operations: MathOperation[] }).operations);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ operations }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [operations, observations]);

  const updateOperation = (index: number, field: keyof MathOperation, value: string) => {
    const newOps = operations.map((op, i) => i === index ? { ...op, [field]: value } : op);
    setOperations(newOps);
  };

  const handleNumKey = (digit: string) => {
    if (!activeField) return;
    const current = operations[activeField.opIndex][activeField.field];
    if (current.length < 1) {
      updateOperation(activeField.opIndex, activeField.field, digit);
    }
  };

  const handleBackspace = () => {
    if (!activeField) return;
    const current = operations[activeField.opIndex][activeField.field];
    updateOperation(activeField.opIndex, activeField.field, current.slice(0, -1));
  };

  const isActive = (opIndex: number, field: keyof MathOperation) =>
    activeField?.opIndex === opIndex && activeField?.field === field;

  const renderResultCell = (opIndex: number, field: keyof MathOperation) => (
    <button
      type="button"
      onClick={() => setActiveField({ opIndex, field })}
      className={`${CELL_W} ${CELL_H} flex items-center justify-center border-2 rounded text-xl font-bold transition-colors ${
        isActive(opIndex, field)
          ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-400'
          : 'border-gray-300 bg-white hover:bg-blue-50'
      }`}
    >
      {operations[opIndex][field] || <span className="text-gray-300 text-base">_</span>}
    </button>
  );

  const renderOperation = (
    index: number,
    operator: '+' | '-',
    num1: [string, string, string],
    num2: [string, string, string]
  ) => (
    <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-4 flex flex-col items-center">
      <div className="inline-flex flex-col">
        {/* Header: empty op col + C D U */}
        <div className="flex items-center mb-1">
          <div className={`${OP_W} shrink-0`} />
          {(['C', 'D', 'U'] as const).map((lbl) => (
            <div key={lbl} className={`${CELL_W} text-center text-red-600 font-bold text-base`}>
              {lbl}
            </div>
          ))}
        </div>

        {/* Row 1: first number */}
        <div className="flex items-center mb-1">
          <div className={`${OP_W} shrink-0`} />
          {num1.map((digit, i) => (
            <div key={i} className={`${CELL_W} ${CELL_H} flex items-center justify-center font-bold text-xl`}>
              {digit}
            </div>
          ))}
        </div>

        {/* Row 2: operator + second number */}
        <div className="flex items-center mb-2">
          <div className={`${OP_W} shrink-0 flex items-center justify-center text-2xl font-bold text-gray-700`}>
            {operator}
          </div>
          {num2.map((digit, i) => (
            <div key={i} className={`${CELL_W} ${CELL_H} flex items-center justify-center font-bold text-xl`}>
              {digit}
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div className="border-t-4 border-gray-800 mb-2 w-full" />

        {/* Row 3: result inputs */}
        <div className="flex items-center">
          <div className={`${OP_W} shrink-0`} />
          {(['c', 'd', 'u'] as const).map((field) => (
            <div key={field} className={`${CELL_W} flex justify-center`}>
              {renderResultCell(index, field)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const numPadRows = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0'],
  ];

  const [subScreen, setSubScreen] = useState(0);

  const activeValue = activeField
    ? operations[activeField.opIndex][activeField.field]
    : '';

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Questão 8 — Tela {subScreen + 1} de 2
        </span>
        <div className="flex gap-2">
          {['Tela 1', 'Tela 2'].map((label, i) => (
            <button
              key={i}
              onClick={() => { setSubScreen(i); setActiveField(null); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                subScreen === i
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        8 - RESOLVA AS OPERAÇÕES.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {subScreen === 0 && <>
          {renderOperation(0, '+', ['3', '4', '0'], ['1', '3', '5'])}
          {renderOperation(1, '+', ['3', '6', '4'], ['3', '2', '2'])}
        </>}
        {subScreen === 1 && <>
          {renderOperation(2, '-', ['3', '6', '4'], ['2', '4', '3'])}
          {renderOperation(3, '-', ['4', '8', '5'], ['2', '1', '3'])}
        </>}
      </div>

      {activeField && (
        <div className="mb-4 text-center text-sm text-blue-700 font-semibold">
          Célula selecionada — valor atual:{' '}
          <span className="text-2xl font-bold">{activeValue || '—'}</span>
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-xl p-4 inline-block shadow-inner">
          <div className="space-y-2">
            {numPadRows.map((row, ri) => (
              <div key={ri} className="flex gap-2 justify-center">
                {row.map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleNumKey(digit)}
                    className="w-16 h-16 bg-white rounded-xl shadow text-2xl font-bold text-gray-800 hover:bg-blue-50 active:bg-blue-200 active:scale-95 transition-all border border-gray-200"
                  >
                    {digit}
                  </button>
                ))}
                {ri === numPadRows.length - 1 && (
                  <button
                    type="button"
                    onClick={handleBackspace}
                    className="w-16 h-16 bg-red-100 rounded-xl shadow text-gray-700 hover:bg-red-200 active:scale-95 transition-all border border-red-200 flex items-center justify-center"
                  >
                    <Delete size={24} className="text-red-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          OBSERVAÇÕES:
        </label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          onFocus={() => setActiveField(null)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]"
          placeholder="Observações do professor..."
        />
      </div>
    </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => { setSubScreen(s => Math.max(s - 1, 0)); setActiveField(null); }}
          disabled={subScreen === 0}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Tela Anterior
        </button>
        <button
          onClick={() => { setSubScreen(s => Math.min(s + 1, 1)); setActiveField(null); }}
          disabled={subScreen === 1}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Próxima Tela →
        </button>
      </div>
    </div>
  );
}
