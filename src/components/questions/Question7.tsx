import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (savedData && typeof savedData === 'object' && 'grid' in savedData) {
      setGrid((savedData as { grid: string[][] }).grid);
    }
  }, [savedData]);

  useEffect(() => {
    const timer = setTimeout(() => { onSave({ grid }, observations); }, 500);
    return () => clearTimeout(timer);
  }, [grid, observations]);

  const updateCell = (row: number, col: number, value: string) => {
    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">7 – COMPLETE OS NÚMEROS DO QUADRO ABAIXO.</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border-2 border-gray-400 p-0">
                    {isEditable(rowIndex, colIndex) ? (
                      <input type="text" value={cell} onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)} className="w-full h-16 text-center text-xl font-semibold focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" maxLength={2} />
                    ) : (
                      <div className="w-full h-16 flex items-center justify-center text-xl font-bold bg-gray-100">{cell}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">OBSERVAÇÕES:</label>
        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]" placeholder="Observações do professor..." />
      </div>
    </div>
  );
}
