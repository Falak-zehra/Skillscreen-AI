import React from 'react';

export default function Card({ children, className = '', hover = true, glow = false }) {
  return (
    <div
      className={`relative rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm p-6 ${
        hover ? 'transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5' : ''
      } ${
        glow ? 'border-indigo-500/30 shadow-lg shadow-indigo-500/10' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
