import React from 'react'

const Explore = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("images/banner.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className='rounded-2xl'>
    <div
      className='rounded-2xl flex flex-col gap-50 py-10 text-black bg-white/10 h-full'>
        <div className='px-5 py-2 rounded-md bg-white/40 font-semibold mx-2 text-center'>
        Explore global map of wind, weather, and ocean condition</div>
        <div className='flex justify-center'>
        <button className='px-5 py-2 rounded-md bg-white font-semibold'>
          GET STARTED
        </button>
        </div>
      </div>
      </div>
  )
}

export default Explore