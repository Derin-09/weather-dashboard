'use client'
import React, { useEffect, useState } from 'react'
import OtherCitiesCard from '../../ui/otherCitiesCard'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'

const otherCitiesData = ['Beijing', 'California', 'Emirates', 'Charlottetown']
type CityWeather = WeatherResponse & { city: string }

const OtherCities = () => {
  const [isDefault, setIsDefault] = useState(true)
          const [weather, setWeather] = useState<CityWeather[]>([])

      
          useEffect(() => {
              const getWeather = async () => {
                      try {
                          const result = await Promise.all( otherCitiesData.map(async (city) => {
                            const res = await fetchWeather(city)
                            if (!res) return null
                            return {...res, city}
                          }))
                          // setWeather(result)
                          setWeather(result.filter((r): r is CityWeather => r !== null))
                      }
                      catch (err) {
                          console.log(err)
                      }
                  //fetchWeather({ lat: locationLat, lon: locationLon }).then(setWeather)
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
            <p onClick={handleDefault} className={` ${ isDefault ? 'text-white' : 'text-[#818085]'} font-semibold`}>Other Cities</p>
            <p onClick={handleSeeAll} className={` ${ !isDefault ? 'text-white' : 'text-[#818085]'} hover:cursor-pointer`}>See All</p>
        </div>
        { isDefault && (
           <div className='space-y-4'>
          {weather.map((oc, idx) => { 
            // const Icon = oc.icon
            return (
            <div key={idx}>
              <OtherCitiesCard props={{
                country: oc.location.country,
                icon: oc.current.condition.icon,
                city: oc.location.name,
                weather: oc.current.condition.text
              }}/>
            </div>
          )})}
        </div>
        )}
      
    </div>
  )
}

export default OtherCities



