'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, MapPin, Moon, Bell, Search, User, X } from 'lucide-react'
import Skeleton from '@/components/ui/skeleton'
import { useLocation } from '@/hooks/LocationFetcher'
import { useWeatherQuery } from '@/hooks/useWeatherQuery'
import { fetchWeather, WeatherResponse } from '@/lib/fetchW'
import Link from 'next/link'

const mobileNavItems = [
    {
        text: "Guest",
        logo: User,
        altText: "Profile Picture",
        link: "",
    },
    {
        text: "Theme",
        logo: Moon,
        altText: "Theme",
        link: "",
    },
    {
        text: "Notifications",
        logo: Bell,
        altText: "Notifications",
        link: "",
    },
    {
        text: "Search Cities",
        logo: Search,
        altText: "Skills",
        link: "",
    },
];

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false)
  const { locationLat, locationLon } = useLocation()
  const { query, setQuery } = useWeatherQuery()
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [term, setTerm] = useState("")

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

  return (
    <nav className="flex justify-between items-center md:hidden p-6 bg-[#111015]" style={{ fontFamily: 'var(--font-montserrat)' }}>
      <div className="flex items-center gap-4 w-full">
        <div className="hidden md:block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600">
          <LayoutGrid />
        </div>
        <div className="hidden md:block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600">
          <Bell />
        </div>
        <div className="flex gap-2 items-center">
          <MapPin />
          {weather ? (
            <p>{weather.location.name}, {weather.location.country}</p>
          ) : (
            <Skeleton className="h-4 w-32 rounded-md" />
          )}
        </div>
      </div>

      {/* Search box */}
      <div className="w-full">
        <div className="md:flex items-center gap-2 p-3 hidden bg-[#1E1E1E] rounded-lg w-full">
          <Search />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && term.trim()) setQuery(term.trim()) }}
            placeholder="Search City"
            className="flex-1 bg-transparent text-[#FEFEFE] placeholder-[#818085] outline-none"
          />
        </div>
      </div>

      {/* Right side icons */}
      <div className="hidden md:flex gap-2">
        <div className="hidden md:block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600">
          <Moon />
        </div>
        <div className="hidden md:block p-3 bg-[#1E1E1E] rounded-full hover:bg-gray-600 hover:cursor-pointer">
          <User />
        </div>
      </div>

      {/* Mobile menu */}
      <div>
        <div className="md:hidden" onClick={() => setIsClicked(!isClicked)}>
          <LayoutGrid />
        </div>
        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed inset-0 z-50"
            >
              <nav className="flex flex-col md:hidden gap-[10%] p-6 pt-10 w-screen h-screen bg-[#111015]">
                <div className="pl-2" onClick={() => setIsClicked(false)}>
                  <X />
                </div>
                <section className="flex flex-col gap-10  h-full text-white">
                   {mobileNavItems.map((item, idx) => {
                                        const Icon = item.logo
                                        return (
                                            <div onClick={() => setIsClicked(false)} key={idx}>
                                                <Link href={item.link}>
                                                    <div className="flex  gap-3 items-center justify-cente ">
                                                        <Icon />
                                                        <p className="text-[24px] ">{item.text}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                </section>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
