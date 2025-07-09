// components/__tests__/SettingsPanel.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SettingsPanel } from '../SettingsPanel';
import { TemperatureUnit } from '../../types/Weather';

describe('SettingsPanel', () => {
  const mockOnTemperatureUnitChange = jest.fn();
  const mockOnGetCurrentLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders temperature unit selector with correct active unit', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
      />
    );

    expect(screen.getByText('🌡️ Temperature Unit')).toBeInTheDocument();
    
    const celsiusBtn = screen.getByText('°C');
    const fahrenheitBtn = screen.getByText('°F');
    const kelvinBtn = screen.getByText('K');

    expect(celsiusBtn).toHaveClass('active');
    expect(fahrenheitBtn).not.toHaveClass('active');
    expect(kelvinBtn).not.toHaveClass('active');
  });

  it('calls onTemperatureUnitChange when unit buttons are clicked', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
      />
    );

    const fahrenheitBtn = screen.getByText('°F');
    fireEvent.click(fahrenheitBtn);

    expect(mockOnTemperatureUnitChange).toHaveBeenCalledWith('fahrenheit');
  });

  it('renders location button', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
      />
    );

    expect(screen.getByText('📍 Location')).toBeInTheDocument();
    expect(screen.getByText('Use Current Location')).toBeInTheDocument();
  });

  it('calls onGetCurrentLocation when location button is clicked', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
      />
    );

    const locationBtn = screen.getByText('Use Current Location');
    fireEvent.click(locationBtn);

    expect(mockOnGetCurrentLocation).toHaveBeenCalled();
  });

  it('shows loading state when getting location', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
        isGettingLocation={true}
      />
    );

    expect(screen.getByText('Getting location...')).toBeInTheDocument();
    const locationBtn = screen.getByRole('button', { name: /getting location/i });
    expect(locationBtn).toBeDisabled();
  });

  it('shows demo mode information when in demo mode', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
        isDemoMode={true}
      />
    );

    expect(screen.getByText('ℹ️ Demo mode: Geolocation returns mock data')).toBeInTheDocument();
    expect(screen.getByText('🚀 Demo Mode')).toBeInTheDocument();
    expect(screen.getByText(/Add your OpenWeatherMap API key/)).toBeInTheDocument();
  });

  it('does not show demo information in normal mode', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
        isDemoMode={false}
      />
    );

    expect(screen.queryByText('🚀 Demo Mode')).not.toBeInTheDocument();
    expect(screen.queryByText(/Demo mode: Geolocation returns mock data/)).not.toBeInTheDocument();
  });

  it('shows API key setup instructions in demo mode', () => {
    render(
      <SettingsPanel
        temperatureUnit="celsius"
        onTemperatureUnitChange={mockOnTemperatureUnitChange}
        onGetCurrentLocation={mockOnGetCurrentLocation}
        isDemoMode={true}
      />
    );

    // Click to expand the details
    const summary = screen.getByText('How to add API key');
    fireEvent.click(summary);

    expect(screen.getByText('Get a free API key from')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Create a .env file in the project root';
    })).toBeInTheDocument();
    expect(screen.getByText(/REACT_APP_WEATHER_API_KEY/)).toBeInTheDocument();
  });
});
