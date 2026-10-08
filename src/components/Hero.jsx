import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Shield, Zap, Laptop } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { PLATFORM_STATS } from '../data/assessmentData';

export default function Hero({ onStartScreening }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] sm:w-[700px] sm:h-[450px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
          <Badge variant="cyan" className="py-1 px-3.5 text-xs sm:text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Student Skill Screening
          </Badge>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            SkillScreen AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed mb-10">
          The next-generation frontend assessment engine for technical students. 
          Evaluate core fundamentals, problem solving, and framework mastery with instant, objective skill diagnostics.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <Button
            size="lg"
            variant="primary"
            onClick={onStartScreening}
            className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 shadow-indigo-600/30"
            icon={ArrowRight}
          >
            Start Screening
          </Button>
          <a
            href="#domains"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/50"
          >
            Explore Tracks
          </a>
        </div>

        {/* Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-400 mb-16">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Interactive Multi-track Testing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Instant Skill Breakdown</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Zero Setup Required</span>
          </div>
        </div>

        {/* Platform Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-800/80">
          {PLATFORM_STATS.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left sm:text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-indigo-300 via-indigo-200 to-white bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
