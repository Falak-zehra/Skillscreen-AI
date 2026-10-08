import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  FolderGit2, 
  Layers, 
  Wrench, 
  Clock, 
  Award, 
  ChevronRight, 
  ExternalLink,
  Target,
  Cpu,
  RefreshCw
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { generateAICareerAdvice } from '../../services/aiAdvisorService';

export default function AICareerAdvisor({ selectedAnswers }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'roadmap' | 'projects' | 'tech'

  const fetchAdvice = async (forceFail = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateAICareerAdvice(selectedAnswers, { forceFail });
      setAdvice(data);
    } catch (err) {
      console.error('AI Career Advisor generation error:', err);
      setError(err.message || 'Unable to generate AI recommendations at this time.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [selectedAnswers]);

  // Loading View
  if (loading) {
    return (
      <Card glow className="p-8 sm:p-12 text-center relative overflow-hidden border-indigo-500/30">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 animate-pulse" />
        
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative inline-flex">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-bounce">
              <Bot className="w-8 h-8" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              AI Career Advisor is Generating Your Report...
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Synthesizing your 5 screening answers, evaluating industry demand vectors, and engineering your 30-day curriculum.
            </p>
          </div>

          {/* Skeleton Shimmer Bars */}
          <div className="space-y-3 pt-2">
            <div className="h-3 bg-slate-800/80 rounded-full animate-pulse w-3/4 mx-auto" />
            <div className="h-3 bg-slate-800/60 rounded-full animate-pulse w-1/2 mx-auto" />
            <div className="h-3 bg-slate-800/40 rounded-full animate-pulse w-2/3 mx-auto" />
          </div>
        </div>
      </Card>
    );
  }

  // Friendly Error State
  if (error) {
    return (
      <Card className="p-8 sm:p-10 border-red-500/30 bg-red-950/10 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="max-w-md mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            AI Advisory Generation Interrupted
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {error}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => fetchAdvice(false)}
            icon={RefreshCw}
          >
            Retry AI Analysis
          </Button>
        </div>
      </Card>
    );
  }

  if (!advice) return null;

  const {
    careerRecommendation,
    skillAssessment,
    skillGaps,
    roadmap30Days,
    projectRecommendations,
    recommendedTechnologies,
    metadata
  } = advice;

  return (
    <section id="ai-advisor" className="space-y-6 pt-4 border-t border-slate-800/80">
      
      {/* Advisor Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 border border-indigo-500/30 shadow-xl shadow-indigo-500/5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1.5px] flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                AI Career Advisor
              </h2>
              <Badge variant="cyan" className="py-0.5 text-[11px]">
                <Sparkles className="w-3 h-3" />
                Intelligent Assessment
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized career strategy synthesized directly from your screening answers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fetchAdvice(false)}
            icon={RefreshCw}
          >
            Regenerate AI Analysis
          </Button>
        </div>
      </div>

      {/* Navigation Tabs for clean dashboard viewing */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Career & Skill Assessment</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'roadmap'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>30-Day Learning Roadmap & Gaps</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>3 Recommended Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('tech')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'tech'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Recommended Technologies</span>
        </button>
      </div>

      {/* TAB 1: CAREER & SKILL ASSESSMENT */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Career Recommendation Card */}
            <Card glow className="lg:col-span-7 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  Primary Career Recommendation
                </span>
                <Badge variant="success">
                  {careerRecommendation.matchScore}% Match Index
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {careerRecommendation.roleTitle}
                </h3>
                <div className="text-xs font-semibold text-cyan-400 mt-1">
                  Market Outlook: {careerRecommendation.industryOutlook}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {careerRecommendation.executiveSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Typical Compensation Range
                  </span>
                  <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                    {careerRecommendation.salaryRange}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Target Hiring Ecosystem
                  </span>
                  <span className="text-xs font-medium text-slate-300 mt-0.5 block truncate">
                    {careerRecommendation.targetCompanies.join(', ')}
                  </span>
                </div>
              </div>
            </Card>

            {/* Current Skill Assessment Card */}
            <Card className="lg:col-span-5 p-6 sm:p-7 space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-cyan-400" />
                    Current Skill Assessment
                  </span>
                  <Badge variant="primary">
                    Maturity: {skillAssessment.readinessScore}%
                  </Badge>
                </div>

                <h4 className="text-lg font-bold text-white mt-3">
                  {skillAssessment.maturityLevel}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  {skillAssessment.assessmentVerdict}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1.5">
                    Demonstrated Profile Strengths:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {skillAssessment.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1.5">
                    Watchouts / Potential Pitfalls:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {skillAssessment.potentialPitfalls.map((pit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{pit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

          </div>
        </div>
      )}

      {/* TAB 2: 30-DAY ROADMAP & SKILL GAPS */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Skill Gaps Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  AI-Identified Skill Gaps & Bridges
                </h3>
                <p className="text-xs text-slate-400">
                  Critical blind spots to resolve before applying for {careerRecommendation.roleTitle} positions.
                </p>
              </div>
              <Badge variant="warning">{skillGaps.length} Target Gaps</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skillGaps.map((gap, idx) => (
                <Card key={idx} className="p-5 flex flex-col justify-between hover:border-amber-500/40">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        {gap.category}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {gap.priority} Priority
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {gap.skill}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-400">Impact:</strong> {gap.impact}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-indigo-300">
                    <strong>Solution:</strong> {gap.solution}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 30-Day Learning Roadmap */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  30-Day Learning Roadmap
                </h3>
                <p className="text-xs text-slate-400">
                  Sequenced day-by-day progression designed to eliminate your skill gaps in 4 weeks.
                </p>
              </div>
              <Badge variant="primary">4-Week Structured Sprint</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roadmap30Days.map((week) => (
                <Card key={week.weekNumber} className="p-5 flex flex-col justify-between hover:border-indigo-500/50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold font-mono text-xs flex items-center justify-center">
                        W{week.weekNumber}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        Days {(week.weekNumber - 1) * 7 + 1}–{week.weekNumber * 7 + (week.weekNumber === 4 ? 2 : 0)}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {week.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {week.focus}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Weekly Tasks:
                      </span>
                      {week.dailyTasks.map((task, tIdx) => (
                        <div key={tIdx} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                          <span className="text-indigo-400">•</span>
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-emerald-400 block font-medium">
                      🎯 Milestone: <span className="text-slate-300">{week.milestone}</span>
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: 3 PROJECT RECOMMENDATIONS */}
      {activeTab === 'projects' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                3 AI-Curated Portfolio Projects
              </h3>
              <p className="text-xs text-slate-400">
                Designed to prove real capability and provide compelling talking points for interviews.
              </p>
            </div>
            <Badge variant="cyan">3 Differentiated Builds</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectRecommendations.map((project, idx) => (
              <Card key={project.id} className="p-6 flex flex-col justify-between hover:border-cyan-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" className="text-[10px]">
                      {project.badge}
                    </Badge>
                    <span className="text-xs font-mono text-slate-500">
                      Difficulty: {project.difficulty}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {project.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-400">Problem:</strong> {project.problemStatement}
                  </p>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Key Capabilities Built:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {project.keyFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Tech Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block leading-relaxed">
                    <strong className="text-slate-300">Resume Bullet:</strong> &ldquo;{project.resumeBullet}&rdquo;
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RECOMMENDED TECHNOLOGIES */}
      {activeTab === 'tech' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Recommended Technologies to Learn
              </h3>
              <p className="text-xs text-slate-400">
                Curated stack components aligned with {careerRecommendation.roleTitle} expectations.
              </p>
            </div>
            <Badge variant="purple">Stack Blueprint</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedTechnologies.map((group, idx) => (
              <Card key={idx} className="p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Wrench className="w-4 h-4 text-purple-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    {group.category}
                  </h4>
                </div>

                <div className="space-y-3">
                  {group.technologies.map((item, tIdx) => (
                    <div key={tIdx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-100 font-mono">
                          {item.name}
                        </span>
                        <Badge variant="neutral" className="text-[10px]">
                          {item.level}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info Pill */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>Engine: {metadata.source}</span>
          <span>•</span>
          <span>Generated: {new Date(metadata.generatedAt).toLocaleTimeString()}</span>
        </div>
        <div>
          <span>Zero external API keys exposed • Client-safe sandbox architecture</span>
        </div>
      </div>

    </section>
  );
}
