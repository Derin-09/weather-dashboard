import { LucideIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';
import React, { ElementType } from 'react'

type ForecastType = {
    day: string;
    time: string;
    degree: number;
    weatherIcon: LucideIcon;
    realFeel: number;
    wind: string;
    pressure: number;
    humidity: number;
    sunrise: string;
    sunset: string
}

const ForecastCards = ({props}: {props: ForecastType}) => {
    const Icon = props.weatherIcon
  return (
    <div className='rounded-2xl overflow-hidden text-[#0F0F11]'>
        <div className='flex justify-between px-4 py-2 bg-[#AECADF]'>
            <p className='font-bold'>{props.day}</p>
            <p>{props.time}</p>
        </div>
        <div className='p-4 bg-[#BBD7EC] space-y-2'>
            <div className='flex items-center justify-between pt-0'>
                <p className='text-4xl font-bold'>{props.degree}&deg;</p>
                <div><Icon size={66}/></div>
            </div>
            <div className='flex flex-col text-[12px]'>
                <p>Real Feel: <span className='font-bold'>{props.realFeel}&deg;</span></p>
                <div className='grid grid-cols-2  justify-between'>
                <p>Wind N-E: <span className='font-bold'>{props.wind}</span></p>
                <p className='text-right'>Pressure: <span className='font-bold'>{props.pressure}</span></p>
                <p >Humidity: <span className='font-bold'>{props.humidity}</span></p>
                <p className='text-right'>Sunrise: <span className='font-bold'>{props.sunrise}</span></p>
                </div>
                <p>Sunset: <span className='font-bold'>{props.sunset}</span></p>
            </div>
        </div>
    </div>
  )
}

export default ForecastCards