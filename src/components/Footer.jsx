import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950/60 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">SkillScreen AI</span>
          <span className="text-slate-600">|</span>
          <span>Student Assessment Prototype</span>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1">
          <span>React + Vite + Tailwind CSS</span>
        </div>

      </div>
    </footer>
  );
}
