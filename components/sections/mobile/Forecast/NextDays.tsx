'use client'
import NextDaysCards from '@/components/ui/forecast/NextDaysCards'
import { useLocation } from '@/hooks/LocationFetcher'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
import { Cloud, CloudHail, CloudRainIcon, Rainbow, Sun, SunDim, Wind } from 'lucide-react'
import React, { useEffect, useState } from 'react'
// import  SwiperSlide from 'swiper'

const Days = [
    {day: 'SUN', icon: Cloud, temp: 19},
    {day: 'MON', icon: CloudHail, temp: 19},
    {day: 'TUE', icon: Sun, temp: 19},
    {day: 'WED', icon: CloudRainIcon, temp: 19},
    {day: 'THUR', icon: Wind, temp: 19},
    {day: 'FRI', icon: Rainbow, temp: 19},
    {day: 'SAT', icon: SunDim, temp: 19},
]

const NextDays = () => {
    const [isActive, setIsActive] = useState(true)
        const { locationLat, locationLon } = useLocation()
        const [weather, setWeather] = useState<WeatherResponse | null>(null)
        const weekdayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    
        useEffect(() => {
            const getWeather = async () => {
                if (locationLat && locationLon) {
                    try {
                        const res = await fetchWeather({ lat: locationLat, lon: locationLon })
                        setWeather(res)
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
                //fetchWeather({ lat: locationLat, lon: locationLon }).then(setWeather)
            }
            getWeather()
        }, [locationLat, locationLon])



  return (
    <div>
    <div className='flex justify-between  py-4 lg:pb-4 lg:pt-0'>
        <p>Next 7 Days</p>
        <div className='flex bg-[#1E1E1E] rounded-full text-[#818085] text-[11px] overflow-hidden'>
            <div 
            onClick={() => setIsActive(true)} 
            className={`flex items-center justify-between py-2 rounded-full px-4 ${isActive ? 'bg-[#BBD7EC] text-black' : 'bg-[#1E1E1E]'}`}>
                Forecast
            </div>
            <div 
            onClick={() => setIsActive(false)} 
            className={`flex items-center justify-between py-2 rounded-full px-4 ${!isActive ? 'bg-[#BBD7EC] text-black' : 'bg-[#1E1E1E]'}`}>
                Air Quality
            </div>
        </div>
    </div>
    <div className='flex flex-row gap-5 overflow-scroll md:overflow-clip'>
        {/* { Days.map((day, idx) => (
            <div key={idx}>
                <NextDaysCards props={{
                    // day: day.day,
                    day: day.day,
                    icon: day.icon,
                    temp: day.temp
                }}/>
            </div>
        ))} */}
         { weather?.forecast.forecastday.map((day, idx) => { 
            // const weekday =  new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
            const weekday = weekdayNames[new Date(day.date).getDay()]
            return(
            <div key={idx}>
                <NextDaysCards props={{
                    day: weekday,
                    icon: day.day.condition.icon,
                    temp: day.day.avgtemp_c
                }}/>
            </div>
        )})}
    </div>
    </div>
  )
}

export default NextDays
