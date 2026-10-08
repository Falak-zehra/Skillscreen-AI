import React from 'react';

export default function ProgressBar({ current, total, percentage, timeLeft }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
        <span className="text-slate-400">
          Question <strong className="text-white">{current}</strong> of <strong className="text-white">{total}</strong>
        </span>
        {timeLeft !== undefined && (
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-indigo-300 font-mono text-xs border border-slate-700">
            Time Remaining: {formatTime(timeLeft)}
          </span>
        )}
      </div>

      <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden p-[1px]">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
