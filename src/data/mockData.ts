import { Stock, NewsItem, ForumPost, Sector, InvestmentStyle, SwipeCard } from '../types';

export const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    sector: "Technology",
    marketCap: "2.8T",
    peRatio: 28.7,
    matchPercentage: 87,
    matchReasons: ["Tech sector match", "Large cap preference", "Strong fundamentals"],
    volume: 45678900,
    high: 176.20,
    low: 173.80,
    open: 174.50,
    previousClose: 173.28,
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    companyInfo: {
      founded: 1976,
      employees: 164000,
      headquarters: "Cupertino, CA",
      website: "apple.com",
      industry: "Consumer Electronics"
    }
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.50,
    change: -5.20,
    changePercent: -2.05,
    sector: "Automotive",
    marketCap: "789B",
    peRatio: 65.2,
    matchPercentage: 92,
    matchReasons: ["Innovation focus", "Growth potential", "ESG alignment"],
    volume: 23456700,
    high: 252.30,
    low: 246.80,
    open: 250.10,
    previousClose: 253.70,
    description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.",
    companyInfo: {
      founded: 2003,
      employees: 127855,
      headquarters: "Austin, TX",
      website: "tesla.com",
      industry: "Automotive"
    }
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 3.45,
    changePercent: 0.92,
    sector: "Technology",
    marketCap: "2.9T",
    peRatio: 35.8,
    matchPercentage: 85,
    matchReasons: ["Tech sector match", "Cloud computing leader", "Stable growth"],
    volume: 23456700,
    high: 380.20,
    low: 376.50,
    open: 377.30,
    previousClose: 375.40,
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
    companyInfo: {
      founded: 1975,
      employees: 221000,
      headquarters: "Redmond, WA",
      website: "microsoft.com",
      industry: "Software"
    }
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 162.30,
    change: 0.85,
    changePercent: 0.53,
    sector: "Healthcare",
    marketCap: "392B",
    peRatio: 15.2,
    matchPercentage: 78,
    matchReasons: ["Healthcare sector", "Dividend income", "Conservative choice"],
    volume: 12345600,
    high: 163.10,
    low: 161.80,
    open: 162.50,
    previousClose: 161.45,
    description: "Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field worldwide.",
    companyInfo: {
      founded: 1886,
      employees: 152700,
      headquarters: "New Brunswick, NJ",
      website: "jnj.com",
      industry: "Healthcare"
    }
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 485.09,
    change: 12.45,
    changePercent: 2.64,
    sector: "Technology",
    marketCap: "1.2T",
    peRatio: 45.6,
    matchPercentage: 94,
    matchReasons: ["AI revolution", "High growth potential", "Tech leadership"],
    volume: 34567800,
    high: 487.30,
    low: 480.20,
    open: 482.50,
    previousClose: 472.64,
    description: "NVIDIA Corporation operates as a visual computing company worldwide.",
    companyInfo: {
      founded: 1993,
      employees: 26400,
      headquarters: "Santa Clara, CA",
      website: "nvidia.com",
      industry: "Semiconductors"
    }
  }
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple Reports Record Q4 Earnings, iPhone Sales Surge",
    summary: "Apple Inc. reported record-breaking fourth-quarter earnings with iPhone sales exceeding expectations...",
    source: "Bloomberg",
    timestamp: "2024-01-15T10:30:00Z",
    url: "#",
    sentiment: "positive",
    relatedStocks: ["AAPL"],
    category: "Earnings"
  },
  {
    id: "2",
    title: "Tesla Announces New Gigafactory in Mexico",
    summary: "Tesla has announced plans to build a new Gigafactory in Mexico, expanding its global manufacturing footprint...",
    source: "Reuters",
    timestamp: "2024-01-15T09:15:00Z",
    url: "#",
    sentiment: "positive",
    relatedStocks: ["TSLA"],
    category: "Company News"
  },
  {
    id: "3",
    title: "Microsoft Cloud Services Revenue Grows 25%",
    summary: "Microsoft's cloud computing division continues strong growth, with Azure revenue increasing 25% year-over-year...",
    source: "CNBC",
    timestamp: "2024-01-15T08:45:00Z",
    url: "#",
    sentiment: "positive",
    relatedStocks: ["MSFT"],
    category: "Technology"
  },
  {
    id: "4",
    title: "Federal Reserve Signals Potential Rate Cuts",
    summary: "The Federal Reserve has indicated it may consider interest rate cuts in the coming months...",
    source: "Wall Street Journal",
    timestamp: "2024-01-15T07:30:00Z",
    url: "#",
    sentiment: "neutral",
    relatedStocks: [],
    category: "Market News"
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: "1",
    title: "What's your take on NVIDIA's AI dominance?",
    content: "With the AI revolution in full swing, NVIDIA seems to be the clear winner. What are your thoughts on their long-term prospects?",
    author: {
      id: "user1",
      name: "TechInvestor",
      age: 28,
      sectors: ["Technology"],
      riskTolerance: "aggressive",
      investmentStyle: ["Growth Investing"],
      portfolio: [],
      watchlist: ["NVDA", "AAPL"],
      preferences: { notifications: true, darkMode: false, emailUpdates: true }
    },
    timestamp: "2024-01-15T11:00:00Z",
    upvotes: 45,
    downvotes: 3,
    comments: [],
    tags: ["AI", "Technology", "Growth"],
    relatedStocks: ["NVDA"],
    niche: "Technology"
  },
  {
    id: "2",
    title: "Dividend investing strategy for beginners",
    content: "I'm new to dividend investing and looking for advice on building a stable income portfolio. Any recommendations?",
    author: {
      id: "user2",
      name: "DividendSeeker",
      age: 35,
      sectors: ["Healthcare", "Utilities"],
      riskTolerance: "conservative",
      investmentStyle: ["Dividend Income"],
      portfolio: [],
      watchlist: ["JNJ", "KO"],
      preferences: { notifications: true, darkMode: true, emailUpdates: false }
    },
    timestamp: "2024-01-15T10:30:00Z",
    upvotes: 32,
    downvotes: 1,
    comments: [],
    tags: ["Dividends", "Income", "Beginners"],
    relatedStocks: ["JNJ"],
    niche: "Income Investing"
  }
];

