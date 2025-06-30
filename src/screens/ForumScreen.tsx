import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockForumPosts } from '../data/mockData';

const ForumScreen: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [filter, setFilter] = useState('recent');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const niches = ['all', 'Technology', 'Healthcare', 'Finance', 'Energy', 'Real Estate'];
  const filters = ['recent', 'popular', 'controversial', 'expert'];

  const filteredPosts = mockForumPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesNiche = selectedNiche === 'all' || post.niche === selectedNiche;
    
    return matchesSearch && matchesNiche;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (filter) {
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'controversial':
        return Math.abs(b.upvotes - b.downvotes) - Math.abs(a.upvotes - a.downvotes);
      case 'expert':
        return (b.author.name.includes('Expert') ? 1 : 0) - (a.author.name.includes('Expert') ? 1 : 0);
      default: // recent
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const handlePostClick = (post: any) => {
    // In a real app, this would open a detailed post view
    console.log('Opening post:', post.title);
  };

  const handleNewPost = () => {
    // In a real app, this would open a new post form
    console.log('Creating new post');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getNicheColor = (niche: string) => {
    const colors: { [key: string]: string } = {
      'Technology': 'from-blue-500 to-purple-600',
      'Healthcare': 'from-green-500 to-teal-600',
      'Finance': 'from-yellow-500 to-orange-600',
      'Energy': 'from-red-500 to-pink-600',
      'Real Estate': 'from-indigo-500 to-blue-600'
    };
    return colors[niche] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Community Forum</h1>
          <p className="text-gray-300">Connect with fellow investors and share insights</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts, users, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-modern w-full pl-12"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {niches.map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedNiche === niche
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white neon-glow'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {niche === 'all' ? 'All Topics' : niche}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  filter === filterOption
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {sortedPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`card-hover p-6 animate-slide-up cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handlePostClick(post)}
            >
              <div className="flex items-start space-x-4">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.name.slice(0, 1).toUpperCase()}
                  </div>
                  {post.author.name.includes('Expert') && (
                    <div className="mt-1 text-center">
                      <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full">
                        Expert
                      </span>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1">{post.title}</h3>
                    <span className={`badge-primary text-xs`}>
                      {post.niche}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-3 line-clamp-2">{post.content}</p>
                  
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Related Stocks */}
                  {post.relatedStocks && post.relatedStocks.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.relatedStocks.map((stock) => (
                        <span key={stock} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30">
                          ${stock}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <span className="text-lg">👍</span>
                        <span>{post.upvotes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-lg">👎</span>
                        <span>{post.downvotes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="text-lg">💬</span>
                        <span>{post.comments?.length || 0}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedNiche('all');
                setFilter('recent');
              }}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={handleNewPost}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 neon-glow"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ForumScreen; 