'use client'
import React, { useState } from 'react'
import Today from './Today'
import Tomorrow from './Tomorrow'
import NextDays from './NextDays'

const Forecast = () => {
  const [isToday, setIsToday] = useState(true)

  const handleToday = () => {
    setIsToday(true)
  }
  const handleTomorrow = () => {
    setIsToday(false)
  }
  return (
    <section>
        <div className='flex space-y-3 justify-between'>
            <p onClick={handleToday} className={` ${ isToday ? 'text-white' : 'text-[#818085]'}`}>Today</p>
            <p onClick={handleTomorrow} className={` ${ !isToday ? 'text-white' : 'text-[#818085]'}`}>Tomorrow</p>
        </div>
        { isToday && <Today/>}
        { !isToday && <Tomorrow/>}

        <div className='pt-5'>
          <NextDays />
        </div>
    </section>
  )
}

export default Forecast