'use client'
import NextDaysCards from '@/components/ui/forecast/NextDaysCards'
import Skeleton from '@/components/ui/skeleton'
import { useLocation } from '@/hooks/LocationFetcher'
import { useWeatherQuery } from '@/hooks/useWeatherQuery'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
import React, { useEffect, useMemo, useState } from 'react'


const NextDays = () => {
  const [isActive, setIsActive] = useState(true)
  const { locationLat, locationLon } = useLocation()
  const { query } = useWeatherQuery()
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const days = weather?.forecast?.forecastday ?? []
  const placeholders = useMemo(() => Math.max(0, 7 - days.length), [days])

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
      <div className='flex justify-between  py-4 lg:pb-4 lg:pt-0'>
        <p>Next 7 Days</p>
        <div className='flex bg-[#1E1E1E] rounded-full text-[#818085] text-[11px] overflow-hidden'>
          <div
            onClick={() => setIsActive(true)}
            className={`flex items-center justify-between py-2 rounded-full px-4 ${isActive ? 'bg-[#BBD7EC] text-black' : 'bg-[#1E1E1E]'}`}>
            Forecast
          </div>
          <div
            onClick={() => setIsActive(false)}
            className={`flex items-center justify-between py-2 rounded-full px-4 ${!isActive ? 'bg-[#BBD7EC] text-black' : 'bg-[#1E1E1E]'}`}>
            Air Quality
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-5 overflow-x-auto'>
        {days.length === 0 && (
          Array.from({ length: 7 }).map((_, i) => (
            <div key={`skeleton-${i}`} className='flex flex-col bg-[#1E1E1E] rounded-3xl w-[100px]'>
              <div className='border-b border-[#2E2E2E] py-2 px-4 text-center'>
                <Skeleton className='h-4 w-12 mx-auto rounded-full' />
              </div>
              <div className='flex flex-col items-center gap-7 p-6 w-full'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <Skeleton className='h-6 w-10 rounded-md' />
              </div>
            </div>
          ))
        )}

        {days.map((day, idx) => {
          const weekday = weekdayNames[new Date(day.date).getDay()]
          return (
            <div key={idx}>
              <NextDaysCards
                props={{
                  day: weekday,
                  icon: day.day.condition.icon,
                  temp: day.day.avgtemp_c,
                }}
              />
            </div>
          )
        })}

        {days.length > 0 && placeholders > 0 &&
          Array.from({ length: placeholders }).map((_, i) => (
            <div key={`placeholder-${i}`} className='flex flex-col bg-[#1E1E1E] rounded-3xl w-[100px]'>
              <div className='border-b border-[#2E2E2E] py-2 px-4 text-center'>
                <Skeleton className='h-4 w-12 mx-auto rounded-full' />
              </div>
              <div className='flex flex-col items-center gap-7 p-6 w-full'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <Skeleton className='h-6 w-10 rounded-md' />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default NextDays
