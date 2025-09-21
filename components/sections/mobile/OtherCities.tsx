'use client'
import React, { useEffect, useState } from 'react'
import OtherCitiesCard from '../../ui/otherCitiesCard'
import { Cloud } from 'lucide-react'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'

const nigerianCities = [
  { city: 'Lagos', country: 'Nigeria' },
  { city: 'Abuja', country: 'Nigeria' },
  { city: 'Kano', country: 'Nigeria' },
  { city: 'Port Harcourt', country: 'Nigeria' },
]

const OtherCities = () => {
  const [isDefault, setIsDefault] = useState(true)
  const [weatherData, setWeatherData] = useState<WeatherResponse[]>([])

  useEffect(() => {
    const getWeatherForCities = async () => {
      try {
        const results = await Promise.all(
          nigerianCities.map(async (city) => {
            const res = await fetchWeather({ city: city.city }) // adjust depending on how your fetchWeather works
            return { ...city, ...res }
          })
        )
        setWeatherData(results)
      } catch (err) {
        console.error(err)
      }
    }
    getWeatherForCities()
  }, [])

  const handleDefault = () => setIsDefault(true)
  const handleSeeAll = () => setIsDefault(false)

  return (
    <div>
      <div className='flex space-y-3 justify-between md:hidden'>
        <p
          onClick={handleDefault}
          className={`${isDefault ? 'text-white' : 'text-[#818085]'} font-semibold`}
        >
          Other Cities
        </p>
        <p
          onClick={handleSeeAll}
          className={`${!isDefault ? 'text-white' : 'text-[#818085]'}`}
        >
          See All
        </p>
      </div>

      {isDefault && (
        <div className='space-y-4'>
          {weatherData.slice(0, 4).map((data, idx) => (
            <div key={idx}>
              <OtherCitiesCard
                props={{
                  country: data.country || 'Nigeria',
                  city: data.city,
                  icon: Cloud,
                  weather: data.current?.condition?.text || 'N/A',
                }}
              />
            </div>
          ))}
        </div>
      )}
      {/* { !isDefault && <Tomorrow/>} */}
    </div>
  )
}

export default OtherCities









// 'use client'
// import React, { useEffect, useState } from 'react'
// import OtherCitiesCard from '../../ui/otherCitiesCard'
// import { Cloud } from 'lucide-react'
// import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
// import { useLocation } from '@/hooks/LocationFetcher'

// const otherCitiesData = [
//   {
//     country: 'China',
//     city: 'Beijing',
//     icon: Cloud,
//     weather: 'Cloudy'
//   },
//     {
//     country: 'China',
//     city: 'Beijing',
//     icon: Cloud,
//     weather: 'Cloudy'
//   },
//     {
//     country: 'China',
//     city: 'Beijing',
//     icon: Cloud,
//     weather: 'Cloudy'
//   },
//     {
//     country: 'China',
//     city: 'Beijing',
//     icon: Cloud,
//     weather: 'Cloudy'
//   },
// ]

// const OtherCities = () => {
//   const [isDefault, setIsDefault] = useState(true)
//           const { locationLat, locationLon } = useLocation()
//           const [weather, setWeather] = useState<WeatherResponse | null>(null)
      
//           useEffect(() => {
//               const getWeather = async () => {
//                   if (locationLat && locationLon) {
//                       try {
//                           const res = await fetchWeather({ lat: locationLat, lon: locationLon })
//                           setWeather(res)
//                       }
//                       catch (err) {
//                           console.log(err)
//                       }
//                   }
//                   //fetchWeather({ lat: locationLat, lon: locationLon }).then(setWeather)
//               }
//               getWeather()
//           }, [locationLat, locationLon])
  

//   const handleDefault = () => {
//     setIsDefault(true)
//   }
//   const handleSeeAll = () => {
//     setIsDefault(false)
//   }
//   return (
//     <div>
//         <div className='flex space-y-3 justify-between md:hidden'>
//             <p onClick={handleDefault} className={` ${ isDefault ? 'text-white' : 'text-[#818085]'} font-semibold`}>Other Cities</p>
//             <p onClick={handleSeeAll} className={` ${ !isDefault ? 'text-white' : 'text-[#818085]'}`}>See All</p>
//         </div>
//         { isDefault && (
//            <div className='space-y-4'>
//           {otherCitiesData.map((oc, idx) => { 
//             const Icon = oc.icon
//             return (
//             <div key={idx}>
//               <OtherCitiesCard props={{
//                 country: oc.country,
//                 icon: oc.icon,
//                 city: oc.city,
//                 weather: oc.weather
//               }}/>
//             </div>
//           )})}
//         </div>
//         )}
//         {/* { !isDefault && <Tomorrow/>} */}
//     </div>
//   )
// }

// export default OtherCities