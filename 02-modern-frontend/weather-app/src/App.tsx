import React from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SettingsPanel } from './components/SettingsPanel';
import { useWeather } from './hooks/useWeather';
import { LocationData, TemperatureUnit } from './types/Weather';

function App() {
  const { 
    currentWeather, 
    forecast,
    loading, 
    error,
    location,
    temperatureUnit,
    isDemoMode,
    getCurrentWeatherByCity,
    getForecast,
    getCurrentLocationWeather,
    searchLocations,
    clearError,
    setTemperatureUnit,
    formatTemperature,
    formatWindSpeed,
    getWindDirection,
    getWeatherIconUrl
  } = useWeather();

  const handleLocationSelect = async (location: LocationData) => {
    try {
      clearError();
      await getCurrentWeatherByCity(location.name);
      // Also get forecast for the selected location
      await getForecast(location.name);
    } catch (err) {
      console.error('Failed to get weather for location:', err);
    }
  };

  const handleSearch = async (query: string): Promise<LocationData[]> => {
    try {
      return await searchLocations(query);
    } catch (err) {
      console.error('Search failed:', err);
      return [];
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      clearError();
      await getCurrentLocationWeather();
      // Also get forecast for current location
      if (location) {
        await getForecast(undefined, location.lat, location.lon);
      }
    } catch (err) {
      console.error('Failed to get current location weather:', err);
    }
  };

  const handleTemperatureUnitChange = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
  };

  const handleQuickSearch = async (cityName: string) => {
    try {
      clearError();
      await getCurrentWeatherByCity(cityName);
      await getForecast(cityName);
    } catch (err) {
      console.error('Quick search failed:', err);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌤️ Weather App</h1>
        <p>Get current weather information for any city</p>
      </header>
      
      <main className="app-main">
        <SearchBar
          onLocationSelect={handleLocationSelect}
          onSearch={handleSearch}
          isLoading={loading}
        />
        
        <SettingsPanel
          temperatureUnit={temperatureUnit}
          onTemperatureUnitChange={handleTemperatureUnitChange}
          onGetCurrentLocation={handleGetCurrentLocation}
          isGettingLocation={loading}
          isDemoMode={isDemoMode}
        />
        
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={clearError} className="error-dismiss">
              Dismiss
            </button>
          </div>
        )}
        
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}
        
        {currentWeather && !loading && (
          <WeatherCard 
            weather={currentWeather}
            formatTemperature={formatTemperature}
            formatWindSpeed={formatWindSpeed}
            getWindDirection={getWindDirection}
            getWeatherIconUrl={getWeatherIconUrl}
          />
        )}
        
        {forecast && !loading && (
          <ForecastCard
            forecast={forecast}
            formatTemperature={formatTemperature}
            getWeatherIconUrl={getWeatherIconUrl}
          />
        )}
        
        {!currentWeather && !loading && !error && (
          <div className="welcome-message">
            <h2>🔍 Search for a city to get started!</h2>
            <p>Enter any city name to see current weather conditions and 5-day forecast</p>
            <div className="quick-actions">
              <button 
                onClick={() => handleQuickSearch('London')}
                className="quick-search-btn"
              >
                Try London
              </button>
              <button 
                onClick={() => handleQuickSearch('New York')}
                className="quick-search-btn"
              >
                Try New York
              </button>
              <button 
                onClick={() => handleQuickSearch('Tokyo')}
                className="quick-search-btn"
              >
                Try Tokyo
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Built with React & TypeScript | Weather data from OpenWeatherMap</p>
        {isDemoMode && (
          <p className="demo-badge">🚀 Demo Mode - Add API key for real data</p>
        )}
      </footer>
    </div>
  );
}

export default App;
