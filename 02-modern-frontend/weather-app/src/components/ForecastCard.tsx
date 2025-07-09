// components/ForecastCard.tsx - Component for displaying weather forecast

import React from 'react';
import './ForecastCard.css';
import { WeatherForecast, ForecastItem } from '../types/Weather';

interface ForecastCardProps {
  forecast: WeatherForecast;
  formatTemperature: (temp: number) => string;
  getWeatherIconUrl: (icon: string) => string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  forecast,
  formatTemperature,
  getWeatherIconUrl
}) => {
  // Group forecast items by date (take one per day, preferably noon time)
  const getDailyForecast = (forecastList: ForecastItem[]): ForecastItem[] => {
    const dailyMap = new Map<string, ForecastItem>();
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const hour = date.getHours();
      
      // Prefer noon time (12:00) for daily forecast, or closest to noon
      if (!dailyMap.has(dateKey) || 
          Math.abs(hour - 12) < Math.abs(new Date(dailyMap.get(dateKey)!.dt * 1000).getHours() - 12)) {
        dailyMap.set(dateKey, item);
      }
    });
    
    return Array.from(dailyMap.values()).slice(0, 5); // Next 5 days
  };

  const dailyForecast = getDailyForecast(forecast.list);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatDay = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="forecast-card">
      <div className="forecast-header">
        <h3>📅 5-Day Forecast</h3>
        <p className="forecast-location">{forecast.city.name}, {forecast.city.country}</p>
      </div>
      
      <div className="forecast-list">
        {dailyForecast.map((item, index) => (
          <div key={item.dt} className="forecast-item">
            <div className="forecast-date">
              <span className="forecast-day">{formatDate(item.dt)}</span>
              <span className="forecast-full-date">{formatDay(item.dt)}</span>
            </div>
            
            <div className="forecast-weather">
              <img 
                src={getWeatherIconUrl(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="forecast-icon"
              />
              <span className="forecast-description">
                {item.weather[0].description}
              </span>
            </div>
            
            <div className="forecast-temps">
              <span className="forecast-temp-high">
                {formatTemperature(item.main.temp_max)}
              </span>
              <span className="forecast-temp-low">
                {formatTemperature(item.main.temp_min)}
              </span>
            </div>
            
            <div className="forecast-details">
              <div className="forecast-detail">
                <span className="detail-icon">💧</span>
                <span>{item.main.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <span className="detail-icon">🌬️</span>
                <span>{Math.round(item.wind.speed)} m/s</span>
              </div>
              {item.pop > 0 && (
                <div className="forecast-detail">
                  <span className="detail-icon">☔</span>
                  <span>{Math.round(item.pop * 100)}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
