import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Home, 
  Award, 
  TrendingUp, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function StepResults({
  studentName,
  domain,
  selectedAnswers,
  onRetake,
  onBackToHome
}) {
  const [showDetailedReview, setShowDetailedReview] = useState(false);

  // Compute score
  let correctCount = 0;
  domain.questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswer) {
      correctCount += 1;
    }
  });

  const total = domain.questions.length;
  const scorePercent = Math.round((correctCount / total) * 100);

  const getEvaluationTier = (pct) => {
    if (pct >= 80) {
      return {
        label: 'Advanced Proficiency',
        badge: 'success',
        color: 'text-emerald-400',
        message: 'Outstanding performance! Demonstrates strong conceptual grasp and practical application skills.'
      };
    }
    if (pct >= 50) {
      return {
        label: 'Intermediate Competence',
        badge: 'primary',
        color: 'text-indigo-400',
        message: 'Good foundational grasp with solid core knowledge. Minor areas identified for focused improvement.'
      };
    }
    return {
      label: 'Foundational Level',
      badge: 'warning',
      color: 'text-amber-400',
      message: 'Basic familiarity established. Recommended to review core concepts and practice with hands-on exercises.'
    };
  };

  const tier = getEvaluationTier(scorePercent);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in space-y-8">
      {/* Overview Card */}
      <Card glow className="p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
        
        <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant={tier.badge}>{tier.label}</Badge>
          <Badge variant="neutral">{domain.title}</Badge>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Screening Complete for {studentName || 'Candidate'}
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
          {tier.message}
        </p>

        {/* Score Display */}
        <div className="my-8 p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 max-w-sm mx-auto">
          <div className="text-5xl sm:text-6xl font-black text-white tracking-tight bg-gradient-to-r from-indigo-300 via-indigo-100 to-white bg-clip-text text-transparent">
            {scorePercent}%
          </div>
          <div className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
            {correctCount} of {total} Questions Correct
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Button
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
            onClick={onRetake}
            icon={RotateCcw}
          >
            Retake Screening
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="w-full sm:w-auto"
            onClick={onBackToHome}
            icon={Home}
          >
            Back to Home
          </Button>
        </div>
      </Card>

      {/* Detailed Question Review Accordion */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base sm:text-lg">
              Detailed Question Review
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetailedReview(!showDetailedReview)}
            icon={showDetailedReview ? ChevronUp : ChevronDown}
          >
            {showDetailedReview ? 'Hide Details' : 'View Question Breakdown'}
          </Button>
        </div>

        {showDetailedReview && (
          <div className="mt-6 space-y-4 pt-4 border-t border-slate-800">
            {domain.questions.map((q, idx) => {
              const studentAnswer = selectedAnswers[q.id];
              const isCorrect = studentAnswer === q.correctAnswer;
              
              return (
                <div 
                  key={q.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                      <span className="text-xs text-indigo-400 font-medium">[{q.skillCategory}]</span>
                    </div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-red-400 font-semibold">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-medium text-slate-200">
                    {q.question}
                  </p>

                  <div className="text-xs space-y-1 pt-1">
                    <div className="text-slate-400">
                      Your answer: <span className={isCorrect ? 'text-emerald-300 font-medium' : 'text-red-300 font-medium'}>
                        {studentAnswer !== undefined ? q.options[studentAnswer] : 'No answer'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-400 font-medium">
                        Correct answer: {q.options[q.correctAnswer]}
                      </div>
                    )}
                    <div className="text-slate-400 pt-1 text-[11px] italic">
                      Explanation: {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
