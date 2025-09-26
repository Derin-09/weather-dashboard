import Image from 'next/image'
import React from 'react'

type OverviewTypes = {
    country: string
    icon: string
    city: string
    weather: string

}

const OtherCitiesCard = ({props}: {props: OverviewTypes}) => {
    // const Icon = props.icon
  return (
    <div className='flex flex-col gap-  px-4 py-2 rounded-xl bg-[#1E1E1E]'>
        <p className='text-sm text-[#818085]'>{props.country}</p>
        <div className='flex justify-between items-center'>
            <p className='text-xl'>{props.city}</p>
            <Image src={`https://${props.icon}`} width={40} height={40} alt=''/>
        </div>
        <div className='text-sm'>
            <p> {props.weather}</p>
        </div>
    </div>
  )
}

export default OtherCitiesCard