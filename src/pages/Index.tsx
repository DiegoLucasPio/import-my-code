import { useState } from 'react';
import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import { IntroForm } from '../components/IntroForm';
import { Question1 } from '../components/questions/Question1';
import { Question2 } from '../components/questions/Question2';
import { Question3A } from '../components/questions/Question3A';
import { Question3B } from '../components/questions/Question3B';
import { Question4 } from '../components/questions/Question4';
import { Question5 } from '../components/questions/Question5';
import { Question6 } from '../components/questions/Question6';
import { Question7 } from '../components/questions/Question7';
import { Question8 } from '../components/questions/Question8';
import { Question9 } from '../components/questions/Question9';
import { Question10 } from '../components/questions/Question10';
import { Question11 } from '../components/questions/Question11';
import { Question12 } from '../components/questions/Question12';
import { Question13 } from '../components/questions/Question13';
import { Question14 } from '../components/questions/Question14';
import { Summary } from '../components/Summary';
import { supabase } from '../lib/supabase';
import type { Assessment } from '../lib/supabase';

function Index() {
  const [showMenu, setShowMenu] = useState(true);
  const [assessmentType, setAssessmentType] = useState<'initial' | 'final' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [responses, setResponses] = useState<Record<number, { data: unknown; observations: string }>>({});

  const handleMenuSelect = (type: 'initial' | 'final', questionNumber?: number) => {
    setAssessmentType(type);
    setShowMenu(false);
    setCurrentStep(questionNumber || 0);
  };

  const handleIntroSubmit = async (data: {
    student_name: string;
    school_unit: string;
    teacher_name: string;
    assessment_date: string;
  }) => {
    const assessmentData = { ...data, assessment_type: assessmentType };

    const { data: newAssessment, error } = await supabase
      .from('assessments')
      .insert([assessmentData])
      .select()
      .maybeSingle();

    if (error) { console.error('Error creating assessment:', error); return; }
    if (newAssessment) { setAssessment(newAssessment as Assessment); setCurrentStep(1); }
  };

  const handleResponseSave = async (questionNumber: number, data: unknown, observations: string) => {
    if (!assessment) return;
    setResponses(prev => ({ ...prev, [questionNumber]: { data, observations } }));

    const { error } = await supabase
      .from('assessment_responses')
      .upsert([{
        assessment_id: assessment.id,
        question_number: questionNumber,
        response_data: data as any,
        observations,
      }]);

    if (error) console.error('Error saving response:', error);
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 16));
  const handlePrevious = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleBackToMenu = () => { setShowMenu(true); setAssessmentType(null); setCurrentStep(0); };

  const renderCurrentStep = () => {
    if (currentStep === 0) return <IntroForm onSubmit={handleIntroSubmit} />;
    if (currentStep === 16) return <Summary assessment={assessment!} responses={responses} />;

    const questionProps = {
      onSave: (data: unknown, observations: string) => handleResponseSave(currentStep, data, observations),
      savedData: responses[currentStep]?.data,
      savedObservations: responses[currentStep]?.observations || '',
    };

    switch (currentStep) {
      case 1: return <Question1 {...questionProps} />;
      case 2: return <Question2 {...questionProps} />;
      case 3: return <Question3A {...questionProps} />;
      case 4: return <Question3B {...questionProps} />;
      case 5: return <Question4 {...questionProps} />;
      case 6: return <Question5 {...questionProps} />;
      case 7: return <Question6 {...questionProps} />;
      case 8: return <Question7 {...questionProps} />;
      case 9: return <Question8 {...questionProps} />;
      case 10: return <Question9 {...questionProps} />;
      case 11: return <Question10 {...questionProps} />;
      case 12: return <Question11 {...questionProps} />;
      case 13: return <Question12 {...questionProps} />;
      case 14: return <Question13 {...questionProps} />;
      case 15: return <Question14 {...questionProps} />;
      default: return null;
    }
  };

  if (showMenu) return <Menu onSelectType={handleMenuSelect} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header assessment={assessment} onBackToMenu={handleBackToMenu} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {renderCurrentStep()}
          {currentStep > 0 && currentStep < 16 && (
            <div className="mt-8 flex justify-between items-center">
              <button onClick={handlePrevious} disabled={currentStep === 1} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Anterior
              </button>
              <div className="text-sm text-gray-600">
                Questão {currentStep <= 4 ? currentStep : currentStep - 1} de 15
              </div>
              <button onClick={handleNext} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                {currentStep === 15 ? 'Finalizar' : 'Próxima'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Index;
