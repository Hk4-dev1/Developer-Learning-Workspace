// components/WeatherCard.tsx - Main weather display component

import React from 'react';
import { CurrentWeather } from '../types/Weather';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: CurrentWeather;
  formatTemperature: (temp: number) => string;
  formatWindSpeed: (speed: number) => string;
  getWindDirection: (degrees: number) => string;
  getWeatherIconUrl: (icon: string, size?: '2x' | '4x') => string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  formatTemperature,
  formatWindSpeed,
  getWindDirection,
  getWeatherIconUrl,
}) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getVisibilityText = (visibility: number) => {
    const km = visibility / 1000;
    if (km >= 10) return 'Excellent';
    if (km >= 5) return 'Good';
    if (km >= 2) return 'Moderate';
    return 'Poor';
  };

  return (
    <div className="weather-card">
      {/* Main weather info */}
      <div className="weather-main">
        <div className="weather-location">
          <h2 className="city-name">{weather.name}</h2>
          <p className="country-name">{weather.sys.country}</p>
          <p className="last-updated">
            Last updated: {formatTime(weather.dt)}
          </p>
        </div>
        
        <div className="weather-current">
          <div className="weather-icon-container">
            <img
              src={getWeatherIconUrl(weather.weather[0].icon, '4x')}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
          </div>
          
          <div className="weather-temp">
            <span className="temperature">
              {formatTemperature(weather.main.temp)}
            </span>
            <p className="weather-description">
              {weather.weather[0].description}
            </p>
            <p className="feels-like">
              Feels like {formatTemperature(weather.main.feels_like)}
            </p>
          </div>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <div className="detail-label">High / Low</div>
            <div className="detail-value">
              {formatTemperature(weather.main.temp_max)} / {formatTemperature(weather.main.temp_min)}
            </div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{weather.main.humidity}%</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌬️</div>
          <div className="detail-content">
            <div className="detail-label">Wind</div>
            <div className="detail-value">
              {formatWindSpeed(weather.wind.speed)} {getWindDirection(weather.wind.deg)}
            </div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🏔️</div>
          <div className="detail-content">
            <div className="detail-label">Pressure</div>
            <div className="detail-value">{weather.main.pressure} hPa</div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <div className="detail-label">Visibility</div>
            <div className="detail-value">
              {(weather.visibility / 1000).toFixed(1)} km
              <span className="visibility-status">
                ({getVisibilityText(weather.visibility)})
              </span>
            </div>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">☁️</div>
          <div className="detail-content">
            <div className="detail-label">Cloudiness</div>
            <div className="detail-value">{weather.clouds.all}%</div>
          </div>
        </div>
      </div>

      {/* Sun times */}
      <div className="sun-times">
        <div className="sun-time-item">
          <div className="sun-icon">🌅</div>
          <div className="sun-content">
            <div className="sun-label">Sunrise</div>
            <div className="sun-value">{formatTime(weather.sys.sunrise)}</div>
          </div>
        </div>
        
        <div className="sun-time-item">
          <div className="sun-icon">🌇</div>
          <div className="sun-content">
            <div className="sun-label">Sunset</div>
            <div className="sun-value">{formatTime(weather.sys.sunset)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
