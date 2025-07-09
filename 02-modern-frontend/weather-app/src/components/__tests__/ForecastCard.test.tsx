// components/__tests__/ForecastCard.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForecastCard } from '../ForecastCard';
import { WeatherForecast } from '../../types/Weather';

// Mock forecast data
const mockForecast: WeatherForecast = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: Date.now() / 1000,
      main: {
        temp: 25,
        feels_like: 27,
        temp_min: 20,
        temp_max: 30,
        pressure: 1013,
        humidity: 65
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      clouds: { all: 0 },
      wind: { speed: 3.5, deg: 180 },
      visibility: 10000,
      pop: 0.1,
      sys: { pod: 'd' },
      dt_txt: '2023-12-25 12:00:00'
    },
    {
      dt: (Date.now() / 1000) + 86400, // +1 day
      main: {
        temp: 22,
        feels_like: 24,
        temp_min: 18,
        temp_max: 26,
        pressure: 1015,
        humidity: 70
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d'
        }
      ],
      clouds: { all: 20 },
      wind: { speed: 2.8, deg: 200 },
      visibility: 10000,
      pop: 0.2,
      sys: { pod: 'd' },
      dt_txt: '2023-12-26 12:00:00'
    }
  ],
  city: {
    id: 1642911,
    name: 'Jakarta',
    coord: { lat: -6.2088, lon: 106.8456 },
    country: 'ID',
    population: 10000000,
    timezone: 25200,
    sunrise: 1640993400,
    sunset: 1641037800
  }
};

const mockFormatTemperature = (temp: number) => `${Math.round(temp)}°C`;
const mockGetWeatherIconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

describe('ForecastCard', () => {
  it('renders forecast header with city name', () => {
    render(
      <ForecastCard
        forecast={mockForecast}
        formatTemperature={mockFormatTemperature}
        getWeatherIconUrl={mockGetWeatherIconUrl}
      />
    );

    expect(screen.getByText('📅 5-Day Forecast')).toBeInTheDocument();
    expect(screen.getByText('Jakarta, ID')).toBeInTheDocument();
  });

  it('displays weather information for forecast items', () => {
    render(
      <ForecastCard
        forecast={mockForecast}
        formatTemperature={mockFormatTemperature}
        getWeatherIconUrl={mockGetWeatherIconUrl}
      />
    );

    // Check for temperature values
    expect(screen.getByText('30°C')).toBeInTheDocument(); // temp_max
    expect(screen.getByText('20°C')).toBeInTheDocument(); // temp_min

    // Check for weather descriptions
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText('few clouds')).toBeInTheDocument();

    // Check for humidity values
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
  });

  it('displays weather icons correctly', () => {
    render(
      <ForecastCard
        forecast={mockForecast}
        formatTemperature={mockFormatTemperature}
        getWeatherIconUrl={mockGetWeatherIconUrl}
      />
    );

    const icons = screen.getAllByRole('img');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
    expect(icons[0]).toHaveAttribute('alt', 'clear sky');
  });

  it('shows precipitation probability when available', () => {
    render(
      <ForecastCard
        forecast={mockForecast}
        formatTemperature={mockFormatTemperature}
        getWeatherIconUrl={mockGetWeatherIconUrl}
      />
    );

    // Check for precipitation percentages (pop * 100)
    expect(screen.getByText('10%')).toBeInTheDocument(); // 0.1 * 100
    expect(screen.getByText('20%')).toBeInTheDocument(); // 0.2 * 100
  });

  it('handles empty forecast list gracefully', () => {
    const emptyForecast = { ...mockForecast, list: [] };
    
    render(
      <ForecastCard
        forecast={emptyForecast}
        formatTemperature={mockFormatTemperature}
        getWeatherIconUrl={mockGetWeatherIconUrl}
      />
    );

    expect(screen.getByText('📅 5-Day Forecast')).toBeInTheDocument();
    expect(screen.getByText('Jakarta, ID')).toBeInTheDocument();
  });
});
