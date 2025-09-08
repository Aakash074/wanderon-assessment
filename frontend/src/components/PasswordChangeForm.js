import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import FormInput from './FormInput';
import PasswordStrength from './PasswordStrength';
import LoadingSpinner from './LoadingSpinner';
import { Lock, AlertCircle } from 'lucide-react';

const PasswordChangeForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { changePassword } = useAuth();

  const {
    formData,
    errors,
    isSubmitting,
    getFieldProps,
    handleSubmit,
    setFormError,
    resetForm
  } = useFormValidation({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const onSubmit = async (data) => {
    try {
      const result = await changePassword(data);
      if (result.success) {
        resetForm();
      } else {
        setFormError('root', result.error || 'Password change failed');
      }
    } catch (error) {
      setFormError('root', 'An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <FormInput
          label="Current Password"
          name="currentPassword"
          placeholder="Enter current password"
          icon={Lock}
          showPasswordToggle
          showPassword={showCurrentPassword}
          onPasswordToggle={() => setShowCurrentPassword(!showCurrentPassword)}
          required
          {...getFieldProps('currentPassword')}
        />

        {/* New Password */}
        <FormInput
          label="New Password"
          name="newPassword"
          placeholder="Enter new password"
          icon={Lock}
          showPasswordToggle
          showPassword={showNewPassword}
          onPasswordToggle={() => setShowNewPassword(!showNewPassword)}
          required
          {...getFieldProps('newPassword')}
        />

        {/* Password Strength Indicator */}
        {formData.newPassword && (
          <PasswordStrength password={formData.newPassword} />
        )}

        {/* Confirm New Password */}
        <FormInput
          label="Confirm New Password"
          name="confirmNewPassword"
          placeholder="Confirm new password"
          icon={Lock}
          showPasswordToggle
          showPassword={showConfirmPassword}
          onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          required
          {...getFieldProps('confirmNewPassword')}
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
                <Lock className="h-4 w-4" />
                <span>Change Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
