import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the weatherService to avoid axios issues in tests
jest.mock('./services/weatherService', () => ({
  WeatherService: {
    getCurrentWeatherByCity: jest.fn(),
    getForecastByCity: jest.fn(),
    searchLocations: jest.fn(() => Promise.resolve([])),
    formatTemperature: jest.fn((temp: number) => `${temp}°C`),
    formatWindSpeed: jest.fn((speed: number) => `${speed} m/s`),
    getWindDirection: jest.fn(() => 'N'),
    getWeatherIconUrl: jest.fn(() => 'mock-icon-url'),
  },
  MockWeatherService: {
    getCurrentWeatherByCity: jest.fn(),
    getForecastByCity: jest.fn(),
    searchLocations: jest.fn(() => Promise.resolve([])),
  }
}));

test('renders weather app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Weather App/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders search instruction when no weather data', () => {
  render(<App />);
  const instructionElement = screen.getByText(/Search for a city to get started/i);
  expect(instructionElement).toBeInTheDocument();
});
