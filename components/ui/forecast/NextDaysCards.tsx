import { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import React, { ElementType } from 'react'

type NextDaysType = {
    day: string
    icon: LucideIcon | string
    temp: number
}

const NextDaysCards = ({props}: {props: NextDaysType}) => {
     const Icon = props.icon
  return (
    <div className='flex flex-col bg-[#1E1E1E] rounded-3xl w-[100px]'>
        <div className='border-b border-[#E5E5E5] py-2 px-4 text-center'>{props.day}</div>
        <div className='flex flex-col items-center gap-7 p-6 '>
            {/* <div><Icon size={50}/></div> */}
            <div><Image src={`https:${props.icon}`} width={50} height={50} alt=''/></div>
            <p className='text-[32px] font-semibold'>{Math.ceil(props.temp)}&deg;</p>
        </div>
    </div>
  )
}

export default NextDaysCards