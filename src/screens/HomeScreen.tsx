import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockStocks, mockNews, mockForumPosts } from '../data/mockData';
import { TrendingUp, TrendingDown, Eye, Plus, MessageCircle, Star, Zap, Users, BarChart3 } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const { user } = state;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [portfolioValue, setPortfolioValue] = useState(25000);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dailyChange, setDailyChange] = useState(1250);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedChange, setAnimatedChange] = useState(0);

  // Fix visibility issue
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Also trigger when screen changes to home
  useEffect(() => {
    if (state.currentScreen === 'home') {
      console.log('HomeScreen: Screen changed to home, setting visible');
      setIsVisible(true);
    }
  }, [state.currentScreen]);

  // Debug: Log when component mounts and when user changes
  useEffect(() => {
    console.log('HomeScreen: Component mounted, user:', user);
  }, [user]);

  // Animate portfolio values
  useEffect(() => {
    const duration = 2000;
    const increment = portfolioValue / (duration / 16);
    let currentValue = 0;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= portfolioValue) {
        currentValue = portfolioValue;
        clearInterval(timer);
      }
      setAnimatedValue(Math.floor(currentValue));
    }, 16);

    return () => clearInterval(timer);
  }, [portfolioValue]);

  useEffect(() => {
    const duration = 1500;
    const increment = dailyChange / (duration / 16);
    let currentChange = 0;
    
    const timer = setInterval(() => {
      currentChange += increment;
      if (currentChange >= dailyChange) {
        currentChange = dailyChange;
        clearInterval(timer);
      }
      setAnimatedChange(Math.floor(currentChange));
    }, 16);

    return () => clearInterval(timer);
  }, [dailyChange]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMatchGlow = (percentage: number) => {
    if (percentage >= 80) return 'neon-glow-green';
    if (percentage >= 60) return 'neon-glow-orange';
    return 'neon-glow-orange';
  };

  // Filter stocks based on user preferences
  const getPersonalizedStocks = () => {
    if (!user?.sectors?.length) return mockStocks.slice(0, 3);
    
    return mockStocks
      .filter(stock => 
        user.sectors.some(sector => 
          stock.sector === sector
        )
      )
      .slice(0, 3);
  };

  const topMatches = getPersonalizedStocks();

  const handleAddToWatchlist = (stock: any) => {
    dispatch({ type: 'ADD_TO_WATCHLIST', payload: stock });
  };

  const handleViewStock = (stock: any) => {
    dispatch({ type: 'SET_CURRENT_STOCK', payload: stock });
    dispatch({ type: 'SET_SCREEN', payload: 'stock-detail' });
  };

  const handleViewForum = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'forum' });
  };

  // Generate floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 6,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
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
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/20 rounded-lg animate-rotate-slow"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-purple-500/20 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 border border-green-500/20 transform rotate-45 animate-rotate-slow"></div>

      <div className="relative z-10 p-4 pb-20">
        
        {/* Holographic Header */}
        <div className="mb-8 animate-slide-up">
          <div className="card-glow p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold gradient-text mb-2">
                {getGreeting()}, {user?.name || 'Investor'}!
              </h1>
              <p className="text-gray-300 text-sm mb-4">Your personalized investment dashboard</p>
              
              {/* Portfolio Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-green mb-1">
                    ${animatedValue.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">Portfolio Value</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-1 ${dailyChange >= 0 ? 'gradient-text-green' : 'gradient-text-orange'}`}>
                    {dailyChange >= 0 ? '+' : ''}${animatedChange.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">Today's Change</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Matches Section */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-400" />
              AI Matches
            </h2>
            <div className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
              Based on your preferences
            </div>
          </div>
          
          <div className="space-y-4">
            {topMatches.map((stock, index) => (
              <div 
                key={stock.symbol}
                className={`card-glow p-4 animate-slide-up hover:scale-105 transition-all duration-300 cursor-pointer`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                onClick={() => handleViewStock(stock)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg">
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white ${getMatchGlow(stock.matchPercentage)} shadow-lg`}>
                        {stock.matchPercentage}%
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white">{stock.name}</h3>
                      <p className="text-gray-400 text-sm">{stock.symbol}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-base font-bold ${stock.changePercent >= 0 ? 'positive-change' : 'negative-change'}`}>
                          ${stock.price.toFixed(2)}
                        </span>
                        <div className={`flex items-center text-xs ${stock.changePercent >= 0 ? 'positive-change' : 'negative-change'}`}>
                          {stock.changePercent >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWatchlist(stock);
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 hover:scale-110"
                    >
                      <Plus className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewStock(stock);
                      }}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 hover:scale-110"
                    >
                      <Eye className="w-4 h-4 text-purple-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
            Market Sentiment
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="card text-center p-4 hover:scale-105 transition-transform duration-200">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-lg font-bold gradient-text-green">68%</div>
              <div className="text-xs text-gray-400">Bullish</div>
              <div className="progress-bar mt-3">
                <div className="progress-fill bg-gradient-to-r from-green-400 to-green-600" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div className="card text-center p-4 hover:scale-105 transition-transform duration-200">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-lg font-bold text-gray-300">22%</div>
              <div className="text-xs text-gray-400">Neutral</div>
              <div className="progress-bar mt-3">
                <div className="progress-fill bg-gray-500" style={{ width: '22%' }}></div>
              </div>
            </div>
            
            <div className="card text-center p-4 hover:scale-105 transition-transform duration-200">
              <div className="text-2xl mb-2">📉</div>
              <div className="text-lg font-bold gradient-text-orange">10%</div>
              <div className="text-xs text-gray-400">Bearish</div>
              <div className="progress-bar mt-3">
                <div className="progress-fill bg-gradient-to-r from-orange-400 to-red-500" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest News */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
            Latest News
          </h2>
          <div className="space-y-4">
            {mockNews.slice(0, 2).map((article, index) => (
              <div 
                key={article.id}
                className="card-hover p-4 animate-slide-up hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {article.source.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm leading-relaxed">{article.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="bg-white/10 px-2 py-1 rounded-full">{article.source}</span>
                      <span>{new Date(article.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Discussions */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-pink-400" />
              Community
            </h2>
            <button
              onClick={handleViewForum}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm bg-white/10 px-3 py-1 rounded-full hover:bg-white/20"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {mockForumPosts.slice(0, 2).map((post, index) => (
              <div 
                key={post.id}
                className="card-hover p-4 animate-slide-up hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${0.9 + index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {post.author.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1 text-sm">{post.title}</h3>
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">{post.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments?.length || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3" />
                        <span>{post.upvotes - post.downvotes}</span>
                      </span>
                      <span className="badge-primary text-xs">{post.niche}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '1s' }}>
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'portfolio' })}
            className="card-glow p-6 text-center hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">💼</div>
            <h3 className="font-bold text-white mb-2 text-sm">Portfolio</h3>
            <p className="text-xs text-gray-400">View your investments</p>
          </button>
          
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'news' })}
            className="card-glow p-6 text-center hover:scale-105 transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📰</div>
            <h3 className="font-bold text-white mb-2 text-sm">News</h3>
            <p className="text-xs text-gray-400">Market updates</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen; 