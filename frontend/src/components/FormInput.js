import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const FormInput = forwardRef(({ 
  label,
  name,
  type = 'text',
  placeholder,
  icon: Icon,
  showPasswordToggle = false,
  showPassword = false,
  onPasswordToggle,
  value,
  onChange,
  onBlur,
  onKeyDown,
  allowedPattern,
  error,
  hasError,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  const handleBeforeInput = (e) => {
    if (!allowedPattern) return;
    // e.data can be null for non-insert events; only block explicit text insertions
    if (typeof e.data === 'string' && !allowedPattern.test(e.data)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    if (!allowedPattern) return;
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    if (!pasted) return;
    const sanitized = Array.from(pasted).filter(ch => allowedPattern.test(ch)).join('');
    if (sanitized !== pasted) {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart ?? value.length;
      const end = target.selectionEnd ?? value.length;
      const newValue = `${value.slice(0, start)}${sanitized}${value.slice(end)}`;
      onChange && onChange({ target: { value: newValue } });
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${hasError ? 'text-danger-400' : 'text-slate-400'}`} />
          </div>
        )}
        
        <input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onBeforeInput={handleBeforeInput}
          onPaste={handlePaste}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            input 
            ${Icon ? 'pl-10' : ''} 
            ${showPasswordToggle ? 'pr-10' : ''} 
            ${hasError ? 'input-error' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...props}
        />
        
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onPasswordToggle}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
            )}
          </button>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        {hasError && error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 text-danger-600"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
