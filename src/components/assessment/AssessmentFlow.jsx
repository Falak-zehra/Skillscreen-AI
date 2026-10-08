import React, { useState, useEffect } from 'react';
import StepSetup from './StepSetup';
import StepQuestion from './StepQuestion';
import StepResults from './StepResults';
import { DOMAINS } from '../../data/assessmentData';

export default function AssessmentFlow({ initialDomainId = 'frontend', onExit }) {
  const [currentStep, setCurrentStep] = useState('setup'); // 'setup' | 'question' | 'results'
  const [selectedDomainId, setSelectedDomainId] = useState(initialDomainId);
  const [studentName, setStudentName] = useState('Alex Rivers');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

  const currentDomain = DOMAINS.find(d => d.id === selectedDomainId) || DOMAINS[0];
  const questions = currentDomain.questions;
  const currentQuestion = questions[currentQuestionIndex];

  // Timer countdown while taking the assessment
  useEffect(() => {
    let timer;
    if (currentStep === 'question' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCurrentStep('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, timeLeft]);

  const handleStartAssessment = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setCurrentStep('question');
  };

  const handleSelectAnswer = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setCurrentStep('results');
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(300);
    setCurrentStep('question');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      {currentStep === 'setup' && (
        <StepSetup
          domains={DOMAINS}
          selectedDomainId={selectedDomainId}
          onSelectDomain={setSelectedDomainId}
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onStartAssessment={handleStartAssessment}
          onBackToHome={onExit}
        />
      )}

      {currentStep === 'question' && (
        <StepQuestion
          domain={currentDomain}
          questionIndex={currentQuestionIndex}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswers={selectedAnswers}
          onSelectAnswer={handleSelectAnswer}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          timeLeft={timeLeft}
        />
      )}

      {currentStep === 'results' && (
        <StepResults
          studentName={studentName}
          domain={currentDomain}
          selectedAnswers={selectedAnswers}
          onRetake={handleRetake}
          onBackToHome={onExit}
        />
      )}
    </div>
  );
}
