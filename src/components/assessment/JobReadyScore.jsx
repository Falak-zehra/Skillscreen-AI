import React from 'react';
import { 
  Gauge, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Lightbulb, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Sparkles,
  Zap,
  ShieldCheck,
  Compass
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { calculateJobReadyScore } from '../../utils/jobReadyScoreEngine';

export default function JobReadyScore({ selectedAnswers, careerRecommendation }) {
  const data = calculateJobReadyScore(selectedAnswers, careerRecommendation);
  const {
    score,
    tier,
    tierBadge,
    tierDescription,
    skillsYouHave,
    skillsToImprove,
    criticalGaps,
    whyTheseSkillsMatter,
    recommendedNextAction
  } = data;

  return (
    <section id="job-ready-score" className="space-y-6 pt-4 border-t border-slate-800/80">
      
      {/* Feature Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan" className="py-1 px-3">
              <Gauge className="w-3.5 h-3.5" />
              Benchmark Metric
            </Badge>
            <Badge variant={tierBadge} className="py-1 px-3">
              {tier}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Job-Ready Gap Score
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Objective readiness benchmark calibrated against real technical hiring thresholds.
          </p>
        </div>
      </div>

      {/* 1. Job-Ready Score Hero Card */}
      <Card glow className="p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-indigo-500/40 shadow-2xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Prominent Score Number Display */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Current Benchmark
            </span>
            
            <div className="flex items-baseline justify-center gap-1 my-1">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-300 to-white bg-clip-text text-transparent">
                {score}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-500">
                /100
              </span>
            </div>

            <div className="mt-2">
              <Badge variant={tierBadge} className="text-xs font-semibold px-3 py-1">
                {tier}
              </Badge>
            </div>
          </div>

          {/* Explanation & Progress Meter */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Hiring Readiness Diagnostic
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {tierDescription}
              </p>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>0 (Foundational)</span>
                <span className="text-indigo-300 font-bold">{score}% Ready</span>
                <span>100 (Hired)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 p-[1.5px]">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span>Entry Barrier: 65+</span>
                <span>Competitive Sweetspot: 80+</span>
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* 2 & 3: Skills You Have & Skills to Improve Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 2. Skills You Have */}
        <Card className="p-6 space-y-4 border-emerald-500/30 hover:border-emerald-500/50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Skills You Have
              </h3>
            </div>
            <Badge variant="success" className="text-[11px]">
              Validated Strengths
            </Badge>
          </div>

          <p className="text-xs text-slate-400">
            Competencies, behaviors, and strengths inferred from your current screening responses:
          </p>

          <div className="space-y-2.5 pt-1">
            {skillsYouHave.map((skill, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 3. Skills to Improve */}
        <Card className="p-6 space-y-4 border-amber-500/30 hover:border-amber-500/50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Skills to Improve
              </h3>
            </div>
            <Badge variant="warning" className="text-[11px]">
              Target Horizons
            </Badge>
          </div>

          <p className="text-xs text-slate-400">
            The most impactful missing capabilities separating your current score from full job-readiness:
          </p>

          <div className="space-y-2.5 pt-1">
            {skillsToImprove.map((skill, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3"
              >
                <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] text-amber-400 font-bold font-mono">0{idx + 1}</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* 4. Critical Skill Gaps (Top 2-3 to learn first) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Critical Skill Gaps (Top Priority)
            </h3>
          </div>
          <Badge variant="neutral" className="text-xs">
            Learn These First
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {criticalGaps.map((gap, idx) => (
            <Card key={idx} className="p-5 flex flex-col justify-between border-red-500/30 bg-gradient-to-b from-slate-900 to-slate-950 hover:border-red-500/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-400">
                    {gap.priority}
                  </span>
                  <Badge variant="warning" className="text-[10px] px-2 py-0.5">
                    {gap.badge}
                  </Badge>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {gap.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Target Focus:</span>
                <span className="font-mono text-indigo-300 font-semibold">{gap.timeframe}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Why These Skills Matter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Why These Skills Matter
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whyTheseSkillsMatter.map((item, idx) => (
            <Card key={idx} className="p-5 space-y-3 bg-slate-900/60 border-slate-800 hover:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold font-mono text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {item.skill}
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.whyItMatters}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. Recommended Next Action */}
      <Card glow className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-indigo-500/50 shadow-xl shadow-indigo-500/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" className="py-0.5 text-xs">
                <Zap className="w-3.5 h-3.5" />
                Recommended Next Action
              </Badge>
              <Badge variant="success" className="py-0.5 text-xs">
                {recommendedNextAction.expectedScoreBoost}
              </Badge>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {recommendedNextAction.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {recommendedNextAction.action}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span>Timeframe: <strong className="text-indigo-300">{recommendedNextAction.timeline}</strong></span>
              <span>•</span>
              <span>Primary Competency: <strong className="text-cyan-300">{recommendedNextAction.targetSkill}</strong></span>
            </div>
          </div>

          <div className="flex-shrink-0 self-start md:self-center">
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Estimated Lift
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block mt-0.5">
                {recommendedNextAction.expectedScoreBoost.split(' ')[0]}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Upon project completion
              </span>
            </div>
          </div>

        </div>
      </Card>

    </section>
  );
}
