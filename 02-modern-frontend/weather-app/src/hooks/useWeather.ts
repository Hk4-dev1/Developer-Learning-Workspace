// hooks/useWeather.ts - Custom hook untuk managing weather state

import { useState, useCallback } from 'react';
import { WeatherState, LocationData, TemperatureUnit } from '../types/Weather';
import { WeatherService, MockWeatherService } from '../services/weatherService';

// Check if we have a real API key or using demo mode
const isDemoMode = !process.env.REACT_APP_WEATHER_API_KEY || 
                   process.env.REACT_APP_WEATHER_API_KEY === 'demo_key';

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  location: null,
};

export const useWeather = () => {
  const [state, setState] = useState<WeatherState>(initialState);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  /**
   * Update state dengan partial updates
   */
  const updateState = useCallback((updates: Partial<WeatherState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  /**
   * Get current weather by city name
   */
  const getCurrentWeatherByCity = useCallback(async (city: string) => {
    try {
      updateState({ loading: true, error: null });
      
      const service = isDemoMode ? MockWeatherService : WeatherService;
      const weather = await service.getCurrentWeatherByCity(city);
      
      updateState({
        currentWeather: weather,
        loading: false,
        location: {
          name: weather.name,
          lat: weather.coord.lat,
          lon: weather.coord.lon,
          country: weather.sys.country,
        },
      });
      
      return weather;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      updateState({
        loading: false,
        error: errorMessage,
        currentWeather: null,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Get current weather by coordinates
   */
  const getCurrentWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    try {
      updateState({ loading: true, error: null });
      
      const weather = await WeatherService.getCurrentWeatherByCoords(lat, lon);
      
      updateState({
        currentWeather: weather,
        loading: false,
        location: {
          name: weather.name,
          lat: weather.coord.lat,
          lon: weather.coord.lon,
          country: weather.sys.country,
        },
      });
      
      return weather;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      updateState({
        loading: false,
        error: errorMessage,
        currentWeather: null,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Get 5-day forecast
   */
  const getForecast = useCallback(async (city?: string, lat?: number, lon?: number) => {
    try {
      updateState({ loading: true, error: null });
      
      const service = isDemoMode ? MockWeatherService : WeatherService;
      let forecast;
      
      if (city) {
        forecast = await service.getForecastByCity(city);
      } else if (lat !== undefined && lon !== undefined) {
        forecast = await service.getForecastByCoords(lat, lon);
      } else {
        throw new Error('Either city name or coordinates are required');
      }
      
      updateState({
        forecast,
        loading: false,
      });
      
      return forecast;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      updateState({
        loading: false,
        error: errorMessage,
        forecast: null,
      });
      throw error;
    }
  }, [updateState]);

  /**
   * Get user's current location weather
   */
  const getCurrentLocationWeather = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = 'Geolocation is not supported by this browser';
        updateState({ error });
        reject(new Error(error));
        return;
      }

      updateState({ loading: true, error: null });

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            await getCurrentWeatherByCoords(latitude, longitude);
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          let errorMessage = 'Unable to get your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          
          updateState({
            loading: false,
            error: errorMessage,
          });
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, [getCurrentWeatherByCoords, updateState]);

  /**
   * Search for locations (for autocomplete)
   */
  const searchLocations = useCallback(async (query: string): Promise<LocationData[]> => {
    try {
      if (isDemoMode) {
        // Return mock suggestions for demo
        return [
          { name: 'Jakarta', lat: -6.2088, lon: 106.8456, country: 'ID' },
          { name: 'Surabaya', lat: -7.2575, lon: 112.7521, country: 'ID' },
          { name: 'Bandung', lat: -6.9175, lon: 107.6191, country: 'ID' },
        ].filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      return await WeatherService.searchLocations(query);
    } catch (error) {
      console.error('Failed to search locations:', error);
      return [];
    }
  }, []);

  /**
   * Reset all weather data
   */
  const resetWeatherData = useCallback(() => {
    setState(initialState);
  }, []);

  /**
   * Refresh current weather data
   */
  const refreshWeatherData = useCallback(async () => {
    if (state.location) {
      try {
        await getCurrentWeatherByCity(state.location.name);
      } catch (error) {
        console.error('Failed to refresh weather data:', error);
      }
    }
  }, [state.location, getCurrentWeatherByCity]);

  return {
    // State
    ...state,
    temperatureUnit,
    isDemoMode,
    
    // Actions
    getCurrentWeatherByCity,
    getCurrentWeatherByCoords,
    getForecast,
    getCurrentLocationWeather,
    searchLocations,
    clearError,
    resetWeatherData,
    refreshWeatherData,
    setTemperatureUnit,
    
    // Utilities
    formatTemperature: (temp: number) => 
      WeatherService.formatTemperature(temp, temperatureUnit),
    formatWindSpeed: WeatherService.formatWindSpeed,
    getWindDirection: WeatherService.getWindDirection,
    getWeatherIconUrl: WeatherService.getWeatherIconUrl,
  };
};
