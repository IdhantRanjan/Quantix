import React from 'react';
import { useApp } from './context/AppContext';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import StockDetailScreen from './screens/StockDetailScreen';
import ForumScreen from './screens/ForumScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNavigation from './components/BottomNavigation';

const App: React.FC = () => {
  const { state } = useApp();

  // Debug: Log current screen
  console.log('App: Current screen:', state.currentScreen, 'User:', state.user);

  const renderScreen = () => {
    console.log('App: Rendering screen:', state.currentScreen);
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'stock-detail':
        return <StockDetailScreen />;
      case 'forum':
        return <ForumScreen />;
      case 'portfolio':
        return <PortfolioScreen />;
      case 'news':
        return <NewsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        console.log('App: Default case, rendering WelcomeScreen');
        return <WelcomeScreen />;
    }
  };

  const showBottomNavigation = ['home', 'forum', 'portfolio', 'news', 'settings'].includes(state.currentScreen);

  return (
    <div className="App">
      {renderScreen()}
      {showBottomNavigation && <BottomNavigation />}
    </div>
  );
};

export default App; 