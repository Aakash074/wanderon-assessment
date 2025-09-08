import React from 'react';
import { motion } from 'framer-motion';
import { 
  calculatePasswordStrength, 
  getPasswordStrengthColor, 
  getPasswordStrengthText 
} from '../hooks/useFormValidation';

const PasswordStrength = ({ password, className = '' }) => {
  if (!password) return null;

  const strength = calculatePasswordStrength(password);
  const strengthColor = getPasswordStrengthColor(strength);
  const strengthText = getPasswordStrengthText(strength);

  const requirements = [
    { test: password.length >= 8, text: 'At least 8 characters' },
    { test: /[a-z]/.test(password), text: 'One lowercase letter' },
    { test: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { test: /[0-9]/.test(password), text: 'One number' },
    { test: /[^A-Za-z0-9]/.test(password), text: 'One special character' },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Password Strength</span>
          <span className={`text-sm font-medium ${
            strength < 2 ? 'text-danger-600' :
            strength < 4 ? 'text-accent-600' : 'text-success-600'
          }`}>
            {strengthText}
          </span>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(strength / 5) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`h-full rounded-full ${strengthColor} transition-all duration-300`}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        <span className="text-xs font-medium text-slate-600">Requirements:</span>
        <div className="grid grid-cols-1 gap-1">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: req.test ? 1 : 0.5 }}
              className={`flex items-center space-x-2 text-xs ${
                req.test ? 'text-success-600' : 'text-slate-500'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                req.test ? 'bg-success-500' : 'bg-slate-300'
              }`} />
              <span>{req.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
