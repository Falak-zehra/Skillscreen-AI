import React from 'react';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </span>
  );
}
