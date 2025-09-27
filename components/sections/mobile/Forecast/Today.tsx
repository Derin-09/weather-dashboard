'use client'
import ForecastCards from '@/components/ui/forecast/ForecastCards'
import Skeleton from '@/components/ui/skeleton'
import { useLocation } from '@/hooks/LocationFetcher'
import { useWeatherQuery } from '@/hooks/useWeatherQuery'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
import React, { useEffect, useState } from 'react'

const Today = () => {
  const { locationLat, locationLon } = useLocation()
  const { query } = useWeatherQuery()
  const [weather, setWeather] = useState<WeatherResponse | null>(null)

  useEffect(() => {
    const getWeather = async () => {
      const param = query ?? (locationLat && locationLon ? { lat: locationLat, lon: locationLon } : null)
      if (!param) return
      try {
        const res = await fetchWeather(param)
        setWeather(res)
      } catch (err) {
        console.log(err)
      }
    }
    getWeather()
  }, [locationLat, locationLon, query])

  return (
    <div>
      {weather ? (
        <ForecastCards
          props={{
            day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            degree: weather.current.temp_c,
            weatherIcon: weather.current.condition.icon,
            realFeel: weather.forecast.forecastday[0].hour[0].feelslike_c,
            wind: `${weather.current.wind_kph} km/h`,
            pressure: weather.current.pressure_mb,
            humidity: weather.current.humidity,
            sunrise: weather.forecast.forecastday[0].astro.sunrise,
            sunset: weather.forecast.forecastday[0].astro.sunset,
          }}
        />
      ) : (
        <div className='rounded-2xl overflow-hidden text-[#0F0F11]'>
          <div className='flex justify-between px-4 py-2 bg-[#2A2A2A]'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-16' />
          </div>
          <div className='p-4 bg-[#1E1E1E] space-y-4'>
            <div className='flex items-center justify-between pt-0'>
              <Skeleton className='h-10 w-20 rounded-md' />
              <Skeleton className='h-16 w-16 rounded-full' />
            </div>
            <div className='grid grid-cols-2 gap-2 text-[12px]'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className='h-4 w-28' />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Today
