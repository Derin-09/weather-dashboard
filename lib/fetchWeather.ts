// import { error } from 'console'
// import React from 'react'

type WeatherResponse = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
  condition: {
    text: string;
    icon: string;
  };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          icon: string
        }
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          icon: string
          text: string
        }
      }[];
    }[];
  };
};

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

export  async function fetchWeather  (city:string): Promise<WeatherResponse | null>  {
  try {
  const res = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`, { cache: 'no-store' })
  const data = await res.json()
  return data
} catch (err){
  console.log(err)
  return null
}
}
