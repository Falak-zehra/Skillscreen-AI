import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProgressBar from './ProgressBar';

export default function StepQuestion({
  domain,
  questionIndex,
  currentQuestion,
  totalQuestions,
  selectedAnswers,
  onSelectAnswer,
  onPrevious,
  onNext,
  onSubmit,
  timeLeft
}) {
  const currentAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = currentAnswer !== undefined;
  const isLastQuestion = questionIndex === totalQuestions - 1;
  const percentage = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in space-y-6">
      {/* Top Bar with Domain & Progress */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="cyan">{domain.title}</Badge>
          <Badge variant="purple">{currentQuestion.skillCategory}</Badge>
        </div>

        <ProgressBar
          current={questionIndex + 1}
          total={totalQuestions}
          percentage={percentage}
          timeLeft={timeLeft}
        />
      </div>

      {/* Main Question Card */}
      <Card glow className="p-6 sm:p-8">
        <div className="space-y-6">
          {/* Question Text */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Question {questionIndex + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, optIndex) => {
              const isSelected = currentAnswer === optIndex;
              return (
                <button
                  key={optIndex}
                  type="button"
                  onClick={() => onSelectAnswer(currentQuestion.id, optIndex)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                  <div className="text-sm sm:text-base leading-snug">
                    <span className="font-semibold mr-2 text-slate-400">
                      {String.fromCharCode(65 + optIndex)}.
                    </span>
                    {opt}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
            <Button
              variant="ghost"
              size="md"
              onClick={onPrevious}
              disabled={questionIndex === 0}
              icon={ArrowLeft}
            >
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                variant="primary"
                size="md"
                onClick={onSubmit}
                disabled={!isAnswered}
                className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
                icon={CheckCircle2}
              >
                Finish & View Results
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={onNext}
                disabled={!isAnswered}
                icon={ArrowRight}
              >
                Next Question
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
