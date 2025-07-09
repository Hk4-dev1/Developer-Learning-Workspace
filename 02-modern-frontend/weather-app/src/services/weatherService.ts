// services/weatherService.ts - Service untuk komunikasi dengan OpenWeatherMap API

import axios from 'axios';
import { CurrentWeather, WeatherForecast, LocationData } from '../types/Weather';

// OpenWeatherMap API base URL
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Untuk demo, kita gunakan API key gratis dari OpenWeatherMap
// Di production, API key harus disimpan di environment variables
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';

// Instance axios dengan konfigurasi default
const weatherApi = axios.create({
  timeout: 10000, // 10 detik timeout
});

/**
 * Service class untuk menghandle semua API calls terkait weather
 */
export class WeatherService {
  /**
   * Get current weather by city name
   */
  static async getCurrentWeatherByCity(city: string): Promise<CurrentWeather> {
    try {
      const response = await weatherApi.get<CurrentWeather>(
        `${BASE_URL}/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric', // Celsius by default
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to fetch weather data'
        );
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Get current weather by coordinates
   */
  static async getCurrentWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<CurrentWeather> {
    try {
      const response = await weatherApi.get<CurrentWeather>(
        `${BASE_URL}/weather`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to fetch weather data'
        );
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Get 5-day weather forecast by city name
   */
  static async getForecastByCity(city: string): Promise<WeatherForecast> {
    try {
      const response = await weatherApi.get<WeatherForecast>(
        `${BASE_URL}/forecast`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to fetch forecast data'
        );
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Get 5-day weather forecast by coordinates
   */
  static async getForecastByCoords(
    lat: number,
    lon: number
  ): Promise<WeatherForecast> {
    try {
      const response = await weatherApi.get<WeatherForecast>(
        `${BASE_URL}/forecast`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to fetch forecast data'
        );
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Search for locations by name (for autocomplete)
   */
  static async searchLocations(query: string): Promise<LocationData[]> {
    if (query.length < 2) return [];

    try {
      const response = await weatherApi.get<LocationData[]>(
        `${GEO_URL}/direct`,
        {
          params: {
            q: query,
            limit: 5,
            appid: API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to search locations');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Get location name from coordinates (reverse geocoding)
   */
  static async getLocationFromCoords(
    lat: number,
    lon: number
  ): Promise<LocationData[]> {
    try {
      const response = await weatherApi.get<LocationData[]>(
        `${GEO_URL}/reverse`,
        {
          params: {
            lat,
            lon,
            limit: 1,
            appid: API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to get location data');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * Get weather icon URL
   */
  static getWeatherIconUrl(icon: string, size: '2x' | '4x' = '2x'): string {
    return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
  }

  /**
   * Format temperature based on unit
   */
  static formatTemperature(
    temp: number,
    unit: 'celsius' | 'fahrenheit' | 'kelvin' = 'celsius'
  ): string {
    switch (unit) {
      case 'fahrenheit':
        return `${Math.round((temp * 9) / 5 + 32)}°F`;
      case 'kelvin':
        return `${Math.round(temp + 273.15)}K`;
      default:
        return `${Math.round(temp)}°C`;
    }
  }

  /**
   * Convert wind speed from m/s to km/h
   */
  static formatWindSpeed(speed: number): string {
    return `${Math.round(speed * 3.6)} km/h`;
  }

  /**
   * Get wind direction from degrees
   */
  static getWindDirection(degrees: number): string {
    const directions = [
      'N', 'NNE', 'NE', 'ENE',
      'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW',
      'W', 'WNW', 'NW', 'NNW'
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }
}

/**
 * Utility functions for demo mode (jika tidak ada API key)
 */
export class MockWeatherService {
  static async getCurrentWeatherByCity(city: string): Promise<CurrentWeather> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      coord: { lat: -6.2088, lon: 106.8456 },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d'
        }
      ],
      base: 'stations',
      main: {
        temp: 32,
        feels_like: 36,
        temp_min: 28,
        temp_max: 35,
        pressure: 1013,
        humidity: 78
      },
      visibility: 10000,
      wind: {
        speed: 3.5,
        deg: 230
      },
      clouds: {
        all: 20
      },
      dt: Date.now() / 1000,
      sys: {
        country: 'ID',
        sunrise: 1640993400,
        sunset: 1641037800
      },
      timezone: 25200,
      id: 1642911,
      name: city,
      cod: 200
    };
  }

  static async getCurrentWeatherByCoords(lat: number, lon: number): Promise<CurrentWeather> {
    return this.getCurrentWeatherByCity('Demo Location');
  }

  static async getForecastByCity(city: string): Promise<WeatherForecast> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const now = new Date();
    const forecastList = [];
    
    // Generate 5 days of forecast data (8 entries per day, every 3 hours)
    for (let day = 0; day < 5; day++) {
      for (let hour = 0; hour < 8; hour++) {
        const dateTime = new Date(now);
        dateTime.setDate(now.getDate() + day);
        dateTime.setHours(hour * 3, 0, 0, 0);
        
        const tempVariation = Math.sin((hour * 3) / 24 * Math.PI * 2) * 8; // Daily temp cycle
        const baseTemp = 28 + Math.random() * 6; // 28-34°C base range
        
        forecastList.push({
          dt: dateTime.getTime() / 1000,
          main: {
            temp: baseTemp + tempVariation,
            feels_like: baseTemp + tempVariation + 3,
            temp_min: baseTemp + tempVariation - 2,
            temp_max: baseTemp + tempVariation + 2,
            pressure: 1010 + Math.random() * 10,
            humidity: 65 + Math.random() * 20
          },
          weather: [
            {
              id: 800 + Math.floor(Math.random() * 4),
              main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
              description: ['clear sky', 'few clouds', 'light rain'][Math.floor(Math.random() * 3)],
              icon: ['01d', '02d', '10d'][Math.floor(Math.random() * 3)]
            }
          ],
          clouds: {
            all: Math.floor(Math.random() * 50)
          },
          wind: {
            speed: 2 + Math.random() * 5,
            deg: Math.floor(Math.random() * 360)
          },
          visibility: 10000,
          pop: Math.random() * 0.3, // 0-30% chance of precipitation
          sys: {
            pod: hour * 3 >= 6 && hour * 3 <= 18 ? 'd' : 'n'
          },
          dt_txt: dateTime.toISOString().replace('T', ' ').substring(0, 19)
        });
      }
    }
    
    return {
      cod: '200',
      message: 0,
      cnt: forecastList.length,
      list: forecastList,
      city: {
        id: 1642911,
        name: city,
        coord: { lat: -6.2088, lon: 106.8456 },
        country: 'ID',
        population: 10000000,
        timezone: 25200,
        sunrise: Math.floor(Date.now() / 1000) + 6 * 3600,
        sunset: Math.floor(Date.now() / 1000) + 18 * 3600
      }
    };
  }

  static async getForecastByCoords(lat: number, lon: number): Promise<WeatherForecast> {
    return this.getForecastByCity('Demo Location');
  }

  static async searchLocations(query: string): Promise<LocationData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockLocations = [
      { name: 'Jakarta', lat: -6.2088, lon: 106.8456, country: 'ID' },
      { name: 'Surabaya', lat: -7.2575, lon: 112.7521, country: 'ID' },
      { name: 'Bandung', lat: -6.9175, lon: 107.6191, country: 'ID' },
      { name: 'London', lat: 51.5074, lon: -0.1278, country: 'GB' },
      { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'US' },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'JP' }
    ];
    
    return mockLocations.filter(location =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
