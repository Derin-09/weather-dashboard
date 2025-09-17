import React from 'react'
import ChartLineDots from '../ui/rainChart/line-chart'

const RainChance = () => {
  return (
    <div>
      <div className=' py-4'>
        {/* <p>Chances of Rain</p> */}
        <div className=''>
          <ChartLineDots />
        </div>
      </div>
    </div>
  )
}

export default RainChance