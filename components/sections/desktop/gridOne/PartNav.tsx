'use client'
import { useLocation } from '@/hooks/LocationFetcher'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
import { Bell, LayoutGrid, MapPin, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Skeleton from '@/components/ui/skeleton'
import { useWeatherQuery } from '@/hooks/useWeatherQuery'

const PartNav = () => {
    const { locationLat, locationLon } = useLocation()
    const { query, setQuery } = useWeatherQuery()
    const [term, setTerm] = useState("")
    const [weather, setWeather] = useState<WeatherResponse | null>(null)

    useEffect(() => {
        const getWeather = async () => {
            const param = query ?? (locationLat && locationLon ? { lat: locationLat, lon: locationLon } : null)
            if (!param) return
            try {
                const res = await fetchWeather(param)
                setWeather(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        getWeather()
    }, [locationLat, locationLon, query])

    return (
        <nav className='flex justify-between items-center py-6 bg-[#111015]' style={{ fontFamily: 'var(--font-montserrat)' }}>
            <div className='flex items-center gap-4 w-full'>
                <div className='block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600'>
                    <LayoutGrid />
                </div>
                <div className='block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600'>
                    <Bell />
                </div>
                <div className='flex gap-2 items-center'>
                    <MapPin />
                    {weather ? (
                      <p>{weather?.location.name}, {weather?.location.country}</p>
                    ) : (
                      <Skeleton className='h-4 w-40 rounded-md' />
                    )}
                </div>
            </div>
            <div className='w-full'>
<div className='md:flex items-center gap-2 p-3 hidden bg-[#1E1E1E] rounded-lg w-full'>
                    <Search />
                    <input
                      type='text'
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && term.trim()) setQuery(term.trim()) }}
                      placeholder='Search City'
                      className='flex-1 bg-transparent text-[#FEFEFE] placeholder-[#818085] outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none'
                    />
                </div>
            </div>
        </nav>
    )
}

export default PartNav
