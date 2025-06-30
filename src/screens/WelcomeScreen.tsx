import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Zap, Users, TrendingUp, Shield } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const { dispatch } = useApp();
  const [userCount, setUserCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate user count
    const targetCount = 50000;
    const duration = 2000;
    const increment = targetCount / (duration / 16);
    let currentCount = 0;
    
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetCount) {
        currentCount = targetCount;
        clearInterval(timer);
      }
      setUserCount(Math.floor(currentCount));
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'onboarding' });
  };

  const handleSignIn = () => {
    // Check if user exists in state, if not, go to onboarding
    // For now, we'll always go to onboarding since we don't have persistent auth
    dispatch({ type: 'SET_SCREEN', payload: 'onboarding' });
  };

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 6,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/30 rounded-lg animate-rotate-slow"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-purple-500/30 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 border border-green-500/30 transform rotate-45 animate-rotate-slow"></div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Animated Logo */}
        <div className="mb-8 animate-bounce-gentle">
          <div className="relative">
            <div className="text-8xl mb-4 animate-pulse-glow text-center">
              📈
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>
          <h1 className="text-6xl font-bold text-center gradient-text text-glow-blue animate-fade-in">
            Quantix
          </h1>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Find Your Investment Niche
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto">
            AI-powered matches • Community insights • Real-time data
          </p>
          
          {/* Animated Counter */}
          <div className="mb-8">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              {userCount.toLocaleString()}+ investors connected
            </div>
            <div className="text-sm text-gray-400">Join the future of investing</div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
          <div className="card-glow text-center p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Personalized Matches</h3>
            <p className="text-gray-300 mb-3">87% average compatibility</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>
          
          <div className="card-glow text-center p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Expert Community</h3>
            <p className="text-gray-300 mb-3">Learn from niche specialists</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          <div className="card-glow text-center p-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-2">Real-Time Data</h3>
            <p className="text-gray-300 mb-3">Live market insights</p>
            <div className="flex justify-center">
              <div className="w-8 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-400">Trusted by</div>
              <div className="font-bold">50K+ investors</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-xl">⭐</span>
              ))}
            </div>
            <span className="text-gray-300">4.9/5 rating</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up" style={{ animationDelay: '1s' }}>
          <button
            onClick={handleGetStarted}
            className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
          >
            <Zap size={20} />
            <span>Enter the Future</span>
          </button>
          
          <button
            onClick={handleSignIn}
            className="btn-outline text-lg px-8 py-4"
          >
            Sign In
          </button>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center space-x-2 text-sm text-gray-400 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <Shield size={16} />
          <span>Bank-level security • Your data is protected</span>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-dark-950 to-transparent"></div>
    </div>
  );
};

export default WelcomeScreen; 