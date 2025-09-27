'use client'
import React, { useEffect, useState } from 'react'
import OverviewCard from '../../ui/overview'
import Skeleton from '@/components/ui/skeleton'
import { CloudDrizzle, Droplets, Eye, Gauge, Tornado, Wind } from 'lucide-react'
import { useLocation } from '@/hooks/LocationFetcher'
import { useWeatherQuery } from '@/hooks/useWeatherQuery'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'

const Overview = () => {
  const { locationLat, locationLon } = useLocation()
  const { query } = useWeatherQuery()
  const [weather, setWeather] = useState<WeatherResponse | null>(null)

  useEffect(() => {
    const getWeather = async () => {
      const param = query ?? (locationLat && locationLon ? { lat: locationLat, lon: locationLon } : null)
      if (!param) return
      try {
        const res = await fetchWeather(param)
        setWeather(res)
      } catch (err) {
        console.log(err)
      }
    }
    getWeather()
  }, [locationLat, locationLon, query])

  const overviewContent = [
    {
      title: 'Wind Status',
      icon: Tornado,
      status: weather?.current.wind_kph ?? 0,
      unit: 'km/h',
      comment: { cString: '', cNumber: null, cIcon: null },
    },
    {
      title: 'UV Index',
      icon: Gauge,
      status: weather?.current.uv ?? 0,
      unit: 'UV',
      comment: { cString: null, cNumber: null, cIcon: null },
    },
    {
      title: 'Humidity',
      icon: CloudDrizzle,
      status: weather?.current.humidity ?? 0,
      unit: '%',
      comment: { cString: `The dew point is 27° right now`, cNumber: weather?.current.dewpoint_c, cIcon: Droplets },
    },
    {
      title: 'Visibility',
      icon: Wind,
      status: weather?.current.vis_km ?? 0,
      unit: 'km',
      comment: { cString: 'Haze is affecting visibiity', cNumber: null, cIcon: Eye },
    },
  ]

  const isLoading = !weather

  return (
    <div>
      <div className=' py-4 md:py-0'>
        <p className='pb-4 md:hidden'>Today&apos;s Overview</p>
        <div className='space-y-4 md:space-y-0 md:grid grid-cols-2 md:gap-4 '>
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={`ov-skel-${idx}`} className='p-4 flex flex-col gap-5 rounded-xl bg-[#1E1E1E] md:h-full'>
                  <Skeleton className='h-4 w-32' />
                  <div className='flex justify-center items-center'>
                    <Skeleton className='h-20 w-20 rounded-full' />
                  </div>
                  <div className='flex justify-between items-center'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                </div>
              ))
            : overviewContent.map((oc, idx) => {
                const Icon = oc.comment.cIcon
                return (
                  <div key={idx} className=''>
                    <OverviewCard
                      props={{
                        title: oc.title,
                        icon: oc.icon,
                        status: oc.status,
                        unit: oc.unit,
                      }}
                    >
                      <div className='flex gap-1 items-center text-[#818085]'>
                        <div>{Icon !== null && <Icon size={14} />}</div>
                        <p className='text-xs '>{oc.comment.cString}</p>
                      </div>
                    </OverviewCard>
                  </div>
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default Overview
