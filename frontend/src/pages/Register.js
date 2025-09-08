import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import FormInput from '../components/FormInput';
import PasswordStrength from '../components/PasswordStrength';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Shield,
  Compass
} from 'lucide-react';

const RegisterNew = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isSubmitting,
    getFieldProps,
    handleSubmit,
    setFormError
  } = useFormValidation({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setFormError('root', result.error || 'Registration failed');
      }
    } catch (error) {
      setFormError('root', 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 mb-8">
            <Compass className="h-8 w-8" />
            <span className="text-2xl font-display font-bold">WanderOn</span>
          </Link>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
            Join WanderOn
          </h2>
          <p className="text-slate-600">
            Create your secure account and start your journey
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-8"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                placeholder="John"
                required
                {...getFieldProps('firstName')}
              />

              <FormInput
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                required
                {...getFieldProps('lastName')}
              />
            </div>

            {/* Username Field */}
            <FormInput
              label="Username"
              name="username"
              placeholder="johndoe"
              icon={User}
              required
              {...getFieldProps('username')}
            />

            {/* Email Field */}
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@example.com"
              icon={Mail}
              required
              {...getFieldProps('email')}
            />

            {/* Password Field */}
            <FormInput
              label="Password"
              name="password"
              placeholder="Create a strong password"
              icon={Lock}
              showPasswordToggle
              showPassword={showPassword}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              required
              {...getFieldProps('password')}
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <PasswordStrength password={formData.password} />
            )}

            {/* Confirm Password Field */}
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              icon={Lock}
              showPasswordToggle
              showPassword={showConfirmPassword}
              onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              required
              {...getFieldProps('confirmPassword')}
            />

            {/* Form Error */}
            {errors.root && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-danger-50 border border-danger-200 rounded-lg p-3"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-danger-600" />
                  <p className="text-sm text-danger-700">{errors.root}</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-slate-500">
            <Shield className="h-4 w-4" />
            <span>Your data is protected with enterprise-grade security</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterNew;
