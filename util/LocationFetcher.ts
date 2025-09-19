"use client"
import { useEffect, useState } from "react"

export function LocationFetcher() {
  const [location, setLocation] = useState<{lat:number, lon:number} | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          })
        },
        (err) => {
          console.error("Error getting location:", err)
        }
      )
    } else {
      console.error("Geolocation not supported")
    }
  }, [])

  return { locationLon: location?.lon, locationLat: location?.lat}
//    (
//     <div>
//       {location 
//         ? <p>Lat: {location.lat}, Lon: {location.lon}</p>
//         : <p>Getting location...</p>}
//     </div>
//   )
}
