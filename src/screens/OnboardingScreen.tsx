import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sectors, investmentStyles } from '../data/mockData';

const OnboardingScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedSectors: [] as string[],
    selectedStyles: [] as string[],
    riskTolerance: 'moderate' as 'conservative' | 'moderate' | 'aggressive'
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Combine sectors and investment styles for swipe cards
  const allSwipeCards = [
    ...sectors.map(sector => ({
      ...sector,
      type: 'sector' as const,
      id: `sector-${sector.name}`,
      title: sector.name,
      description: sector.description,
      icon: sector.icon,
      riskLevel: sector.riskLevel,
      companies: sector.companies
    })),
    ...investmentStyles.map(style => ({
      ...style,
      type: 'style' as const,
      id: `style-${style.name}`,
      title: style.name,
      description: style.description,
      icon: style.icon,
      riskLevel: style.riskLevel,
      companies: undefined
    }))
  ];

  const handleNext = () => {
    console.log('OnboardingScreen: handleNext called, current step:', state.onboardingStep);
    
    if (state.onboardingStep < 1) {
      console.log('OnboardingScreen: Moving to next step');
      dispatch({ type: 'SET_ONBOARDING_STEP', payload: state.onboardingStep + 1 });
    } else {
      console.log('OnboardingScreen: Completing onboarding');
      // Complete onboarding
      const user = {
        id: '1',
        name: formData.name,
        age: parseInt(formData.age),
        sectors: formData.selectedSectors,
        riskTolerance: formData.riskTolerance,
        investmentStyle: formData.selectedStyles,
        portfolio: [],
        watchlist: [],
        preferences: {
          notifications: true,
          darkMode: false,
          emailUpdates: true
        }
      };
      
      console.log('OnboardingScreen: Setting user:', user);
      // Set user first, then navigate to home
      dispatch({ type: 'SET_USER', payload: user });
      
      // Force a small delay to ensure state is updated before navigation
      setTimeout(() => {
        console.log('OnboardingScreen: Navigating to home screen');
        dispatch({ type: 'SET_SCREEN', payload: 'home' });
      }, 100);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBack = () => {
    if (state.onboardingStep > 0) {
      dispatch({ type: 'SET_ONBOARDING_STEP', payload: state.onboardingStep - 1 });
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentCard = allSwipeCards[currentCardIndex];
    if (direction === 'right') {
      if (currentCard.type === 'sector') {
        setFormData(prev => ({
          ...prev,
          selectedSectors: [...prev.selectedSectors, currentCard.title]
        }));
      } else if (currentCard.type === 'style') {
        setFormData(prev => ({
          ...prev,
          selectedStyles: [...prev.selectedStyles, currentCard.title]
        }));
      }
    }
    
    if (currentCardIndex < allSwipeCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      handleNext();
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'from-green-500 to-green-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'high': return 'from-red-500 to-pink-600';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  const renderStep = () => {
    switch (state.onboardingStep) {
      case 0:
        return (
          <div className="p-6 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Let's get you started</h2>
              <p className="text-gray-300">Step 1 of 2</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">What's your name?</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="input-modern"
                />
                <div className="text-xs text-gray-400 mt-1">
                  {formData.name.length}/50 characters
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your age?</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Enter your age"
                  min="18"
                  className="input-modern"
                />
                {formData.age && parseInt(formData.age) < 18 && (
                  <div className="text-xs text-red-400 mt-1">Must be 18 or older to invest</div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleNext}
              disabled={!formData.name.trim() || !formData.age || parseInt(formData.age) < 18}
              className="btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Swiping
            </button>
          </div>
        );

      case 1:
        return (
          <div className="p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Swipe to build your investment DNA</h2>
              <p className="text-gray-300 mb-2">Swipe right if interested, left if not</p>
              <p className="text-sm text-gray-400">Step 2 of 2</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-gray-400">{currentCardIndex + 1} of {allSwipeCards.length}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentCardIndex + 1) / allSwipeCards.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="relative h-96 mb-8">
              {currentCardIndex < allSwipeCards.length && (
                <div className="swipe-card">
                  <div className="p-8 h-full flex flex-col justify-center items-center text-center">
                    <div className="text-8xl mb-6">{allSwipeCards[currentCardIndex].icon}</div>
                    <h3 className="text-3xl font-bold mb-4">{allSwipeCards[currentCardIndex].title}</h3>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                      {allSwipeCards[currentCardIndex].description}
                    </p>
                    
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getRiskColor(allSwipeCards[currentCardIndex].riskLevel)}`}>
                      {allSwipeCards[currentCardIndex].riskLevel} Risk
                    </div>
                    
                    {allSwipeCards[currentCardIndex].companies && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-400 mb-2">Example companies:</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {allSwipeCards[currentCardIndex].companies?.slice(0, 4).map((company) => (
                            <span key={company} className="px-3 py-1 bg-white/10 rounded-full text-xs">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-8 mb-6">
              <button
                onClick={() => handleSwipe('left')}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white text-3xl flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-red-500/25"
              >
                ✕
              </button>
              <button
                onClick={() => handleSwipe('right')}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white text-3xl flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-green-500/25"
              >
                ✓
              </button>
            </div>

            <div className="text-center">
              <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors">
                Skip
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {allSwipeCards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCardIndex ? 'bg-blue-500 neon-glow' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="pt-12 pb-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingScreen; 