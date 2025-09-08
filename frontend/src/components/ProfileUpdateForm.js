import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import FormInput from './FormInput';
import LoadingSpinner from './LoadingSpinner';
import { Mail, Save, AlertCircle } from 'lucide-react';

const ProfileUpdateForm = () => {
  const { user, updateProfile } = useAuth();

  const {
    errors,
    isSubmitting,
    getFieldProps,
    handleSubmit,
    setFormError
  } = useFormValidation({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  });

  const onSubmit = async (data) => {
    try {
      const result = await updateProfile(data);
      if (!result.success) {
        setFormError('root', result.error || 'Profile update failed');
      }
    } catch (error) {
      setFormError('root', 'An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-display font-semibold text-slate-900">
          Profile Information
        </h3>
        <p className="text-slate-600 mt-1">
          Update your personal details and contact information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            required
            {...getFieldProps('firstName')}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            required
            {...getFieldProps('lastName')}
          />
        </div>

        {/* Email Field */}
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          icon={Mail}
          required
          {...getFieldProps('email')}
        />

        {/* Form Error */}
        {errors.root && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-danger-50 border border-danger-200 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-danger-600" />
              <p className="text-sm text-danger-700">{errors.root}</p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
