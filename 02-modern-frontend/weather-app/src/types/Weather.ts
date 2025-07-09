// types/Weather.ts - Type definitions untuk weather API

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Rain {
  '1h'?: number;
  '3h'?: number;
}

export interface Snow {
  '1h'?: number;
  '3h'?: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeather {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: Rain;
  snow?: Snow;
  sys: {
    pod: string; // Part of day (d/n)
  };
  dt_txt: string;
}

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface LocationData {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// App specific types
export interface WeatherState {
  currentWeather: CurrentWeather | null;
  forecast: WeatherForecast | null;
  loading: boolean;
  error: string | null;
  location: LocationData | null;
}

export interface SearchLocation {
  query: string;
  suggestions: LocationData[];
  loading: boolean;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export interface WeatherSettings {
  temperatureUnit: TemperatureUnit;
  use24HourFormat: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
}
