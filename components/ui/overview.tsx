import { LucideIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

type OverviewTypes = {
    title: string
    icon: LucideIcon
    status: number
    unit: string
    // commentString: string
    // commentNumber: number

}

const OverviewCard = ({props, children}: {props: OverviewTypes, children:ReactNode}) => {
    const Icon = props.icon
  return (
    <div className='p-4 flex flex-col gap-5 rounded-xl bg-[#1E1E1E] md:h-full'>
        <p>{props.title}</p>
        <div className='flex justify-center items-center'>
            <Icon size={70}/>
        </div>
        <div className='flex justify-between'>
            <p> <span className='font-semibold'>{props.status}</span> {props.unit}</p>
            <div>{children}</div>
        </div>
    </div>
  )
}

export default OverviewCard