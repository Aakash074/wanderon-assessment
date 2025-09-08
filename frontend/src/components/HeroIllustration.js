import React from 'react';
import { motion } from 'framer-motion';

const cloudVariant = {
  animate: {
    x: [0, 20, 0],
    transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
  }
};

const floatVariant = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
  }
};

const HeroIllustration = ({ className = '' }) => {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 800 400" className="w-full h-auto">
        <defs>
          <linearGradient id="fadeGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="800" height="400" fill="url(#fadeGradient)" />
          </mask>
          <linearGradient id="sun" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="mountain" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <g opacity="0.5" mask="url(#fadeMask)">
          <motion.circle cx="640" cy="90" r="38" fill="url(#sun)" variants={floatVariant} animate="animate" />
          
          <motion.g variants={cloudVariant} animate="animate">
            <g fill="#cbd5e1" opacity="0.95">
              <ellipse cx="160" cy="90" rx="60" ry="28" />
              <ellipse cx="200" cy="86" rx="40" ry="22" />
              <ellipse cx="120" cy="96" rx="35" ry="18" />
            </g>
          </motion.g>
          
          <motion.g variants={cloudVariant} animate="animate" transition={{ delay: 2 }}>
            <g fill="#cbd5e1" opacity="0.95">
              <ellipse cx="520" cy="70" rx="55" ry="24" />
              <ellipse cx="560" cy="66" rx="38" ry="18" />
              <ellipse cx="480" cy="78" rx="30" ry="16" />
            </g>
          </motion.g>
          
          <g>
            <path d="M50 300 L200 140 L350 300 Z" fill="url(#mountain)" opacity="0.45" />
            <path d="M220 300 L380 170 L540 300 Z" fill="#60a5fa" opacity="0.45" />
            <path d="M400 300 L560 160 L740 300 Z" fill="#3b82f6" opacity="0.45" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;


