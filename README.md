# Quantix - Find Your Niche

A revolutionary mobile-first React web application that combines Tinder-style swiping, Reddit-style community discussions, and TradingView-style charts to help users discover their investing niche through personalized stock recommendations and community learning.

## 🚀 Features

### Core Features
- **Personalized Investment Matching**: AI-powered stock recommendations based on user preferences
- **Tinder-Style Swiping**: Interactive card-based interface for discovering investment opportunities
- **Reddit-Style Community**: Forum discussions with upvoting, comments, and niche categorization
- **TradingView-Style Charts**: Interactive financial charts using Recharts library
- **Mobile-First Design**: Optimized for mobile devices with responsive design

### Screens & Navigation
- **Welcome/Splash Screen**: Animated introduction with gradient background
- **Onboarding Flow**: Multi-step user preference collection
- **Home Dashboard**: Personalized recommendations, news, and trending discussions
- **Stock Detail**: Comprehensive stock analysis with charts and AI insights
- **Community Forum**: Reddit-style discussions with niche filtering
- **Portfolio Management**: Holdings, watchlist, and performance tracking
- **News Feed**: Market headlines with sentiment analysis
- **Settings**: User preferences and account management

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Context + useReducer**: Advanced state management
- **Tailwind CSS**: Modern, utility-first styling
- **Lucide React**: Consistent iconography
- **Recharts**: Interactive financial visualizations
- **Mobile-First**: Responsive design optimized for mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Charts**: Recharts library
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📱 Mobile-First Design

The app is designed with mobile devices in mind, featuring:
- Touch-friendly interface elements (44px minimum touch targets)
- Swipeable components for mobile interaction
- Optimized typography for mobile reading
- Proper spacing and padding for touch interfaces
- Responsive design that works on all screen sizes

## 🎨 Design System

### Color Palette
- **Primary**: Modern blue (#0066CC)
- **Secondary**: Purple accent (#8B5CF6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Background**: Light gray (#F9FAFB)
- **Text**: High contrast for accessibility

### Components
- Custom button styles with hover effects
- Card components with shadows and rounded corners
- Gradient backgrounds and text effects
- Smooth animations and transitions
- Consistent spacing and typography

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quantix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the app

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── BottomNavigation.tsx
├── context/            # React Context for state management
│   └── AppContext.tsx
├── data/               # Mock data and utilities
│   └── mockData.ts
├── screens/            # Main application screens
│   ├── WelcomeScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── StockDetailScreen.tsx
│   ├── ForumScreen.tsx
│   ├── PortfolioScreen.tsx
│   ├── NewsScreen.tsx
│   └── SettingsScreen.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Key Features Explained

### 1. Recommendation Algorithm
The app uses a simulated recommendation algorithm that calculates match percentages based on:
- Sector preferences (40%)
- Risk tolerance (30%)
- Investment style (20%)
- Market trends (10%)

### 2. Onboarding Flow
- **Step 1**: Basic user information (name, age)
- **Step 2**: Interest discovery (sectors and investment styles)
- **Step 3**: Tinder-style swiping interface for preference refinement
- **Step 4**: Profile completion and entry to main app

### 3. Community Features
- Reddit-style forum with upvoting/downvoting
- Niche-based categorization
- User profiles and reputation
- Related stock discussions

### 4. Portfolio Management
- Holdings tracking with gain/loss calculations
- Watchlist functionality
- Performance charts (placeholder for future implementation)
- Broker integration (UI only)

## 🔧 Customization

### Adding New Stocks
Edit `src/data/mockData.ts` to add new stocks to the mock data:

```typescript
export const mockStocks: Stock[] = [
  {
    symbol: "NEW",
    name: "New Company Inc.",
    price: 100.00,
    change: 2.50,
    changePercent: 2.56,
    sector: "Technology",
    marketCap: "1B",
    peRatio: 25.0,
    matchPercentage: 85,
    matchReasons: ["Tech sector match", "Growth potential"],
    // ... other properties
  }
];
```

### Modifying Styles
The app uses Tailwind CSS with custom components. Edit `src/index.css` to modify the design system:

```css
@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200;
  }
}
```

## 🎨 Animations

The app includes several custom animations:
- **Pulse Effect**: Subtle pulsing for logos and important elements
- **Fade In**: Smooth fade-in animations for content
- **Slide Up**: Content slides up from bottom
- **Bounce Gentle**: Gentle bouncing for interactive elements
- **Swipe Animations**: Smooth card transitions

## 📱 Mobile Optimization

- Touch-friendly buttons and interactive elements
- Swipe gestures for card interactions
- Optimized font sizes and spacing
- Responsive grid layouts
- Mobile-first navigation

## 🔮 Future Enhancements

- Real-time stock data integration
- Advanced charting capabilities
- Push notifications
- Social features (following users, sharing portfolios)
- Advanced portfolio analytics
- Broker API integrations
- Dark mode implementation
- Offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Recharts** for the excellent charting library
- **Lucide React** for the beautiful icons
- **Tailwind CSS** for the utility-first CSS framework
- **Create React App** for the development setup

---

**Quantix** - Find Your Niche in the World of Investing! 📈 