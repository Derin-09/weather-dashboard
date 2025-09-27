import React from 'react'
import Forecast from '../../mobile/Forecast/Forecast'
import NextDays from '../../mobile/Forecast/NextDays'
import Overview from '../../mobile/Overview'
import Explore from '../../mobile/Explore'
import PartNav from './PartNav'

const GridOne = () => {
  return (
    <section className=''>
        <PartNav />
        <div className='flex gap-5 lg:gap-4 xl:gap-3 2xl:gap-2'>
            <Forecast />
            <NextDays />
        </div>
        <p className='py-4'>Today&apos;s Overview</p>
        <div className='flex gap-4 lg:gap-3 xl:gap-4 2xl:gap-1'>
            <Overview />
            {/* <div className='pt-6'> */}
            <Explore />
            {/* </div> */}
        </div>
    </section>
  )
}

export default GridOne
