'use client'
import React, { useState } from 'react'
import PartNav from './PartNav'
import RainChance from '../../mobile/RainChance'
import OtherCities from '../../mobile/OtherCities'

const GridTwo = () => {
  const [isDefault, setIsDefault] = useState(true)

  const handleDefault = () => {
    setIsDefault(true)
  }
  const handleSeeAll = () => {
    setIsDefault(false)
  }
  return (
    <div>
        <PartNav />
        <RainChance />
        <div className='flex space-y-3 justify-between'>
            <p onClick={handleDefault} className={` ${ isDefault ? 'text-white' : 'text-[#818085]'} font-semibold`}>Other Cities</p>
            <p onClick={handleSeeAll} className={` ${ !isDefault ? 'text-white' : 'text-[#818085]'}`}>See All</p>
        </div>
        <OtherCities />
    </div>
  )
}

export default GridTwo