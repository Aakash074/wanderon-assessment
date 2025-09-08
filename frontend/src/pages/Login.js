import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import useAutoFocus from '../hooks/useAutoFocus';
import FormInput from '../components/FormInput';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  Mail, 
  Lock, 
  ArrowRight,
  Shield,
  Compass
} from 'lucide-react';

const LoginNew = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Auto-focus setup
  const fieldNames = ['identifier', 'password'];
  const { registerRef, handleKeyDown } = useAutoFocus(fieldNames);

  const {
    errors,
    isSubmitting,
    getFieldProps,
    handleSubmit,
    setFormError
  } = useFormValidation({
    identifier: '',
    password: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const onSubmit = async (data) => {
    try {
      const result = await login({
        identifier: data.identifier,
        password: data.password,
      });

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setFormError('root', result.error || 'Login failed');
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
            <Shield className="h-8 w-8 text-primary-600" />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-600">
            Sign in to continue your journey
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-8"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email/Username Field */}
            <FormInput
              ref={registerRef('identifier')}
              label="Email or Username"
              name="identifier"
              type="text"
              placeholder="Enter your email or username"
              icon={Mail}
              required
              onKeyDown={(e) => handleKeyDown(e, 'identifier')}
              {...getFieldProps('identifier')}
            />

            {/* Password Field */}
            <FormInput
              ref={registerRef('password')}
              label="Password"
              name="password"
              placeholder="Enter your password"
              icon={Lock}
              showPasswordToggle
              showPassword={showPassword}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              required
              allowedPattern={/[A-Za-z0-9@$!%*?&.,/+_-]/}
              onKeyDown={(e) => handleKeyDown(e, 'password')}
              {...getFieldProps('password')}
            />

            {/* Form Error */}
            <AnimatePresence mode="wait">
              {errors.root && (
                <motion.div
                  key={errors.root}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-danger-50 border border-danger-200 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-danger-600" />
                    <p className="text-sm text-danger-700">{errors.root}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="group w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Create one now
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
            <Lock className="h-4 w-4" />
            <span>Your connection is secured with 256-bit encryption</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginNew;
