import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileUpdateForm from '../components/ProfileUpdateForm';
import PasswordChangeForm from '../components/PasswordChangeForm';
import { 
  User, 
  Shield
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: User },
    { id: 'security', name: 'Security Settings', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">
            Account Settings
          </h1>
          <p className="text-slate-600">
            Manage your profile information and security preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card p-6">
              {activeTab === 'profile' && <ProfileUpdateForm />}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  {/* Security Status */}
                  <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-success-600" />
                      <div>
                        <p className="text-sm font-medium text-success-800">
                          Your account is secure
                        </p>
                        <p className="text-sm text-success-700">
                          Two-factor authentication is recommended for enhanced security
                        </p>
                      </div>
                    </div>
                  </div>

                  <PasswordChangeForm />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
