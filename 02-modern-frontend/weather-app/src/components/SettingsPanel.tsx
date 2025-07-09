// components/SettingsPanel.tsx - Component for app settings and controls

import React from 'react';
import './SettingsPanel.css';
import { TemperatureUnit } from '../types/Weather';

interface SettingsPanelProps {
  temperatureUnit: TemperatureUnit;
  onTemperatureUnitChange: (unit: TemperatureUnit) => void;
  onGetCurrentLocation: () => void;
  isGettingLocation?: boolean;
  isDemoMode?: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  temperatureUnit,
  onTemperatureUnitChange,
  onGetCurrentLocation,
  isGettingLocation = false,
  isDemoMode = false
}) => {
  return (
    <div className="settings-panel">
      <div className="settings-section">
        <h4>🌡️ Temperature Unit</h4>
        <div className="unit-selector">
          <button
            className={`unit-btn ${temperatureUnit === 'celsius' ? 'active' : ''}`}
            onClick={() => onTemperatureUnitChange('celsius')}
          >
            °C
          </button>
          <button
            className={`unit-btn ${temperatureUnit === 'fahrenheit' ? 'active' : ''}`}
            onClick={() => onTemperatureUnitChange('fahrenheit')}
          >
            °F
          </button>
          <button
            className={`unit-btn ${temperatureUnit === 'kelvin' ? 'active' : ''}`}
            onClick={() => onTemperatureUnitChange('kelvin')}
          >
            K
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h4>📍 Location</h4>
        <button
          className={`location-btn ${isGettingLocation ? 'loading' : ''}`}
          onClick={onGetCurrentLocation}
          disabled={isGettingLocation}
        >
          {isGettingLocation ? (
            <>
              <span className="location-spinner"></span>
              Getting location...
            </>
          ) : (
            <>
              <span className="location-icon">🎯</span>
              Use Current Location
            </>
          )}
        </button>
        
        {isDemoMode && (
          <p className="demo-notice">
            ℹ️ Demo mode: Geolocation returns mock data
          </p>
        )}
      </div>

      {isDemoMode && (
        <div className="settings-section demo-info">
          <h4>🚀 Demo Mode</h4>
          <p>
            You're using demo mode with mock data. 
            Add your OpenWeatherMap API key to enable real weather data.
          </p>
          <details>
            <summary>How to add API key</summary>
            <ol>
              <li>Get a free API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></li>
              <li>Create a <code>.env</code> file in the project root</li>
              <li>Add: <code>REACT_APP_WEATHER_API_KEY=your_api_key_here</code></li>
              <li>Restart the development server</li>
            </ol>
          </details>
        </div>
      )}
    </div>
  );
};
