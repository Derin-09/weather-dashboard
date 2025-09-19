import { LucideIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

type OverviewTypes = {
    country: string
    icon: LucideIcon
    city: string
    weather: string
    // commentString: string
    // commentNumber: number

}

const OtherCitiesCard = ({props}: {props: OverviewTypes}) => {
    const Icon = props.icon
  return (
    <div className='flex flex-col gap-  px-4 py-2 rounded-xl bg-[#1E1E1E]'>
        <p className='text-sm text-[#818085]'>{props.country}</p>
        <div className='flex justify-between items-center'>
            <p className='text-xl'>{props.city}</p>
            <Icon size={40}/>
        </div>
        <div className='text-sm'>
            <p> {props.weather}</p>
        </div>
    </div>
  )
}

export default OtherCitiesCard