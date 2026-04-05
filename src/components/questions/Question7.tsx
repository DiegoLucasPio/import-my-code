import { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';

interface Question7Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

export function Question7({ onSave, savedData, savedObservations }: Question7Props) {
  const [grid, setGrid] = useState<string[][]>([
    ['50', '', '52', '', '', '55', '', '', '58', ''],
    ['', '61', '', '63', '', '', '66', '', '', '69'],
    ['', '', '72', '', '74', '', '', '77', '', '79'],
    ['', '81', '', '', '', '85', '86', '', '88', ''],
    ['', '', '', '93', '', '95', '', '97', '', '99'],
  ]);
  const [observations, setObservations] = useState(savedObservations);
  const [activeCell, setActiveCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'grid' in savedData) {
      setGrid((savedData as { grid: string[][] }).grid);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSave({ grid }, observations);
    }, 500);
    return () => clearTimeout(timer);
  }, [grid, observations]);

  const updateCell = (row: number, col: number, value: string) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  const isEditable = (row: number, col: number) => {
    const prefilledCells = [
      [0, 0], [0, 2], [0, 5], [0, 8],
      [1, 1], [1, 3], [1, 6], [1, 9],
      [2, 2], [2, 4], [2, 7], [2, 9],
      [3, 1], [3, 5], [3, 6], [3, 8],
      [4, 3], [4, 5], [4, 7], [4, 9],
    ];
    return !prefilledCells.some(([r, c]) => r === row && c === col);
  };

  const handleNumKey = (digit: string) => {
    if (!activeCell) return;
    const [row, col] = activeCell;
    const current = grid[row][col];
    if (current.length < 2) {
      updateCell(row, col, current + digit);
    }
  };

  const handleBackspace = () => {
    if (!activeCell) return;
    const [row, col] = activeCell;
    const current = grid[row][col];
    updateCell(row, col, current.slice(0, -1));
  };

  const numPadRows = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0'],
  ];

  const activeValue = activeCell ? grid[activeCell[0]][activeCell[1]] : '';

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        7 – COMPLETE OS NÚMEROS DO QUADRO ABAIXO.
      </h2>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border-2 border-gray-400 p-0">
                    {isEditable(rowIndex, colIndex) ? (
                      <button
                        type="button"
                        onClick={() => setActiveCell([rowIndex, colIndex])}
                        className={`w-full h-16 text-center text-xl font-semibold transition-colors focus:outline-none ${
                          activeCell?.[0] === rowIndex && activeCell?.[1] === colIndex
                            ? 'bg-blue-100 ring-2 ring-inset ring-blue-500'
                            : cell
                            ? 'bg-white hover:bg-blue-50'
                            : 'bg-white hover:bg-blue-50'
                        }`}
                      >
                        {cell || <span className="text-gray-300">__</span>}
                      </button>
                    ) : (
                      <div className="w-full h-16 flex items-center justify-center text-xl font-bold bg-gray-100">
                        {cell}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeCell && (
        <div className="mb-6 p-1 text-center text-sm text-blue-700 font-semibold">
          Célula selecionada — valor atual: <span className="text-2xl font-bold">{activeValue || '—'}</span>
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
          onFocus={() => setActiveCell(null)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]"
          placeholder="Observações do professor..."
        />
      </div>
    </div>
  );
}
