import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockStocks } from '../data/mockData';
import { PortfolioItem } from '../types';
import BottomNavigation from '../components/BottomNavigation';

const PortfolioScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const { portfolio, watchlist, stocks } = state;
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState('');
  const [quantity, setQuantity] = useState('');
  const [averagePrice, setAveragePrice] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalInvested = portfolio.reduce((sum, item) => sum + (item.shares * item.averagePrice), 0);
  const totalGainLoss = totalPortfolioValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const recommendedStocks = mockStocks.filter(stock => !portfolio.some(item => item.symbol === stock.symbol)).slice(0, 3);

  const handleAddToPortfolio = () => {
    if (!selectedStock || !quantity || !averagePrice) return;

    const stock = stocks.find(s => s.symbol === selectedStock);
    if (!stock) return;

    const shares = parseFloat(quantity);
    const avgPrice = parseFloat(averagePrice);
    const currentValue = shares * stock.price;
    const totalGain = currentValue - (shares * avgPrice);
    const totalGainPercent = avgPrice > 0 ? ((stock.price - avgPrice) / avgPrice) * 100 : 0;

    const portfolioItem: PortfolioItem = {
      symbol: selectedStock,
      shares: shares,
      averagePrice: avgPrice,
      currentValue: currentValue,
      totalGain: totalGain,
      totalGainPercent: totalGainPercent
    };

    dispatch({ type: 'ADD_TO_PORTFOLIO', payload: portfolioItem });
    setShowAddModal(false);
    setSelectedStock('');
    setQuantity('');
    setAveragePrice('');
  };

  const getStockName = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    return stock ? stock.name : symbol;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getStockPrice = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    return stock ? stock.price : 0;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddToWatchlist = (stock: any) => {
    dispatch({ type: 'ADD_TO_WATCHLIST', payload: stock });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMoveToPortfolio = (stock: any) => {
    setShowAddModal(true);
    // In a real app, you'd set the selected stock here
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Portfolio</h1>
          <p className="text-gray-300">Track your investments and performance</p>
        </div>

        {/* Portfolio Overview */}
        <div className="mb-8">
          <div className="card-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Portfolio Value</h2>
              <div className="text-sm text-gray-400">Live</div>
            </div>
            
            <div className="text-4xl font-bold text-white mb-2">
              ${totalPortfolioValue.toLocaleString()}
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className={`flex items-center space-x-1 ${totalGainLoss >= 0 ? 'positive-change' : 'negative-change'}`}>
                <span>{totalGainLoss >= 0 ? '↗' : '↘'}</span>
                <span>${Math.abs(totalGainLoss).toFixed(2)}</span>
                <span>({gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%)</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Invested: ${totalInvested.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Holdings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Holdings</h2>
            {portfolio.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                Add Your First Investment
              </button>
            )}
          </div>
          
          {portfolio.length > 0 ? (
            <div className="space-y-4">
              {portfolio.map((holding, index) => (
                <div 
                  key={holding.symbol}
                  className="card-hover p-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {holding.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{getStockName(holding.symbol)}</h3>
                        <p className="text-gray-400">{holding.shares} shares</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        ${holding.currentValue.toFixed(2)}
                      </div>
                      <div className={`text-sm ${holding.totalGain >= 0 ? 'positive-change' : 'negative-change'}`}>
                        {holding.totalGain >= 0 ? '↗' : '↘'} ${Math.abs(holding.totalGain).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-white mb-2">No investments yet</h3>
              <p className="text-gray-400 mb-6">Start building your portfolio by adding your first investment</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                Add Your First Investment
              </button>
            </div>
          )}
        </div>

        {/* Watchlist */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Watchlist</h2>
            {watchlist.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Add Stocks to Track
              </button>
            )}
          </div>
          
          {watchlist.length > 0 ? (
            <div className="space-y-4">
              {watchlist.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="card-hover p-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{stock.name}</h3>
                        <p className="text-gray-400">{stock.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div className={`text-sm ${stock.changePercent >= 0 ? 'positive-change' : 'negative-change'}`}>
                        {stock.changePercent >= 0 ? '↗' : '↘'} {Math.abs(stock.changePercent).toFixed(2)}%
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: stock.symbol })}
                      className="ml-4 text-red-400 hover:text-red-300 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8">
              <div className="text-4xl mb-3">👀</div>
              <h3 className="text-lg font-bold text-white mb-2">Watchlist is empty</h3>
              <p className="text-gray-400 mb-4">Add stocks you want to track</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-outline"
              >
                Add Stocks to Track
              </button>
            </div>
          )}
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Performance</h2>
          <div className="card p-6">
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-bold text-white mb-2">Performance Chart</h3>
              <p className="text-gray-400">Interactive charts coming soon</p>
            </div>
          </div>
        </div>

        {/* Broker Integration */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Broker Connection</h2>
          <div className="card p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-lg font-bold text-white mb-2">Connect Your Broker</h3>
              <p className="text-gray-400 mb-6">Sync your real portfolio for automatic updates</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {['Robinhood', 'TD Ameritrade', 'E*TRADE', 'Fidelity'].map((broker) => (
                  <button
                    key={broker}
                    className="p-4 border border-white/20 rounded-lg hover:border-blue-500/50 hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="font-medium text-white">{broker}</div>
                  </button>
                ))}
              </div>
              <button className="btn-outline">
                Connect Broker
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card-hover p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">Add Stock to Portfolio</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">Select a stock</option>
                  {stocks.map((stock) => (
                    <option key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} - {stock.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Shares</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Average Price per Share</label>
                <input
                  type="number"
                  value={averagePrice}
                  onChange={(e) => setAveragePrice(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToPortfolio}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-colors"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default PortfolioScreen; 