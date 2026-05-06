import type { Assessment } from '../lib/supabase';

interface HeaderProps {
  assessment: Assessment | null;
  onBackToMenu?: () => void;
}

export function Header({ onBackToMenu }: HeaderProps) {
  if (!onBackToMenu) return null;
  return (
    <div className="container mx-auto px-4 pt-2 print:hidden">
      <button
        onClick={onBackToMenu}
        className="text-gray-600 hover:text-gray-900 font-medium text-sm"
      >
        ← Voltar ao Menu
      </button>
    </div>
  );
}
