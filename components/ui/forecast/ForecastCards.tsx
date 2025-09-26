import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type ForecastType = {
    day: string;
    time: string;
    degree: number;
    weatherIcon: LucideIcon | string;
    realFeel: number;
    wind: string;
    pressure: number;
    humidity: number;
    sunrise: string;
    sunset: string
}

const ForecastCards = ({props}: {props: ForecastType}) => {
  return (
    <div className='rounded-2xl overflow-hidden text-[#0F0F11]'>
        <div className='flex justify-between px-4 py-2 bg-[#AECADF]'>
            <p className='font-bold'>{props.day}</p>
            <p>{props.time}</p>
        </div>
        <div className='p-4 bg-[#BBD7EC] space-y-2'>
            <div className='flex items-center justify-between pt-0'>
                <p className='text-4xl font-bold'>{props.degree}&deg;</p>
                <div><Image src={`https:${props.weatherIcon}`}  width={66} height={66} alt=''/></div>
            </div>
            <div className='fle fle-col grid grid-cols-2  text-[12px]'>
                <p>Real Feel: <span className='font-bold'>{props.realFeel}&deg;</span></p>
                <p className='flex\ nowrap'>Wind N-E: <span className='font-bold'>{props.wind}</span></p>
                <p className='tet-right'>Pressure: <span className='font-bold'>{props.pressure}</span></p>
                <p >Humidity: <span className='font-bold'>{props.humidity}</span></p>
                <p className='tet-right'>Sunrise: <span className='font-bold'>{props.sunrise}</span></p>
             
                <p>Sunset: <span className='font-bold'>{props.sunset}</span></p>
            </div>
        </div>
    </div>
  )
}

export default ForecastCards