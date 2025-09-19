import { Moon, User } from 'lucide-react'
import React from 'react'

const PartNav = () => {
  return (
    <div className='flex justify-end pl-6 pt-6'>
        <div className='hidden md:flex gap-2'>
                <div className='hidden md:block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600'>
                    <Moon />
                </div>
                <div className='hidden md:block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600'>
                    <User />
                </div>
            </div>
    </div>
  )
}

export default PartNav