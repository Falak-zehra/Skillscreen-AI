import React from 'react';
import { User, BookOpen, Clock, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function StepSetup({
  domains,
  selectedDomainId,
  onSelectDomain,
  studentName,
  onStudentNameChange,
  onStartAssessment,
  onBackToHome
}) {
  const currentDomain = domains.find(d => d.id === selectedDomainId) || domains[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    onStartAssessment();
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-in">
      <div className="mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <Card glow className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="cyan">Step 1 of 3</Badge>
          <Badge variant="neutral">Screening Setup</Badge>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Assessment Candidate Profile
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Set up candidate details and confirm the target skill track before beginning the screening.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Name */}
          <div>
            <label htmlFor="student-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Student / Candidate Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="student-name"
                type="text"
                required
                value={studentName}
                onChange={(e) => onStudentNameChange(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Track Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Track
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {domains.map((dom) => {
                const isSelected = dom.id === selectedDomainId;
                return (
                  <button
                    key={dom.id}
                    type="button"
                    onClick={() => onSelectDomain(dom.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{dom.title.split('&')[0]}</div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {dom.duration}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Screening Instructions Brief */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="font-semibold text-white flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <AlertCircle className="w-4 h-4 text-indigo-400" />
              Screening Guidelines:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
              <li>{currentDomain.totalQuestions} multiple-choice scenario problems.</li>
              <li>Estimated completion time: ~{currentDomain.duration}.</li>
              <li>Instant AI grading breakdown immediately after submission.</li>
              <li>No external APIs or login credentials needed.</li>
            </ul>
          </div>

          {/* Action */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-base font-semibold"
              icon={ArrowRight}
            >
              Begin Screening Test
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
