'use client'
import { useLocation } from '@/hooks/LocationFetcher'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
import { Bell, LayoutGrid, MapPin, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const PartNav = () => {
    const { locationLat, locationLon } = useLocation()
    const [weather, setWeather] = useState<WeatherResponse | null>(null)

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
        <nav className='flex justify-between items-center py-6 bg-[#111015]' style={{ fontFamily: 'var(--font-montserrat)' }}>
            <div className='flex items-center gap-4 w-full'>
                <div className='block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600'>
                    <LayoutGrid />
                </div>
                <div className='block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600'>
                    <Bell />
                </div>
                <div className='flex gap-2'>
                    <MapPin />
                    <p>{weather?.location.name}, {weather?.location.country}</p>
                </div>
            </div>
            <div className='w-full'>
                <div className='md:flex items-center w-[500px] min-w-[300px] gap-2 p-3 hidden  bg-[#1E1E1E] rounded-lg'>
                    <Search />
                    <input placeholder='Search City' />
                </div>
            </div>
        </nav>
    )
}

export default PartNav