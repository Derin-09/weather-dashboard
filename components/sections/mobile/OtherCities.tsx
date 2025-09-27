'use client'
import React, { useEffect, useState } from 'react'
import OtherCitiesCard from '../../ui/otherCitiesCard'
import Skeleton from '@/components/ui/skeleton'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'

const otherCitiesData = ['Beijing', 'California', 'Emirates', 'Charlottetown']
type CityWeather = WeatherResponse & { city: string }

const OtherCities = () => {
  const [isDefault, setIsDefault] = useState(true)
  const [weather, setWeather] = useState<CityWeather[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getWeather = async () => {
      try {
        const result = await Promise.all(
          otherCitiesData.map(async (city) => {
            const res = await fetchWeather(city)
            if (!res) return null
            return { ...res, city }
          })
        )
        setWeather(result.filter((r): r is CityWeather => r !== null))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getWeather()
  }, [])

  const handleDefault = () => {
    setIsDefault(true)
  }
  const handleSeeAll = () => {
    setIsDefault(false)
  }
  return (
    <div>
      <div className='flex space-y-3 justify-between md:hidden'>
        <p onClick={handleDefault} className={` ${isDefault ? 'text-white' : 'text-[#818085]'} font-semibold`}>Other Cities</p>
        <p onClick={handleSeeAll} className={` ${!isDefault ? 'text-white' : 'text-[#818085]'} hover:cursor-pointer`}>See All</p>
      </div>
      {isDefault && (
        <div className='space-y-4'>
          {loading && (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={`city-skel-${idx}`} className='flex flex-col gap- px-4 py-2 rounded-xl bg-[#1E1E1E]'>
                <Skeleton className='h-3 w-24 mb-2' />
                <div className='flex justify-between items-center'>
                  <Skeleton className='h-5 w-20' />
                  <Skeleton className='h-10 w-10 rounded-full' />
                </div>
                <Skeleton className='h-3 w-28 mt-2' />
              </div>
            ))
          )}

          {!loading && weather.map((oc, idx) => {
            return (
              <div key={idx}>
                <OtherCitiesCard props={{
                  country: oc.location.country,
                  icon: oc.current.condition.icon,
                  city: oc.location.name,
                  weather: oc.current.condition.text
                }} />
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

export default OtherCities
