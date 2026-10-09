import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Award, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  BookOpen, 
  Clock, 
  CheckSquare, 
  ListFilter,
  Zap,
  Target,
  Trophy
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { getRoadmapSkills } from '../../utils/roadmapSkills';
import { SCREENING_QUESTIONS } from '../../data/assessmentData';
import { getSavedCompletedSkills, saveCompletedSkills } from '../../utils/storage';

export default function MyProgress({ selectedAnswers, baseJobReadyScore = 65 }) {
  const interest = SCREENING_QUESTIONS[1].options[selectedAnswers?.[1]] || 'Web Development';

  const skills = getRoadmapSkills(selectedAnswers);
  const totalSkills = skills.length;

  // Local storage initialization for completed skill IDs
  const [completedIds, setCompletedIds] = useState(() => {
    return getSavedCompletedSkills(interest);
  });

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'remaining' | 'completed'

  // Synchronize when interest track changes
  useEffect(() => {
    const loaded = getSavedCompletedSkills(interest);
    setCompletedIds(loaded);
  }, [interest]);

  // Persist to localStorage whenever completedIds change
  useEffect(() => {
    saveCompletedSkills(interest, completedIds);
  }, [completedIds, interest]);

  // Calculations
  const completedCount = completedIds.length;
  const remainingCount = Math.max(0, totalSkills - completedCount);
  const progressPercentage = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

  // Connected dynamic Job-Ready Score boost
  // Each completed skill adds ~2.5 to 3 points towards the remaining gap to 100
  const maxPossibleGain = 100 - baseJobReadyScore;
  const scoreBoost = Math.round((completedCount / totalSkills) * maxPossibleGain);
  const currentBoostedScore = Math.min(100, baseJobReadyScore + scoreBoost);

  // Identify "Next Skill to Learn" (the first uncompleted skill in the sequence)
  const nextSkillToLearn = skills.find(s => !completedIds.includes(s.id));

  const toggleSkill = (skillId) => {
    setCompletedIds(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your tracked progress for this roadmap?')) {
      setCompletedIds([]);
    }
  };

  // Filtered skills view
  const filteredSkills = skills.filter(skill => {
    const isCompleted = completedIds.includes(skill.id);
    if (activeFilter === 'completed') return isCompleted;
    if (activeFilter === 'remaining') return !isCompleted;
    return true;
  });

  return (
    <section id="my-progress" className="space-y-6 pt-4 border-t border-slate-800/80">
      
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan" className="py-1 px-3">
              <CheckSquare className="w-3.5 h-3.5" />
              Interactive Skill Tracker
            </Badge>
            <Badge variant="primary" className="py-1 px-3">
              Locally Saved
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Progress: Personalized Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Check off skills as you master them to track roadmap completion and boost your Job-Ready Gap Score.
          </p>
        </div>

        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetProgress}
            icon={RotateCcw}
            className="text-xs text-slate-400 hover:text-red-400 self-start sm:self-auto"
          >
            Reset Progress
          </Button>
        )}
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Progress Percentage Card */}
        <Card glow className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Roadmap Progress
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {completedCount} / {totalSkills} Skills
            </span>
          </div>

          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {progressPercentage}%
            </div>
            <span className="text-xs text-slate-400">
              of your {interest} curriculum completed
            </span>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-[1.5px]">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </Card>

        {/* Completed Skills Metric */}
        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Completed Skills
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono">
              {completedCount}
            </div>
            <span className="text-xs text-slate-400">
              verified competencies mastered
            </span>
          </div>

          <div className="text-xs text-emerald-300 font-medium">
            {progressPercentage === 100 ? '🎉 All Skills Completed!' : `${remainingCount} skills remaining`}
          </div>
        </Card>

        {/* Remaining Skills Metric */}
        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Remaining to Learn
            </span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>

          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">
              {remainingCount}
            </div>
            <span className="text-xs text-slate-400">
              milestones left on your roadmap
            </span>
          </div>

          <div className="text-xs text-slate-400">
            Estimated effort: ~{remainingCount * 12} study hours
          </div>
        </Card>

        {/* Connected Job-Ready Gap Score Boost */}
        <Card glow className="p-5 flex flex-col justify-between border-cyan-500/30 bg-gradient-to-br from-slate-900 to-indigo-950/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Updated Gap Score
            </span>
            <Badge variant="success" className="text-[10px]">
              +{scoreBoost} Boost
            </Badge>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {currentBoostedScore}
              </span>
              <span className="text-lg text-slate-500 font-bold">/100</span>
            </div>
            <span className="text-xs text-slate-300">
              Base: {baseJobReadyScore} • Live with progress
            </span>
          </div>

          <div className="text-xs text-cyan-300 font-medium flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Score dynamically updates</span>
          </div>
        </Card>

      </div>

      {/* "Next Skill to Learn" Recommendation Banner */}
      {nextSkillToLearn ? (
        <Card glow className="p-6 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/40 border-indigo-500/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" className="py-0.5 text-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Next Skill to Learn
                </Badge>
                <Badge variant="neutral" className="py-0.5 text-xs">
                  {nextSkillToLearn.phase}
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  Est. {nextSkillToLearn.estimatedHours}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                {nextSkillToLearn.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {nextSkillToLearn.description}
              </p>
            </div>

            <div className="flex-shrink-0 self-start md:self-center">
              <Button
                variant="primary"
                size="md"
                onClick={() => toggleSkill(nextSkillToLearn.id)}
                icon={CheckCircle2}
                className="text-xs sm:text-sm"
              >
                Mark as Completed
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card glow className="p-6 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 border-emerald-500/50 text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-1">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-white">
            Roadmap 100% Completed!
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            You have mastered all 10 core skills on your personalized {interest} roadmap. Your Job-Ready Gap Score is at peak hiring competitiveness!
          </p>
        </Card>
      )}

      {/* Filter Tabs & Skills Checklist */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Recommended Skills Checklist ({skills.length})
            </h3>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              All ({totalSkills})
            </button>
            <button
              onClick={() => setActiveFilter('remaining')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'remaining'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Remaining ({remainingCount})
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'completed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {/* Skill Items List */}
        <div className="space-y-3">
          {filteredSkills.map((skill, idx) => {
            const isCompleted = completedIds.includes(skill.id);
            const originalIndex = skills.findIndex(s => s.id === skill.id) + 1;

            return (
              <div
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-slate-950/60 border-emerald-500/40 shadow-sm shadow-emerald-500/5'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  {/* Checkbox Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSkill(skill.id);
                    }}
                    className="mt-0.5 sm:mt-0 flex-shrink-0 cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 transition-transform active:scale-90" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400 transition-colors" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        #{originalIndex < 10 ? `0${originalIndex}` : originalIndex}
                      </span>
                      <Badge variant="neutral" className="text-[10px]">
                        {skill.phase}
                      </Badge>
                      <span className="text-xs text-slate-400 font-mono">
                        [{skill.category}]
                      </span>
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                      isCompleted ? 'text-slate-400 line-through' : 'text-white'
                    }`}>
                      {skill.name}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Right Action Button & Time Pill */}
                <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80 w-full sm:w-auto">
                  <span className="text-xs font-mono text-slate-500">
                    {skill.estimatedHours}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSkill(skill.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-500'
                    }`}
                  >
                    {isCompleted ? 'Completed ✓' : 'Mark as Done'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
