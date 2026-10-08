import React from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Clock, 
  Target, 
  Code2, 
  Layers,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { SCREENING_QUESTIONS } from '../../data/assessmentData';

export default function StepResults({
  selectedAnswers,
  onRetake,
  onBackToHome
}) {
  // Extract user selections
  const q1Answer = SCREENING_QUESTIONS[0].options[selectedAnswers[1]] || 'Not specified';
  const q2Answer = SCREENING_QUESTIONS[1].options[selectedAnswers[2]] || 'Not specified';
  const q3Answer = SCREENING_QUESTIONS[2].options[selectedAnswers[3]] || 'Not specified';
  const q4Answer = SCREENING_QUESTIONS[3].options[selectedAnswers[4]] || 'Not specified';
  const q5Answer = SCREENING_QUESTIONS[4].options[selectedAnswers[5]] || 'Not specified';

  // Compute profile insights
  const getProfileInsight = () => {
    let tier = 'Aspiring Developer';
    let badgeVariant = 'primary';

    if (q1Answer === 'Advanced' || q3Answer === 'Very comfortable') {
      tier = 'Advanced Practitioner';
      badgeVariant = 'success';
    } else if (q1Answer === 'Intermediate' || q3Answer === 'Comfortable') {
      tier = 'Proficient Builder';
      badgeVariant = 'cyan';
    } else if (q1Answer === 'Basic' || q3Answer === 'Somewhat comfortable') {
      tier = 'Developing Learner';
      badgeVariant = 'purple';
    } else {
      tier = 'Emerging Explorer';
      badgeVariant = 'warning';
    }

    return { tier, badgeVariant };
  };

  const profile = getProfileInsight();

  // Curate recommendations based on interest and goal
  const getRecommendations = () => {
    const list = [];

    // Domain recommendation
    if (q2Answer === 'Web Development') {
      list.push({
        title: 'Modern Web Stack Focus',
        desc: 'Master component-driven architecture with React, Next.js, and modern API integration.'
      });
    } else if (q2Answer === 'AI/ML') {
      list.push({
        title: 'Machine Learning Foundations',
        desc: 'Focus on Python, prompt engineering, data pipelines, and Hugging Face / LangChain integration.'
      });
    } else if (q2Answer === 'Data Science') {
      list.push({
        title: 'Data Analytics & Modeling',
        desc: 'Strengthen Pandas, SQL, exploratory data analysis, and predictive statistical algorithms.'
      });
    } else {
      list.push({
        title: 'Cross-Platform App Architecture',
        desc: 'Build native-feel apps using React Native or Flutter with robust state and offline storage.'
      });
    }

    // Time & goal recommendation
    if (q5Answer === 'Get a job' || q5Answer === 'Get an internship') {
      list.push({
        title: 'Portfolio & Interview Readiness',
        desc: 'Develop 2 flagship production projects with live demos and practice targeted technical whiteboard problems.'
      });
    } else if (q5Answer === 'Build projects') {
      list.push({
        title: 'Ship Product MVPs',
        desc: 'Focus on end-to-end prototyping, user feedback cycles, and deploying full functional apps.'
      });
    } else {
      list.push({
        title: 'Academic & Algorithmic Foundations',
        desc: 'Deepen understanding of core computer science fundamentals, system design, and formal research concepts.'
      });
    }

    return list;
  };

  const recommendations = getRecommendations();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 w-full animate-fade-in space-y-8">
      {/* Top Banner Card */}
      <Card glow className="p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-2 bg-gradient-to-r from-emerald-400 via-indigo-500 to-violet-500" />
        
        <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
          <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <Badge variant={profile.badgeVariant}>{profile.tier}</Badge>
          <Badge variant="cyan">{q2Answer}</Badge>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Skill Screening Profile
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
          Assessment complete! SkillScreen AI has evaluated your technical background, interest domain, and timeline goals.
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-8 text-left">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Skill Level
            </span>
            <span className="text-sm sm:text-base font-bold text-white mt-1 block">
              {q1Answer}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Target Track
            </span>
            <span className="text-sm sm:text-base font-bold text-indigo-300 mt-1 block">
              {q2Answer}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Problem Solving
            </span>
            <span className="text-sm sm:text-base font-bold text-emerald-300 mt-1 block">
              {q3Answer}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Weekly Time
            </span>
            <span className="text-sm sm:text-base font-bold text-cyan-300 mt-1 block">
              {q4Answer}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onRetake}
            icon={RotateCcw}
            className="w-full sm:w-auto"
          >
            Retake Screening
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={onBackToHome}
            icon={Home}
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
        </div>
      </Card>

      {/* Answer Breakdown */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">
            Recorded Screening Responses (5 of 5)
          </h3>
        </div>

        <div className="space-y-4">
          {SCREENING_QUESTIONS.map((question, idx) => {
            const answerIndex = selectedAnswers[question.id];
            const answerText = answerIndex !== undefined ? question.options[answerIndex] : 'Not answered';

            return (
              <div 
                key={question.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-indigo-400">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs text-slate-500">
                      [{question.category}]
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-200">
                    {question.question}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    {answerText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI Tailored Recommendations */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">
            Tailored AI Growth Pathways
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                Path {i + 1}
              </span>
              <h4 className="text-sm font-bold text-white">
                {rec.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {rec.desc}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
