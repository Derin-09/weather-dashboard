'use client'
import React, { useEffect, useState } from 'react'
import OverviewCard from '../../ui/overview'
import { CloudDrizzle, Droplets, Eye, Gauge, Tornado, Wind } from 'lucide-react'
import { useLocation } from '@/hooks/LocationFetcher'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'


// type overviewContentType = {
//   title: string,
//   icon: string,
//   status: number,
//   unit: string,
//   comment: {
//     cString: string,
//     cNumber: null,
//     cIcon: null
//   }
// }



const Overview = () => {
  const { locationLat, locationLon } = useLocation()
  const [weather, setWeather] = useState<WeatherResponse| null>(null)

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

  const overviewContent = [
    {
      title: 'Wind Status',
      icon: Tornado,
      status: weather?.current.wind_kph,
      unit: 'km/h',
      comment: {
        cString: '',
        cNumber: null,
        cIcon: null

      }
    },
    {
      title: 'UV Index',
      icon: Gauge,
      status: weather?.current.uv,
      unit: 'UV',
      comment: {
        cString: null,
        cNumber: null,
        cIcon: null

      }
    },
    {
      title: 'Humidity',
      icon: CloudDrizzle,
      status: weather?.current.humidity,
      unit: '%',
      comment: {
        cString: `The dew point is 27° right now`,
        cNumber: weather?.current.dewpoint_c,
        cIcon: Droplets

      }
    },
    {
      title: 'Visibility',
      icon: Wind,
      status: weather?.current.vis_km,
      unit: 'km',
      comment: {
        cString: 'Haze is affecting visibiity',
        cNumber: null,
        cIcon: Eye

      }
    },
  ]

  return (
    <div>
      <div className=' py-4 md:py-0'>
        <p className='pb-4 md:hidden'>Today&apos;s Overview</p>
        <div className='space-y-4 md:space-y-0 md:grid grid-cols-2 md:gap-4 '>
          {overviewContent.map((oc, idx) => {
            const Icon = oc.comment.cIcon
            return (
              <div key={idx} className=''>
                <OverviewCard props={{
                  title: oc.title,
                  icon: oc.icon,
                  status: oc.status,
                  unit: oc.unit
                }}>
                  <div className='flex gap-1 items-center text-[#818085]'>
                    <div >
                      {Icon !== null && (
                        <Icon size={14} />
                      )}
                    </div>
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