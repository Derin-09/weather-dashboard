
"use client"

import React, { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Line,
} from "recharts"
import type { ValueType, Payload } from 'recharts/types/component/DefaultTooltipContent'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/rainChart/card"
import Skeleton from "@/components/ui/skeleton"
import { fetchWeather } from "@/lib/fetchW"

const CAT_LABELS = ["Heavy", "Sunny", "Rainy"] as const

type Category = typeof CAT_LABELS[number]

type HourlyData = {
  time: string
  cat: Category
  catIndex: number 
  value: number 
}

type WeatherHour = {
  time: string
  chance_of_rain: number
  temp_c: number
  humidity?: number
  condition: { icon: string; text: string }
  feelslike_c: number
}

function categorize(h: WeatherHour): Category {
  const text = h.condition.text?.toLowerCase() || ""
  const cor = h.chance_of_rain ?? 0
  if (text.includes("heavy") || cor >= 70) return "Heavy"
  if (text.includes("rain") || cor >= 30) return "Rainy"
  return "Sunny"
}

export default function ChartLineDots() {
  const [data, setData] = useState<HourlyData[]>([])

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await fetchWeather("Lagos")
        if (res?.forecast?.forecastday?.[0]?.hour) {
          const hours: WeatherHour[] = res.forecast.forecastday[0].hour.slice(0, 8)
          const formatted = hours.map((h) => {
            const cat = categorize(h)
            const catIndex = CAT_LABELS.indexOf(cat) 
            return {
              time: h.time.split(" ")[1],
              cat,
              catIndex,
              value: h.chance_of_rain ?? 0,
            }
          })
          setData(formatted)
        }
      } catch (err) {
        console.error("Weather fetch failed:", err)
      }
    }
    getWeather()
  }, [])

  const isLoading = data.length === 0

  return (
    <Card className="w-full max-w-lg bg-[#111015] text-white z-0">
      <CardHeader>
        <CardTitle>Chance Of Rain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 md:h-53">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                {/* X axis = time labels */}
                <XAxis dataKey="time" tick={{ fill: "#aaa" }} />

                {/* Left Y axis = categorical levels */}
                <YAxis
                  yAxisId="cat"
                  type="number"
                  domain={[0, 2]}
                  ticks={[0, 1, 2]}
                  tickFormatter={(v) => CAT_LABELS[v as 0 | 1 | 2]}
                  tick={{ fill: "#aaa" }}
                />

                {/* Right Y axis = numeric for bar heights  */}
                <YAxis yAxisId="val" orientation="right" type="number" domain={[0, 100]} hide />

                <Tooltip
formatter={(val: ValueType, name: string, ctx: Payload<ValueType, string>): [string | number, string] => {
                    if (String(name) === 'catIndex') {
                      const idx = typeof val === 'number' ? val : Number(val)
                      const p = ctx.payload as unknown as HourlyData | undefined
                      return [CAT_LABELS[idx as 0 | 1 | 2], p?.time ?? '']
                    }
                    const num = typeof val === 'number' ? val : Number(val)
                    return [`${Number.isFinite(num) ? num : ''}%`, 'Chance']
                  }}
                  labelFormatter={(label: string) => label}
                />

                {/* Thin vertical bars (chance of rain) */}
                <Bar yAxisId="val" dataKey="value" fill="#CFEAFE" barSize={6} radius={[10, 10, 0, 0]} />

                {/* line across categorical Y levels */}
                <Line
                  yAxisId="cat"
                  type="monotone"
                  dataKey="catIndex"
                  stroke="#90CAF9"
                  strokeWidth={2}
                  dot={{ r: 3, stroke: "#90CAF9", fill: "#fff" }}
                  activeDot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


