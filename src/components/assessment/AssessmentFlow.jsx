import React, { useState } from 'react';
import StepQuestion from './StepQuestion';
import StepResults from './StepResults';
import { SCREENING_QUESTIONS } from '../../data/assessmentData';

export default function AssessmentFlow({ onExit }) {
  const [currentStep, setCurrentStep] = useState('question'); // 'question' | 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const totalQuestions = SCREENING_QUESTIONS.length; // exactly 5
  const currentQuestion = SCREENING_QUESTIONS[currentQuestionIndex];

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
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCurrentStep('question');
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
        />
      )}
    </div>
  );
}
