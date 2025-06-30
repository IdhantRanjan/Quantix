export interface User {
  id: string;
  name: string;
  age: number;
  sectors: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentStyle: string[];
  portfolio: PortfolioItem[];
  watchlist: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  emailUpdates: boolean;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  marketCap: string;
  peRatio: number;
  matchPercentage: number;
  matchReasons: string[];
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  description: string;
  companyInfo: CompanyInfo;
}

export interface CompanyInfo {
  founded: number;
  employees: number;
  headquarters: string;
  website: string;
  industry: string;
}

export interface PortfolioItem {
  symbol: string;
  shares: number;
  averagePrice: number;
  currentValue: number;
  totalGain: number;
  totalGainPercent: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relatedStocks: string[];
  category: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: User;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  tags: string[];
  relatedStocks: string[];
  niche: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
}

export interface ChartData {
  date: string;
  price: number;
  volume: number;
}

export interface Sector {
  name: string;
  icon: string;
  description: string;
  companies: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface InvestmentStyle {
  name: string;
  icon: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  timeHorizon: string;
}

export interface SwipeCard {
  id: string;
  type: 'sector' | 'stock' | 'style';
  title: string;
  description: string;
  icon: string;
  riskLevel: 'low' | 'medium' | 'high';
  companies?: string[];
}

export interface AppState {
  currentScreen: 'welcome' | 'onboarding' | 'home' | 'stock-detail' | 'forum' | 'portfolio' | 'news' | 'settings';
  onboardingStep: number;
  user: User | null;
  stocks: Stock[];
  news: NewsItem[];
  forumPosts: ForumPost[];
  currentStock: Stock | null;
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_SCREEN'; payload: AppState['currentScreen'] }
  | { type: 'SET_ONBOARDING_STEP'; payload: number }
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_STOCKS'; payload: Stock[] }
  | { type: 'SET_NEWS'; payload: NewsItem[] }
  | { type: 'SET_FORUM_POSTS'; payload: ForumPost[] }
  | { type: 'SET_CURRENT_STOCK'; payload: Stock | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_TO_WATCHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: string }
  | { type: 'ADD_TO_PORTFOLIO'; payload: PortfolioItem }
  | { type: 'UPDATE_PORTFOLIO'; payload: PortfolioItem }; 