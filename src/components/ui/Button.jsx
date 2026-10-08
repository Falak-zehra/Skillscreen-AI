import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-violet-500 focus:ring-indigo-500',
    secondary: 'bg-slate-900 border border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 focus:ring-slate-500 shadow-sm',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/60 focus:ring-slate-600',
    outline: 'border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 focus:ring-indigo-400',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 focus:ring-red-500'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold shadow-md'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && <Icon className={size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
}
