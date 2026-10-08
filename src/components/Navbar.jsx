import React from 'react';
import { Sparkles, Terminal, Code2, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

export default function Navbar({ onStartScreening, isAssessing, onExitAssessment }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={onExitAssessment}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                SkillScreen AI
              </span>
              <Badge variant="primary" className="hidden sm:inline-flex">
                Prototype
              </Badge>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide -mt-1 hidden sm:block">
              Intelligent Assessment Engine
            </span>
          </div>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          {isAssessing ? (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={onExitAssessment}
            >
              Exit to Home
            </Button>
          ) : (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={onStartScreening}
              icon={ArrowRight}
            >
              Start Screening
            </Button>
          )}
        </div>

      </div>
    </header>
  );
}
