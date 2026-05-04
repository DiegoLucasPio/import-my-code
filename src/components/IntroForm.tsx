import { useState } from 'react';

interface IntroFormProps {
  onSubmit: (data: {
    student_name: string;
    school_unit: string;
    teacher_name: string;
    assessment_date: string;
  }) => void;
}

export function IntroForm({ onSubmit }: IntroFormProps) {
  const [formData, setFormData] = useState({
    student_name: '',
    school_unit: '',
    teacher_name: '',
    assessment_date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Avaliação Pedagógica Inicial/Final</h1>
        <p className="text-gray-600">A.E.E. (SA)</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Aluno *</label>
          <input type="text" required value={formData.student_name} onChange={(e) => setFormData({ ...formData, student_name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Digite o nome completo do aluno" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Unidade Escolar *</label>
          <input type="text" required value={formData.school_unit} onChange={(e) => setFormData({ ...formData, school_unit: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Digite o nome da unidade escolar" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Professor(a) do AEE *</label>
          <input type="text" required value={formData.teacher_name} onChange={(e) => setFormData({ ...formData, teacher_name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Digite o nome do professor" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Data da Avaliação *</label>
          <input type="date" required value={formData.assessment_date} onChange={(e) => setFormData({ ...formData, assessment_date: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg">
          Iniciar Avaliação
        </button>
      </form>
    </div>
  );
}
