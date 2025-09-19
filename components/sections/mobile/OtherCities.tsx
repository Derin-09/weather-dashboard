'use client'
import React, { useState } from 'react'
import OtherCitiesCard from '../../ui/otherCitiesCard'
import { Cloud } from 'lucide-react'

const otherCitiesData = [
  {
    country: 'China',
    city: 'Beijing',
    icon: Cloud,
    weather: 'Cloudy'
  },
    {
    country: 'China',
    city: 'Beijing',
    icon: Cloud,
    weather: 'Cloudy'
  },
    {
    country: 'China',
    city: 'Beijing',
    icon: Cloud,
    weather: 'Cloudy'
  },
    {
    country: 'China',
    city: 'Beijing',
    icon: Cloud,
    weather: 'Cloudy'
  },
]

const OtherCities = () => {
  const [isDefault, setIsDefault] = useState(true)

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
            <p onClick={handleSeeAll} className={` ${ !isDefault ? 'text-white' : 'text-[#818085]'}`}>See All</p>
        </div>
        { isDefault && (
           <div className='space-y-4'>
          {otherCitiesData.map((oc, idx) => { 
            const Icon = oc.icon
            return (
            <div key={idx}>
              <OtherCitiesCard props={{
                country: oc.country,
                icon: oc.icon,
                city: oc.city,
                weather: oc.weather
              }}/>
            </div>
          )})}
        </div>
        )}
        {/* { !isDefault && <Tomorrow/>} */}
    </div>
  )
}

export default OtherCities