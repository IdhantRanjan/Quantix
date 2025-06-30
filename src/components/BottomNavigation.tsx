import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, DollarSign, Home, Newspaper, Settings } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const { state, dispatch } = useApp();

  const navItems = [
    {
      id: 'forum',
      label: 'Forum',
      icon: MessageCircle,
      screen: 'forum' as const
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: DollarSign,
      screen: 'portfolio' as const
    },
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      screen: 'home' as const
    },
    {
      id: 'news',
      label: 'News',
      icon: Newspaper,
      screen: 'news' as const
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      screen: 'settings' as const
    }
  ];

  const handleNavigation = (screen: string) => {
    dispatch({ type: 'SET_SCREEN', payload: screen as any });
  };

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = state.currentScreen === item.screen;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.screen)}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 