export const sectors: Sector[] = [
  {
    name: "Technology",
    icon: "💻",
    description: "Innovation-driven companies in software, hardware, and digital services",
    companies: ["AAPL", "MSFT", "GOOGL", "NVDA"],
    riskLevel: "medium"
  },
  {
    name: "Healthcare",
    icon: "🏥",
    description: "Medical, pharmaceutical, and biotechnology companies",
    companies: ["JNJ", "PFE", "UNH", "ABBV"],
    riskLevel: "low"
  },
  {
    name: "Finance",
    icon: "🏦",
    description: "Banks, insurance, and financial services",
    companies: ["JPM", "BAC", "WFC", "GS"],
    riskLevel: "medium"
  },
  {
    name: "Energy",
    icon: "⚡",
    description: "Oil, gas, renewable energy, and utilities",
    companies: ["XOM", "CVX", "NEE", "DUK"],
    riskLevel: "medium"
  },
  {
    name: "Real Estate",
    icon: "🏠",
    description: "Real estate investment trusts and property companies",
    companies: ["SPG", "PLD", "AMT", "EQIX"],
    riskLevel: "medium"
  },
  {
    name: "Consumer Goods",
    icon: "🛍️",
    description: "Retail, consumer products, and discretionary spending",
    companies: ["AMZN", "WMT", "HD", "NKE"],
    riskLevel: "medium"
  },
  {
    name: "Transportation",
    icon: "🚗",
    description: "Automotive, airlines, and logistics",
    companies: ["TSLA", "F", "GM", "DAL"],
    riskLevel: "high"
  },
  {
    name: "Entertainment",
    icon: "🎬",
    description: "Media, gaming, and entertainment companies",
    companies: ["NFLX", "DIS", "ATVI", "SPOT"],
    riskLevel: "high"
  },
  {
    name: "Utilities",
    icon: "⚡",
    description: "Electric, gas, and water utilities",
    companies: ["NEE", "DUK", "SO", "D"],
    riskLevel: "low"
  },
  {
    name: "Materials",
    icon: "🏗️",
    description: "Mining, chemicals, and construction materials",
    companies: ["RIO", "BHP", "LIN", "APD"],
    riskLevel: "high"
  }
];

export const investmentStyles: InvestmentStyle[] = [
  {
    name: "Conservative/Low Risk",
    icon: "🛡️",
    description: "Focus on stable, dividend-paying stocks with low volatility",
    riskLevel: "low",
    timeHorizon: "10+ years"
  },
  {
    name: "Moderate Risk",
    icon: "⚖️",
    description: "Balanced approach with mix of growth and value stocks",
    riskLevel: "medium",
    timeHorizon: "5-10 years"
  },
  {
    name: "Aggressive/High Risk",
    icon: "🚀",
    description: "High-growth stocks with potential for significant returns",
    riskLevel: "high",
    timeHorizon: "3-5 years"
  },
  {
    name: "Long-term Growth",
    icon: "📈",
    description: "Companies with strong growth potential over decades",
    riskLevel: "medium",
    timeHorizon: "15+ years"
  },
  {
    name: "Dividend Income",
    icon: "💰",
    description: "Focus on companies that pay regular dividends",
    riskLevel: "low",
    timeHorizon: "10+ years"
  },
  {
    name: "Day Trading",
    icon: "⚡",
    description: "Short-term trading based on daily market movements",
    riskLevel: "high",
    timeHorizon: "1 day"
  },
  {
    name: "Value Investing",
    icon: "💎",
    description: "Finding undervalued stocks with strong fundamentals",
    riskLevel: "medium",
    timeHorizon: "5-10 years"
  },
  {
    name: "ESG/Sustainable",
    icon: "🌱",
    description: "Investing in companies with strong environmental and social practices",
    riskLevel: "medium",
    timeHorizon: "10+ years"
  }
];

export const swipeCards: SwipeCard[] = [
  {
    id: "1",
    type: "sector",
    title: "Technology",
    description: "Innovation-driven companies leading the digital revolution",
    icon: "💻",
    riskLevel: "medium",
    companies: ["AAPL", "MSFT", "GOOGL", "NVDA"]
  },
  {
    id: "2",
    type: "sector",
    title: "Healthcare",
    description: "Medical and pharmaceutical companies focused on improving lives",
    icon: "🏥",
    riskLevel: "low",
    companies: ["JNJ", "PFE", "UNH", "ABBV"]
  },
  {
    id: "3",
    type: "style",
    title: "Growth Investing",
    description: "High-potential companies with strong revenue growth",
    icon: "📈",
    riskLevel: "high"
  },
  {
    id: "4",
    type: "style",
    title: "Dividend Income",
    description: "Stable companies that pay regular dividends",
    icon: "💰",
    riskLevel: "low"
  }
];

export const generateChartData = (days: number = 30): { date: string; price: number; volume: number }[] => {
  const data: { date: string; price: number; volume: number }[] = [];
  const basePrice = 100;
  const baseVolume = 1000000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * 0.1; // ±5% daily change
    const price = basePrice * (1 + randomChange);
    const volume = baseVolume * (0.5 + Math.random() * 1); // 50-150% of base volume
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(volume)
    });
  }
  
  return data;
}; 