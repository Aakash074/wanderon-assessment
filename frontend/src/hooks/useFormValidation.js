import { useState, useCallback } from 'react';

// Validation rules
const validationRules = {
  firstName: {
    required: 'First name is required',
    minLength: { value: 2, message: 'First name must be at least 2 characters' },
    maxLength: { value: 50, message: 'First name must be less than 50 characters' },
    pattern: { value: /^[a-zA-Z\s]+$/, message: 'First name can only contain letters and spaces' }
  },
  lastName: {
    required: 'Last name is required',
    minLength: { value: 2, message: 'Last name must be at least 2 characters' },
    maxLength: { value: 50, message: 'Last name must be less than 50 characters' },
    pattern: { value: /^[a-zA-Z\s]+$/, message: 'Last name can only contain letters and spaces' }
  },
  username: {
    required: 'Username is required',
    minLength: { value: 3, message: 'Username must be at least 3 characters' },
    maxLength: { value: 30, message: 'Username must be less than 30 characters' },
    pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' },
    custom: (value) => {
      const reserved = ['admin', 'root', 'user', 'guest', 'test', 'api', 'www', 'mail', 'support'];
      if (reserved.includes(value?.toLowerCase())) {
        return 'Username is reserved';
      }
      return null;
    }
  },
  email: {
    required: 'Email is required',
    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email address' },
    maxLength: { value: 255, message: 'Email must be less than 255 characters' }
  },
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
    maxLength: { value: 128, message: 'Password must be less than 128 characters' },
    pattern: { 
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      message: 'Password must contain uppercase, lowercase, number, and special character' 
    }
  },
  confirmPassword: {
    required: 'Please confirm your password',
    custom: (value, formData) => {
      if (value !== formData.password) {
        return 'Passwords do not match';
      }
      return null;
    }
  },
  identifier: {
    required: 'Email or username is required',
    minLength: { value: 3, message: 'Must be at least 3 characters' },
    maxLength: { value: 255, message: 'Must be less than 255 characters' }
  },
  currentPassword: {
    required: 'Current password is required'
  },
  newPassword: {
    required: 'New password is required',
    minLength: { value: 8, message: 'New password must be at least 8 characters' },
    maxLength: { value: 128, message: 'New password must be less than 128 characters' },
    pattern: { 
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      message: 'New password must contain uppercase, lowercase, number, and special character' 
    }
  },
  confirmNewPassword: {
    required: 'Please confirm your new password',
    custom: (value, formData) => {
      if (value !== formData.newPassword) {
        return 'Passwords do not match';
      }
      return null;
    }
  }
};

// Password strength calculator
export const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

export const getPasswordStrengthColor = (strength) => {
  if (strength < 2) return 'bg-danger-500';
  if (strength < 4) return 'bg-accent-500';
  return 'bg-success-500';
};

export const getPasswordStrengthText = (strength) => {
  if (strength < 2) return 'Weak';
  if (strength < 4) return 'Medium';
  return 'Strong';
};

// Main form validation hook
export const useFormValidation = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback((name, value, allFormData = formData) => {
    const rules = validationRules[name];
    if (!rules) return null;

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.required;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
      return null;
    }

    const stringValue = value.toString().trim();

    // MinLength validation
    if (rules.minLength && stringValue.length < rules.minLength.value) {
      return rules.minLength.message;
    }

    // MaxLength validation
    if (rules.maxLength && stringValue.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.value.test(stringValue)) {
      return rules.pattern.message;
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(stringValue, allFormData);
      if (customError) {
        return customError;
      }
    }

    return null;
  }, [formData]);

  // Update form data and validate
  const updateField = useCallback((name, value) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Validate the field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value, newFormData);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [formData, touched, validateField]);

  // Mark field as touched and validate
  const touchField = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [formData, validateField]);

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(name => {
      const error = validateField(name, formData[name], formData);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return isValid;
  }, [formData, validateField]);

  // Reset form
  const resetForm = useCallback((newInitialValues = initialValues) => {
    setFormData(newInitialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set form error (for server-side errors)
  const setFormError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Clear specific error
  const clearError = useCallback((name) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e?.preventDefault();
      
      if (isSubmitting) return;

      setIsSubmitting(true);
      
      try {
        const isValid = validateAll();
        if (isValid) {
          await onSubmit(formData);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [formData, isSubmitting, validateAll]);

  // Get field props for easy integration
  const getFieldProps = useCallback((name) => ({
    value: formData[name] || '',
    onChange: (e) => {
      const value = e.target ? e.target.value : e;
      updateField(name, value);
    },
    onBlur: () => touchField(name),
    error: errors[name],
    hasError: Boolean(errors[name] && touched[name])
  }), [formData, errors, touched, updateField, touchField]);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    updateField,
    touchField,
    validateAll,
    resetForm,
    setFormError,
    clearError,
    handleSubmit,
    getFieldProps,
    setIsSubmitting
  };
};
