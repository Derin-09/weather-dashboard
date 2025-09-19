import React from 'react'
import ChartLineDots from '../../ui/rainChart/line-chart'

const RainChance = () => {
  return (
    <div>
      <div className=' py-4 md:py-0 md:pt-2'>
        {/* <p>Chances of Rain</p> */}
        <div className=''>
          <ChartLineDots />
        </div>
      </div>
    </div>
  )
}

export default RainChance