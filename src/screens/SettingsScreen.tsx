import React from 'react';
import { useApp } from '../context/AppContext';
import { UserPreferences } from '../types';
import BottomNavigation from '../components/BottomNavigation';

const SettingsScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const { user } = state;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSignOut = () => {
    // In a real app, this would handle sign out logic
    console.log('Signing out...');
  };

  const handleTogglePreference = (key: keyof UserPreferences) => {
    if (!user) return;
    dispatch({
      type: 'UPDATE_USER_PREFERENCES',
      payload: { [key]: !user.preferences[key] }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="p-6 pt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400">Customize your experience</p>
        </div>

        <div className="space-y-6 mb-20">
          {/* User Profile */}
          <section className="card-hover p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">{user?.name || 'User'}</h3>
                  <p className="text-gray-400">Age: {user?.age || 'N/A'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="card-hover p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">🔔</span>
                  </div>
                  <span className="text-white">Push Notifications</span>
                </div>
                <button
                  onClick={() => handleTogglePreference('notifications')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    user?.preferences?.notifications ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    user?.preferences?.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400">🌙</span>
                  </div>
                  <span className="text-white">Dark Mode</span>
                </div>
                <button
                  onClick={() => handleTogglePreference('darkMode')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    user?.preferences?.darkMode ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    user?.preferences?.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📧</span>
                  </div>
                  <span className="text-white">Email Updates</span>
                </div>
                <button
                  onClick={() => handleTogglePreference('emailUpdates')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    user?.preferences?.emailUpdates ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    user?.preferences?.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </section>

          {/* Account Actions */}
          <section className="card-hover p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Account</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="text-white">Privacy & Security</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="text-white">Help & Support</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="text-white">About Quantix</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-red-500/10 rounded-lg transition-colors">
                <span className="text-red-400">Sign Out</span>
              </button>
            </div>
          </section>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SettingsScreen; 