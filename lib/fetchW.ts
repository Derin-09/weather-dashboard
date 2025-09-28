export type WeatherResponse = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
    pressure_mb: number;
    uv: number;
    vis_km: number;
    dewpoint_c: number;
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
        maxwind_kph: number
      };
      astro: {
        sunset: string;
        sunrise: string;
      }
      hour: {
        time: string;
        temp_c: number;
        chance_of_rain: number
        pressure_mb: number
        humidity: number
        condition: {
          icon: string
          text: string
        };
        feelslike_c: number
      }[];
    }[];
  };
};


const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json'


export const fetchWeather = async (
  query: string | { lat: number; lon: number }
): Promise<WeatherResponse | null> => {
  try {
    let q: string

    if (typeof query === "string") {
      q = query
    } else {
      q = `${query.lat},${query.lon}`
    }

    const res = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${q}&days=7&aqi=no&alerts=no`
    )

    if (!res.ok) throw new Error("Failed to fetch weather")

    const data = await res.json()
    return data
  } catch (err) {
    console.error("Weather fetch error:", err)
    return null
  }
}
