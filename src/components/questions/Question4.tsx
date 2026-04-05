import { useState, useEffect } from 'react';
import { Question4A } from './Question4A';
import { Question4B } from './Question4B';
import { Question4C } from './Question4C';

interface Question4Props {
  onSave: (data: unknown, observations: string) => void;
  savedData?: unknown;
  savedObservations: string;
}

interface Question4AllData {
  sentence1?: string;
  sentence2?: string;
  sentence3?: string;
}

export function Question4({ onSave, savedData, savedObservations }: Question4Props) {
  const [currentScreen, setCurrentScreen] = useState<'4A' | '4B' | '4C'>('4A');
  const [allData, setAllData] = useState<Question4AllData>({
    sentence1: '',
    sentence2: '',
    sentence3: '',
  });

  useEffect(() => {
    if (savedData && typeof savedData === 'object') {
      setAllData(savedData as Question4AllData);
    }
  }, [savedData]);

  const handleSaveA = (data: { sentence1: string }) => {
    setAllData(prev => ({ ...prev, sentence1: data.sentence1 }));
  };

  const handleSaveB = (data: { sentence2: string }) => {
    setAllData(prev => ({ ...prev, sentence2: data.sentence2 }));
  };

  const handleSaveC = (data: { sentence1: string; sentence2: string; sentence3: string }, observations: string) => {
    setAllData(prev => ({ ...prev, sentence3: data.sentence3 }));
    onSave(allData, observations);
  };

  const handleNextFromA = () => {
    setCurrentScreen('4B');
  };

  const handleNextFromB = () => {
    setCurrentScreen('4C');
  };

  const handleBackFromB = () => {
    setCurrentScreen('4A');
  };

  const handleBackFromC = () => {
    setCurrentScreen('4B');
  };

  return (
    <>
      {currentScreen === '4A' && (
        <Question4A
          onSave={handleSaveA}
          onNext={handleNextFromA}
          savedData={allData}
        />
      )}
      {currentScreen === '4B' && (
        <Question4B
          onSave={handleSaveB}
          onNext={handleNextFromB}
          onBack={handleBackFromB}
          savedData={allData}
        />
      )}
      {currentScreen === '4C' && (
        <Question4C
          onSave={handleSaveC}
          onBack={handleBackFromC}
          allData={allData}
          savedObservations={savedObservations}
        />
      )}
    </>
  );
}
