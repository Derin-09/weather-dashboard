import ForecastCards from '@/components/ui/forecast/ForecastCards'
import { CloudHail } from 'lucide-react'
import React from 'react'

const Tomorrow = () => {
  return (
    <div className=''>
            <ForecastCards props={{
                day: 'Saturday',
                time: '11:45 AM',
                degree: 26,
                weatherIcon: CloudHail,
                realFeel: 18,
                wind: '6-7km/h',
                pressure: 100,
                humidity: 51,
                sunrise: '5:30 PM',
                sunset: '6:45 PM'

            }} />
        </div>
  )
}

export default Tomorrow