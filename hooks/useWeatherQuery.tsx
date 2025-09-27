"use client"

import React, { createContext, useContext, useState } from "react"

type Query = string | { lat: number; lon: number } | null

type Ctx = {
  query: Query
  setQuery: (q: Query) => void
}

const WeatherQueryContext = createContext<Ctx | undefined>(undefined)

export function WeatherQueryProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<Query>(null)
  return (
    <WeatherQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </WeatherQueryContext.Provider>
  )
}

export function useWeatherQuery() {
  const ctx = useContext(WeatherQueryContext)
  if (!ctx) throw new Error("useWeatherQuery must be used within WeatherQueryProvider")
  return ctx
}