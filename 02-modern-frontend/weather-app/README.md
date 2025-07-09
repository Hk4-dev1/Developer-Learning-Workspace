# 🌤️ Modern Weather App

A beautiful, responsive weather application built with React and TypeScript. This project demonstrates modern React patterns, API integration, custom hooks, and professional UI design.

![Weather App Demo](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-blue)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Weather Data**: Current weather conditions and 5-day forecast
- **Smart Location Search**: Autocomplete search with debounced API calls
- **Geolocation Support**: Get weather for your current location
- **Multiple Temperature Units**: Celsius, Fahrenheit, and Kelvin
- **Demo Mode**: Works without API key using mock data

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Gradients**: Eye-catching color schemes
- **Smooth Animations**: Loading states and hover effects
- **Accessible**: Keyboard navigation and screen reader friendly
- **Glass Morphism**: Modern backdrop blur effects

### ⚡ Technical Highlights
- **Custom Hooks**: Reusable logic for weather data and search
- **TypeScript**: Full type safety and intellisense
- **Error Handling**: Graceful error states and user feedback
- **Performance**: Optimized API calls and React rendering
- **Testing**: Comprehensive unit tests for components

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your OpenWeatherMap API key
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Key Setup

### Getting Your Free API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### Setting Up the Environment

Create a `.env` file in the project root:

```env
REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
```

**Note**: The app works in demo mode without an API key, showing mock weather data.

## 📱 Demo Mode

When no API key is provided, the app automatically switches to demo mode:

- ✅ Full UI functionality
- ✅ Realistic mock weather data
- ✅ All interactive features work
- ✅ Perfect for development and testing

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in coverage mode
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage
- **Components**: UI rendering and user interactions
- **Hooks**: Custom hook logic and state management
- **Services**: API integration and error handling
- **Types**: TypeScript type definitions

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── SearchBar/       # Location search with autocomplete
│   ├── WeatherCard/     # Current weather display
│   ├── ForecastCard/    # 5-day forecast display
│   ├── SettingsPanel/   # App settings and controls
│   └── __tests__/       # Component tests
├── hooks/               # Custom React hooks
│   ├── useWeather.ts    # Weather data management
│   └── useSearch.ts     # Search functionality
├── services/            # API integration
│   └── weatherService.ts # Weather API calls
├── types/               # TypeScript definitions
│   └── Weather.ts       # Weather-related types
└── styles/              # CSS modules and global styles
```

## 🎨 Features in Detail

### Smart Search
- **Autocomplete**: Real-time location suggestions
- **Debouncing**: Optimized API calls
- **Keyboard Navigation**: Arrow keys and Enter support
- **Recent Searches**: Quick access to previous searches

### Weather Display
- **Current Conditions**: Temperature, humidity, wind, visibility
- **5-Day Forecast**: Daily weather predictions
- **Weather Icons**: Visual weather condition indicators
- **Detailed Metrics**: Feels like, pressure, sunrise/sunset

### Settings Panel
- **Temperature Units**: Toggle between °C, °F, and K
- **Geolocation**: One-click current location weather
- **Demo Mode Info**: Clear indication of demo vs. real data

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_WEATHER_API_KEY`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variable in Vercel dashboard

## 📚 Learning Objectives

This project demonstrates:

### React Concepts
- ✅ Functional components with hooks
- ✅ Custom hooks for logic reuse
- ✅ Context and state management
- ✅ Error boundaries and error handling
- ✅ Performance optimization techniques

### TypeScript Integration
- ✅ Strict type checking
- ✅ Interface definitions
- ✅ Generic types and utility types
- ✅ Proper type inference

### Modern Development
- ✅ API integration with axios
- ✅ Responsive CSS design
- ✅ Environment variable configuration
- ✅ Unit testing with Jest and React Testing Library
- ✅ Git workflow and version control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Create React App](https://create-react-app.dev/) for project scaffolding
- React and TypeScript communities for excellent documentation

---

**Built with ❤️ as part of the Modern Frontend Development Learning Path**
