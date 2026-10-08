import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Layout, 
  Database, 
  Code, 
  ArrowRight,
  Clock,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { DOMAINS, KEY_FEATURES } from '../data/assessmentData';

const featureIconMap = {
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  BarChart3: BarChart3,
  Cpu: Cpu
};

const domainIconMap = {
  Layout: Layout,
  Database: Database,
  Code: Code
};

export default function Features({ onSelectDomain }) {
  return (
    <div className="space-y-24 py-12">
      {/* Domains Selection Section */}
      <section id="domains" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="purple" className="mb-3">
            Available Assessment Tracks
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Select a Track to Screen
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Each track is designed with real-world scenarios to gauge technical depth and conceptual foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOMAINS.map((domain) => {
            const Icon = domainIconMap[domain.icon] || Code;
            return (
              <Card 
                key={domain.id} 
                className="flex flex-col justify-between group hover:border-indigo-500/50"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="neutral">{domain.difficulty}</Badge>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      {domain.totalQuestions} Questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      ~{domain.duration}
                    </span>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-between group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all"
                    onClick={() => onSelectDomain(domain.id)}
                  >
                    <span>Start This Track</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="cyan" className="mb-3">
              Screening Features
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Designed for High-Signal Student Evaluation
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Replace subjective interviews with structured diagnostic assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_FEATURES.map((feat, idx) => {
              const Icon = featureIconMap[feat.icon] || Sparkles;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
