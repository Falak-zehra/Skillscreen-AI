import React, { useState, useEffect } from 'react';
import StepQuestion from './StepQuestion';
import StepResults from './StepResults';
import { SCREENING_QUESTIONS } from '../../data/assessmentData';
import { saveScreeningData, getSavedScreeningData, saveViewState } from '../../utils/storage';

export default function AssessmentFlow({ onExit, initialSection }) {
  const saved = getSavedScreeningData();
  
  const [currentStep, setCurrentStep] = useState(saved?.currentStep || 'question'); // 'question' | 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(saved?.currentQuestionIndex || 0);
  const [selectedAnswers, setSelectedAnswers] = useState(saved?.selectedAnswers || {});

  const totalQuestions = SCREENING_QUESTIONS.length; // exactly 5
  const currentQuestion = SCREENING_QUESTIONS[currentQuestionIndex] || SCREENING_QUESTIONS[0];

  // Persist screening data whenever answers, step, or question index changes
  useEffect(() => {
    saveScreeningData({
      currentStep,
      currentQuestionIndex,
      selectedAnswers
    });
  }, [currentStep, currentQuestionIndex, selectedAnswers]);

  const handleSelectAnswer = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleViewResults = () => {
    setCurrentStep('results');
    saveScreeningData({
      currentStep: 'results',
      currentQuestionIndex,
      selectedAnswers
    });
    saveViewState({
      view: 'assessment',
      activeSection: 'results'
    });
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCurrentStep('question');
    saveScreeningData({
      currentStep: 'question',
      currentQuestionIndex: 0,
      selectedAnswers: {}
    });
    saveViewState({
      view: 'assessment',
      activeSection: null
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6">
      {currentStep === 'question' ? (
        <StepQuestion
          questionIndex={currentQuestionIndex}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          selectedAnswers={selectedAnswers}
          onSelectAnswer={handleSelectAnswer}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onViewResults={handleViewResults}
          onExit={onExit}
        />
      ) : (
        <StepResults
          selectedAnswers={selectedAnswers}
          onRetake={handleRetake}
          onBackToHome={onExit}
          initialSection={initialSection}
        />
      )}
    </div>
  );
}
