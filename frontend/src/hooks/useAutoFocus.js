import { useRef, useCallback } from 'react';

/**
 * Custom hook for auto-focusing to next form field on Enter key press
 * @param {Array} fieldNames - Array of field names in order
 * @returns {Object} - Object with refs and handlers
 */
const useAutoFocus = (fieldNames) => {
  const refs = useRef({});

  // Register a ref for a field
  const registerRef = useCallback((fieldName) => {
    return (element) => {
      refs.current[fieldName] = element;
    };
  }, []);

  // Handle Enter key press to move to next field
  const handleKeyDown = useCallback((event, currentFieldName) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      const currentIndex = fieldNames.indexOf(currentFieldName);
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < fieldNames.length) {
        const nextFieldName = fieldNames[nextIndex];
        const nextField = refs.current[nextFieldName];
        
        if (nextField && nextField.focus) {
          nextField.focus();
        }
      } else {
        // If it's the last field, submit the form
        const form = event.target.closest('form');
        if (form) {
          const submitButton = form.querySelector('button[type="submit"]');
          if (submitButton) {
            submitButton.click();
          }
        }
      }
    }
  }, [fieldNames]);

  return {
    registerRef,
    handleKeyDown
  };
};

export default useAutoFocus;
