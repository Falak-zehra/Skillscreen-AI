import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Sparkles, BarChart2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProgressBar from './ProgressBar';

export default function StepQuestion({
  questionIndex,
  currentQuestion,
  totalQuestions,
  selectedAnswers,
  onSelectAnswer,
  onPrevious,
  onNext,
  onViewResults,
  onExit
}) {
  const currentAnswer = selectedAnswers[currentQuestion.id];
  const isAnswered = currentAnswer !== undefined;
  const isLastQuestion = questionIndex === totalQuestions - 1;
  const progressPercentage = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 w-full animate-fade-in space-y-6">
      {/* Top Header & Progress */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" className="py-1 px-3">
              <Sparkles className="w-3.5 h-3.5" />
              SkillScreen Assessment
            </Badge>
            <Badge variant="purple" className="py-1 px-3">
              {currentQuestion.category}
            </Badge>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Cancel & Exit
          </button>
        </div>

        {/* Progress Bar with Question X of Y */}
        <ProgressBar
          current={questionIndex + 1}
          total={totalQuestions}
          percentage={progressPercentage}
        />
      </div>

      {/* Main Question Card */}
      <Card glow className="p-6 sm:p-8">
        <div className="space-y-6">
          {/* Question Title */}
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-2">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Multiple-Choice Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, optIndex) => {
              const isSelected = currentAnswer === optIndex;
              return (
                <button
                  key={optIndex}
                  type="button"
                  onClick={() => onSelectAnswer(currentQuestion.id, optIndex)}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex-shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-medium">
                      {option}
                    </span>
                  </div>

                  <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer Navigation */}
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
                onClick={onViewResults}
                disabled={!isAnswered}
                className="bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white shadow-emerald-500/20"
                icon={BarChart2}
              >
                View My Results
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={onNext}
                disabled={!isAnswered}
                icon={ArrowRight}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
