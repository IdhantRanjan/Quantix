import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Stock, NewsItem, ForumPost, PortfolioItem, UserPreferences } from '../types';

// State interface
interface AppState {
  currentScreen: string;
  onboardingStep: number;
  user: User | null;
  stocks: Stock[];
  news: NewsItem[];
  forumPosts: ForumPost[];
  currentStock: Stock | null;
  loading: boolean;
  error: string | null;
  watchlist: Stock[];
  portfolio: PortfolioItem[];
}

// Action types
type AppAction =
  | { type: 'SET_SCREEN'; payload: string }
  | { type: 'SET_ONBOARDING_STEP'; payload: number }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_STOCKS'; payload: Stock[] }
  | { type: 'SET_NEWS'; payload: NewsItem[] }
  | { type: 'SET_FORUM_POSTS'; payload: ForumPost[] }
  | { type: 'SET_CURRENT_STOCK'; payload: Stock | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_TO_WATCHLIST'; payload: Stock }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: string }
  | { type: 'ADD_TO_PORTFOLIO'; payload: PortfolioItem }
  | { type: 'UPDATE_PORTFOLIO'; payload: PortfolioItem[] };

// Initial state
const initialState: AppState = {
  currentScreen: 'welcome',
  onboardingStep: 0,
  user: null,
  stocks: [],
  news: [],
  forumPosts: [],
  currentStock: null,
  loading: false,
  error: null,
  watchlist: [],
  portfolio: []
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    
    case 'SET_ONBOARDING_STEP':
      return { ...state, onboardingStep: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'UPDATE_USER_PREFERENCES':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...action.payload }
        }
      };
    
    case 'SET_STOCKS':
      return { ...state, stocks: action.payload };
    
    case 'SET_NEWS':
      return { ...state, news: action.payload };
    
    case 'SET_FORUM_POSTS':
      return { ...state, forumPosts: action.payload };
    
    case 'SET_CURRENT_STOCK':
      return { ...state, currentStock: action.payload };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'ADD_TO_WATCHLIST':
      if (state.watchlist.find(stock => stock.symbol === action.payload.symbol)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(stock => stock.symbol !== action.payload)
      };
    
    case 'ADD_TO_PORTFOLIO':
      const existingIndex = state.portfolio.findIndex(item => item.symbol === action.payload.symbol);
      if (existingIndex >= 0) {
        const updatedPortfolio = [...state.portfolio];
        updatedPortfolio[existingIndex] = action.payload;
        return { ...state, portfolio: updatedPortfolio };
      }
      return { ...state, portfolio: [...state.portfolio, action.payload] };
    
    case 'UPDATE_PORTFOLIO':
      return { ...state, portfolio: action.payload };
    
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 