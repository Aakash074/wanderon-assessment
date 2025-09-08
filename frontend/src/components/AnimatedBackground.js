import React from 'react';

const AnimatedBackground = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"></div>
      <div className="absolute top-1/3 -right-10 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" />
    </div>
  );
};

export default AnimatedBackground;


