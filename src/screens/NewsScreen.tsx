import React from 'react';

const NewsScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="p-6 pt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            News
          </h1>
          <p className="text-gray-400">Stay updated with market insights</p>
        </div>

        <div className="space-y-6 mb-20">
          {/* Featured News */}
          <div className="card-hover p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">📈</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Tech Stocks Rally on AI Breakthrough</h3>
                <p className="text-gray-300 mb-3">Major technology companies see significant gains following breakthrough announcements in artificial intelligence research.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">2 hours ago</span>
                  <span className="text-sm text-cyan-400">Positive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Update */}
          <div className="card-hover p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">💰</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Federal Reserve Signals Rate Stability</h3>
                <p className="text-gray-300 mb-3">The Federal Reserve indicates interest rates will remain stable, providing clarity for investors and markets.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">4 hours ago</span>
                  <span className="text-sm text-green-400">Neutral</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company News */}
          <div className="card-hover p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">SpaceX Announces New Satellite Launch</h3>
                <p className="text-gray-300 mb-3">SpaceX successfully launches new batch of Starlink satellites, expanding global internet coverage.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">6 hours ago</span>
                  <span className="text-sm text-purple-400">Positive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Economic Data */}
          <div className="card-hover p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">📊</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Inflation Data Shows Cooling Trend</h3>
                <p className="text-gray-300 mb-3">Latest inflation figures indicate a cooling trend, potentially easing pressure on consumer spending.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">8 hours ago</span>
                  <span className="text-sm text-orange-400">Mixed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsScreen; 