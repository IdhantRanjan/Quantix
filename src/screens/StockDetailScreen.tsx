import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowLeft, TrendingUp, TrendingDown, MessageCircle, Share2, Bell, Plus } from 'lucide-react';
import { generateChartData } from '../data/mockData';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const StockDetailScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const { currentStock: stock } = state;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  if (!stock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Stock not found</h1>
          <button 
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const chartData = generateChartData(30);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  const handleBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };

  const handleAddToWatchlist = () => {
    dispatch({ type: 'ADD_TO_WATCHLIST', payload: stock });
  };

  const handleBuyStock = () => {
    if (!quantity || parseFloat(quantity) <= 0) return;
    
    const shares = parseFloat(quantity);
    const totalValue = shares * stock.price;
    const totalGain = 0; // No gain/loss on purchase
    const totalGainPercent = 0;

    const portfolioItem = {
      symbol: stock.symbol,
      shares: shares,
      averagePrice: stock.price,
      currentValue: totalValue,
      totalGain: totalGain,
      totalGainPercent: totalGainPercent
    };

    dispatch({ type: 'ADD_TO_PORTFOLIO', payload: portfolioItem });
    setShowBuyModal(false);
    setQuantity('');
  };

  const isInWatchlist = state.watchlist.some(watchStock => watchStock.symbol === stock.symbol);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="p-6 pt-12">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{stock.symbol}</h1>
            <p className="text-gray-400">{stock.name}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              📤
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              🔔
            </button>
          </div>
        </div>
        
        <div className="card-hover p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
              <div className={`flex items-center gap-1 text-lg ${
                stock.changePercent > 0 ? 'positive-change' : 
                stock.changePercent < 0 ? 'negative-change' : 'text-gray-400'
              }`}>
                {stock.changePercent > 0 ? '↗' : stock.changePercent < 0 ? '↘' : '→'}
                <span className="font-medium">
                  {stock.changePercent > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Market Cap</div>
              <div className="font-semibold">{stock.marketCap}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToWatchlist}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                isInWatchlist 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
              }`}
            >
              {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
            <button
              onClick={() => setShowBuyModal(true)}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-medium transition-all"
            >
              Buy Stock
            </button>
          </div>
        </div>

        {/* Match Analysis */}
        <div className="card-hover p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Match Analysis</h2>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {stock.matchPercentage}%
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-white">Why this matches you:</h3>
            <ul className="space-y-2">
              {stock.matchReasons.map((reason, index) => (
                <li key={index} className="text-gray-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Company Info */}
        <div className="card-hover p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Sector</div>
              <div className="font-semibold">{stock.sector}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">P/E Ratio</div>
              <div className="font-semibold">{stock.peRatio}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Volume</div>
              <div className="font-semibold">{stock.volume.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">52W High</div>
              <div className="font-semibold">${stock.high.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="card-hover p-6 mb-20">
          <h2 className="text-xl font-bold mb-4">AI Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <h3 className="font-semibold text-blue-300 mb-2">Recent Movement Analysis</h3>
              <p className="text-gray-300 text-sm">
                {stock.symbol} has shown strong momentum in the past week, driven by positive earnings expectations and sector rotation into {stock.sector.toLowerCase()} stocks.
              </p>
            </div>
            <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h3 className="font-semibold text-green-300 mb-2">Key Events</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Upcoming earnings report on {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</li>
                <li>• New product launch expected next quarter</li>
                <li>• Analyst upgrades from major firms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Stock Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card-hover p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">Buy {stock.symbol}</h3>
            
            <div className="space-y-4 mb-6">
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

              {quantity && parseFloat(quantity) > 0 && (
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Price per share:</span>
                    <span className="text-white">${stock.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Total shares:</span>
                    <span className="text-white">{quantity}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-600 pt-2">
                    <span className="text-gray-400">Total cost:</span>
                    <span className="text-white">${(parseFloat(quantity) * stock.price).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowBuyModal(false)}
                className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBuyStock}
                disabled={!quantity || parseFloat(quantity) <= 0}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockDetailScreen; 