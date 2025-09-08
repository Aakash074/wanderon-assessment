import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Shield, 
  Calendar,
  MapPin,
  Mountain,
  Clock,
  CheckCircle,
  Settings,
  Globe
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Shield,
      title: 'Security Score',
      value: '98%',
      description: 'Your account is highly secure',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      icon: Calendar,
      title: 'Member Since',
      value: new Date(user?.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      }),
      description: 'Welcome to the WanderOn family',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      icon: Clock,
      title: 'Last Login',
      value: user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Today',
      description: 'Your recent activity',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
    },
    {
      icon: Globe,
      title: 'Account Status',
      value: user?.isActive ? 'Active' : 'Inactive',
      description: 'Your account is in good standing',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
  ];

  const recentActivities = [
    {
      icon: CheckCircle,
      title: 'Account Created',
      description: 'Welcome to WanderOn! Your secure journey begins.',
      timestamp: user?.createdAt,
      type: 'success',
    },
    {
      icon: Shield,
      title: 'Security Scan Complete',
      description: 'Your account passed all security checks.',
      timestamp: new Date().toISOString(),
      type: 'info',
    },
    {
      icon: User,
      title: 'Profile Verified',
      description: 'Your profile information has been verified.',
      timestamp: user?.updatedAt,
      type: 'success',
    },
  ];

  const quickActions = [
    {
      icon: Settings,
      title: 'Update Profile',
      description: 'Manage your personal information',
      href: '/profile',
      color: 'primary',
    },
    {
      icon: Shield,
      title: 'Security Settings',
      description: 'Review your security preferences',
      href: '/profile',
      color: 'success',
    },
    {
      icon: MapPin,
      title: 'Plan Journey',
      description: 'Start planning your next adventure',
      href: '#',
      color: 'accent',
    },
    {
      icon: Mountain,
      title: 'Explore Destinations',
      description: 'Discover amazing places to visit',
      href: '#',
      color: 'purple',
    },
  ];

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-medium">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-slate-600">
                Here's what's happening with your WanderOn account
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="card p-6 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-slate-700 mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={action.title}
                    href={action.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group p-4 border border-slate-200 rounded-lg hover:border-primary-300 hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-${action.color}-50 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-100 transition-colors`}>
                        <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <h2 className="text-xl font-display font-semibold text-slate-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <div className={`w-8 h-8 ${
                      activity.type === 'success' ? 'bg-success-100' : 'bg-primary-100'
                    } rounded-full flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={`h-4 w-4 ${
                        activity.type === 'success' ? 'text-success-600' : 'text-primary-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Account Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <div className="card p-6">
            <h2 className="text-xl font-display font-semibold text-slate-900 mb-6">
              Account Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Personal Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Full Name</span>
                    <span className="text-sm font-medium text-slate-900">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Username</span>
                    <span className="text-sm font-medium text-slate-900">
                      {user?.username}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Email</span>
                    <span className="text-sm font-medium text-slate-900">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3">Account Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Role</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user?.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Status</span>
                    <span className="text-sm font-medium text-success-600">
                      {user?.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Joined</span>
                    <span className="text-sm font-medium text-slate-900">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
