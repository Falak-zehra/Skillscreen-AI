import React from 'react';

export default function ProgressBar({ current, total, percentage }) {
  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className="font-semibold text-slate-300">
          Question <span className="text-indigo-400 font-bold">{current}</span> of <span className="text-white font-bold">{total}</span>
        </span>
        <span className="text-xs text-slate-400 font-mono">
          {percentage}% Completed
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[1px]">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
