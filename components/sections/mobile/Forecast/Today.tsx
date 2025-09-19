import ForecastCards from '@/components/ui/forecast/ForecastCards'
import { Cloud } from 'lucide-react'
import React from 'react'

const Today = () => {
    return (
        <div className=''>
            <ForecastCards props={{
                day: 'Friday',
                time: '11:45 AM',
                degree: 16,
                weatherIcon: Cloud,
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

export default Today