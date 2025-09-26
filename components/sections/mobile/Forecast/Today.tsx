'use client'
import ForecastCards from '@/components/ui/forecast/ForecastCards'
import { useLocation } from '@/hooks/LocationFetcher'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
import React, { useEffect, useState } from 'react'

const Today = () => {
    const { locationLat, locationLon } = useLocation()
    const [weather, setWeather] = useState<WeatherResponse | null>(null)

    useEffect(() => {
        const getWeather = async () => {
            if (locationLat && locationLon) {
                try {
                    const res = await fetchWeather({ lat: locationLat, lon: locationLon })
                    setWeather(res)
                }
                catch (err) {
                    console.log(err)
                }
            }
            //fetchWeather({ lat: locationLat, lon: locationLon }).then(setWeather)
        }
        getWeather()
    }, [locationLat, locationLon])

   
    return (
  <div>
    {weather ? (
      <ForecastCards
        props={{
          day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          degree: weather.current.temp_c,
          weatherIcon:  weather.current.condition.icon,
          realFeel: weather.forecast.forecastday[0].hour[0].feelslike_c,
          wind: `${weather.current.wind_kph} km/h`,
          pressure: weather.current.pressure_mb,
          humidity: weather.current.humidity,
          sunrise: weather.forecast.forecastday[0].astro.sunrise,
          sunset: weather.forecast.forecastday[0].astro.sunset,
        }}
      />
    ) : (
      <p>Loading...</p>
    )}
  </div>
)

}

export default Today