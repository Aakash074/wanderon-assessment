import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-3 border-primary-200/50 border-t-primary-600 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 0 0 rgba(2,132,199,0.35)' }}
          animate={{ boxShadow: ['0 0 0 0 rgba(2,132,199,0.35)', '0 0 0 10px rgba(2,132,199,0)'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
