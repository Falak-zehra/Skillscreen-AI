import React, { useState } from 'react';
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
  AlertTriangle, 
  FolderGit2, 
  ListOrdered, 
  ArrowRight, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  Zap, 
  BookOpen,
  Bot,
  Gauge,
  CheckSquare
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import AICareerAdvisor from './AICareerAdvisor';
import JobReadyScore from './JobReadyScore';
import MyProgress from './MyProgress';
import { SCREENING_QUESTIONS } from '../../data/assessmentData';
import { generateRecommendations } from '../../utils/recommendationEngine';
import { calculateJobReadyScore } from '../../utils/jobReadyScoreEngine';

export default function StepResults({
  selectedAnswers,
  onRetake,
  onBackToHome
}) {
  const [showResponseDetails, setShowResponseDetails] = useState(false);

  // Generate personalized results based strictly on the 5 answers
  const results = generateRecommendations(selectedAnswers);
  const {
    rawAnswers,
    skillLevelData,
    careerDirectionData,
    skillGaps,
    learningPath,
    projects,
    nextSteps
  } = results;

  // Calculate Job-Ready benchmark data to share with MyProgress
  const jobReadyData = calculateJobReadyScore(selectedAnswers, careerDirectionData);

  const handlePrint = () => {
    window.print();
  };

  const scrollToScore = () => {
    const el = document.getElementById('job-ready-score');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProgress = () => {
    const el = document.getElementById('my-progress');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAdvisor = () => {
    const el = document.getElementById('ai-advisor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full animate-fade-in space-y-10">
      
      {/* Top Header & Overview Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan" className="py-1 px-3">
              <Sparkles className="w-3.5 h-3.5" />
              SkillScreen AI Results Dashboard
            </Badge>
            <span className="text-xs text-slate-500 font-mono">
              Diagnostic ID: SS-{Math.abs(JSON.stringify(selectedAnswers).split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16).slice(0, 6).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Personalized Skill Assessment Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generated from your 5-point technical screening evaluation.
          </p>
        </div>

        {/* Global Dashboard Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToScore}
            icon={Gauge}
            className="text-xs text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10"
          >
            Gap Score
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToProgress}
            icon={CheckSquare}
            className="text-xs text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/10"
          >
            My Progress
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToAdvisor}
            icon={Bot}
            className="text-xs"
          >
            AI Advisor
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            icon={Printer}
            className="hidden sm:inline-flex text-xs"
          >
            Save / Print
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetake}
            icon={RotateCcw}
            className="text-xs"
          >
            Retake
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onBackToHome}
            icon={Home}
            className="text-xs"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* Hero Overview Cards (Skill Level & Career Direction) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Skill Level Card (lg:col-span-5) */}
        <Card glow className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-indigo-400" />
                Assessed Skill Level
              </span>
              <Badge variant={skillLevelData.badge} className="text-xs font-bold px-3 py-1">
                {skillLevelData.title}
              </Badge>
            </div>

            <div className="mb-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {skillLevelData.title} Level
              </h2>
              <div className="text-xs sm:text-sm font-semibold text-indigo-400 mt-1">
                {skillLevelData.tagline}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {skillLevelData.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Foundation & Problem-Solving Index</span>
              <span className="font-mono font-bold text-white">{skillLevelData.readinessScore}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                style={{ width: `${skillLevelData.readinessScore}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Problem-Solving: <strong className="text-slate-300">{rawAnswers.problemSolving}</strong></span>
              <span>Commitment: <strong className="text-slate-300">{rawAnswers.timeCommitment}</strong></span>
            </div>
          </div>
        </Card>

        {/* 2. Career Direction Card (lg:col-span-7) */}
        <Card className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                Target Career Direction
              </span>
              <Badge variant="cyan" className="text-xs px-3 py-1">
                {careerDirectionData.demand}
              </Badge>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {careerDirectionData.title}
              </h2>
              <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                Domain Specialization: <span className="text-slate-200 font-semibold">{careerDirectionData.track}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {careerDirectionData.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
              Core Industry Skills in this Track:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {careerDirectionData.primarySkills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 hover:border-slate-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Card>

      </div>
 
      {/* 1. DISTINCTIVE JOB-READY GAP SCORE FEATURE */}
      <JobReadyScore 
        selectedAnswers={selectedAnswers} 
        careerRecommendation={careerDirectionData} 
      />

      {/* 2. MY PROGRESS: INTERACTIVE SKILL TRACKER & ROADMAP PERSISTENCE */}
      <MyProgress
        selectedAnswers={selectedAnswers}
        baseJobReadyScore={jobReadyData.score}
      />

      {/* 3. AI CAREER ADVISOR FEATURE (Flagship Section) */}
      <AICareerAdvisor selectedAnswers={selectedAnswers} />

      {/* 3. Skill Gaps Section (3–5 skills they should improve) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Identified Skill Gaps
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Key competencies required to transition from your current {skillLevelData.title} stage to {careerDirectionData.title}.
            </p>
          </div>
          <Badge variant="warning">
            {skillGaps.length} Target Growth Areas
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillGaps.map((gap, idx) => (
            <Card key={idx} className="p-5 flex flex-col justify-between hover:border-amber-500/40">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-mono font-semibold text-amber-400">
                    Gap #{idx + 1} • {gap.type}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    gap.severity.includes('Critical')
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {gap.severity}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {gap.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <span className="text-slate-400 font-medium">Why it matters:</span> {gap.whyItMatters}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-xs text-indigo-300 flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Action:</strong> {gap.action}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Recommended Learning Path (Skills in logical order) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recommended Learning Path
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              A sequenced curriculum structured logically to build mastery step-by-step for {rawAnswers.timeCommitment}/week.
            </p>
          </div>
          <Badge variant="primary">
            Sequenced Roadmap
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningPath.map((stage) => (
            <Card key={stage.step} className="p-5 flex flex-col justify-between relative group hover:border-indigo-500/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold font-mono text-xs flex items-center justify-center">
                    0{stage.step}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {stage.duration}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {stage.phase}
                </h3>

                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
                  {stage.skills}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block leading-tight">
                  <strong className="text-slate-300">Milestone:</strong> {stage.milestone}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Recommended Projects (2–3 projects suitable for their level) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recommended Projects
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curated portfolio-grade builds tailored to your {skillLevelData.title} level in {careerDirectionData.track}.
            </p>
          </div>
          <Badge variant="cyan">
            {projects.length} Tailored Builds
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between hover:border-cyan-500/40">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    Project #{idx + 1}
                  </span>
                  <Badge variant="neutral" className="text-[10px]">
                    {proj.difficulty}
                  </Badge>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Recommended Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Portfolio Value:</strong> {proj.outcome}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Next Steps (Clear actions they should take) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Next Steps & Immediate Action Plan
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Clear actions tailored to your goal of &ldquo;{rawAnswers.goal}&rdquo; and commitment of {rawAnswers.timeCommitment}.
            </p>
          </div>
          <Badge variant="success">
            Action Items
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nextSteps.map((step) => (
            <Card key={step.number} className="p-5 flex flex-col justify-between hover:border-emerald-500/40">
              <div className="space-y-2.5">
                <span className="text-2xl font-black text-emerald-400/80 font-mono">
                  {step.number}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs font-semibold text-emerald-400 gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Priority Action</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Accordion: User Responses Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-white text-base">
                Your 5 Screening Responses
              </h3>
              <p className="text-xs text-slate-400">
                Responses used to generate your personalized diagnosis
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowResponseDetails(!showResponseDetails)}
            icon={showResponseDetails ? ChevronUp : ChevronDown}
          >
            {showResponseDetails ? 'Hide' : 'Review Answers'}
          </Button>
        </div>

        {showResponseDetails && (
          <div className="mt-6 space-y-3 pt-4 border-t border-slate-800">
            {SCREENING_QUESTIONS.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              const answerText = selectedIdx !== undefined ? q.options[selectedIdx] : 'None selected';

              return (
                <div 
                  key={q.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="text-xs sm:text-sm">
                    <span className="text-indigo-400 font-mono font-semibold mr-2">Q{idx + 1}.</span>
                    <span className="text-slate-300 font-medium">{q.question}</span>
                  </div>
                  <Badge variant="cyan" className="self-start sm:self-auto text-xs">
                    {answerText}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Bottom Sticky-like Action Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">
            Ready to start or adjust your screening?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            You can retake the assessment at any time or explore other tracks on SkillScreen AI.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="md"
            onClick={onRetake}
            icon={RotateCcw}
            className="w-full sm:w-auto"
          >
            Retake Assessment
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onBackToHome}
            icon={Home}
            className="w-full sm:w-auto"
          >
            Return to Home
          </Button>
        </div>
      </div>

    </div>
  );
}
