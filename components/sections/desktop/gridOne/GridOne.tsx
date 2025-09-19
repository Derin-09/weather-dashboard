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
        <div className='flex gap-4'>
            <Forecast />
            <NextDays />
        </div>
        <p className='py-4'>Today&apos;s Overview</p>
        <div className='flex gap-4'>
            <Overview />
            {/* <div className='pt-6'> */}
            <Explore />
            {/* </div> */}
        </div>
    </section>
  )
}

export default GridOne