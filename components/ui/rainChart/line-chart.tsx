// "use client"

// import {
//   ResponsiveContainer,
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Bar,
//   Line,
//   Scatter
// } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const data = [
//   { time: "10AM", weather: "Rainy", value: 8 },
//   { time: "11AM", weather: "Sunny", value: 10 },
//   { time: "12PM", weather: "Heavy", value: 15 },
//   { time: "1PM", weather: "Sunny", value: 5 },
//   { time: "2PM", weather: "Heavy", value: 14 },
//   { time: "3PM", weather: "Rainy", value: 6 },
// ]

// export default function ChartLineDots() {
//   return (
//     <Card className="w-full max-w-lg mx-auto bg-[#111] text-white">
//       <CardHeader>
//         <CardTitle>Chance Of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart
//               data={data}
//               margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />

//               {/* time along the X axis */}
//               <XAxis dataKey="time" tick={{ fill: "#aaa" }} />

//               {/* categorical labels on Y */}
//               <YAxis
//                 type="category"
//                 dataKey="weather"
//                 tick={{ fill: "#aaa" }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <Tooltip />

//               {/* thin vertical bars */}
//               <Bar
//                 dataKey="value"
//                 fill="#4FC3F7"
//                 barSize={6}
//                 radius={[10, 10, 0, 0]}
//               />

//               {/* smooth line */}
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#90CAF9"
//                 strokeWidth={2}
//                 dot={false}
//               />

//               {/* dots */}
//               <Scatter dataKey="value" fill="#fff" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }











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
  Scatter,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/rainChart/card"
import { fetchWeather } from "@/lib/fetchW"

type HourlyData = {
  time: string
  rainChance: number
  temp: number
  humidity: number
}
// type WeatherHour = {
//   time: string
//   chance_of_rain: number
//   temp_c: number
//   humidity: number
// }

type WeatherHour = {
  time: string
  chance_of_rain: number
  temp_c: number
  humidity?: number
  condition: {
    icon: string
    text: string
  }
  feelslike_c: number
}


export default function ChartLineDots() {
  const [data, setData] = useState<HourlyData[]>([])

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await fetchWeather("Lagos") // or whatever city
        if (res?.forecast?.forecastday?.[0]?.hour) {
          const hours: WeatherHour[] = res.forecast.forecastday[0].hour.slice(0, 8) // grab first 8 hours
          const formatted = hours.map((h) => ({
            time: h.time.split(" ")[1], // "2025-09-21 14:00" -> "14:00"
            rainChance: h.chance_of_rain,
            temp: h.temp_c,
            humidity: h.humidity ?? 0,
          }))
          setData(formatted)
        }
      } catch (err) {
        console.error("Weather fetch failed:", err)
      }
    }
    getWeather()
  }, [])

  return (
    <Card className="w-full max-w-lg bg-[#111015] text-white z-0">
      <CardHeader>
        <CardTitle>Chance Of Rain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 md:h-53">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 0, right: -10, left: -30, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
              <YAxis tick={{ fill: "#aaa" }} />
              <Tooltip />

              <Bar dataKey="rainChance" fill="#4FC3F7" barSize={6} radius={[10, 10, 0, 0]} />
              <Line type="monotone" dataKey="temp" stroke="#90CAF9" strokeWidth={2} dot={false} />
              <Scatter dataKey="humidity" fill="#fff" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}








// "use client"

// import {
//   ResponsiveContainer,
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Bar,
//   Line,
//   Scatter
// } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/rainChart/card"
// import { useEffect, useState } from "react"
// import { fetchWeather, WeatherResponse } from "@/lib/fetchW"

// export default function ChartLineDots() {
//   const [chartData, setChartData] = useState<
//     { time: string; weather: string; value: number }[]
//   >([])

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         // call your fetchWeather with a city string or coords
//         const res = await fetchWeather("Beijing")
//         if (!res) return

//         // API gives forecast array, so shape it into chart’s format
//         const hourly = res.forecast.forecastday[0].hour.slice(8, 15) // example: 8AM - 3PM
//         const shaped = hourly.map((h) => ({
//           time: new Date(h.time).toLocaleTimeString([], { hour: "numeric" }),
//           weather: h.condition.text,
//           value: h.chance_of_rain ?? h.temp_c, // whatever you want plotted
//         }))

//         setChartData(shaped)
//       } catch (err) {
//         console.error("weather fetch fail:", err)
//       }
//     }

//     getData()
//   }, [])

//   return (
//     <Card className="w-full max-w-lg bg-[#111015] text-white z-0">
//       <CardHeader>
//         <CardTitle>Chance Of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80 md:h-53">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart
//               data={chartData}
//               margin={{ top: 0, right: -10, left: -30, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />

//               <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
//               <YAxis tick={{ fill: "#aaa" }} />

//               <Tooltip
//                 formatter={(val, _name, props) => [
//                   `${val}`,
//                   `(${props.payload.weather})`,
//                 ]}
//               />

//               <Bar dataKey="value" fill="#4FC3F7" barSize={6} radius={[10, 10, 0, 0]} />
//               <Line type="monotone" dataKey="value" stroke="#90CAF9" strokeWidth={2} dot={false} />
//               <Scatter dataKey="value" fill="#fff" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }






// "use client"

// import {
//   ResponsiveContainer,
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Bar,
//   Line,
//   Scatter
// } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/rainChart/card"

// const data = [
//   { time: "10AM", weather: "Rainy", value: 8 },
//   { time: "11AM", weather: "Sunny", value: 10 },
//   { time: "12PM", weather: "Heavy", value: 15 },
//   { time: "1PM", weather: "Sunny", value: 5 },
//   { time: "2PM", weather: "Heavy", value: 14 },
//   { time: "3PM", weather: "Rainy", value: 6 },
// ]

// export default function ChartLineDots() {
//   return (
//     <Card className="w-full max-w-lg bg-[#111015] text-white z-0">
//       <CardHeader>
//         <CardTitle>Chance Of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80 md:h-53">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart
//               data={data}
//               margin={{ top: 0, right: -10, left: -30, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />

//               {/* time along X-axis */}
//               <XAxis dataKey="time" tick={{ fill: "#aaa" }} />

//               {/* numeric values on Y-axis */}
//               <YAxis  tick={{ fill: "#aaa" }} />

//               <Tooltip formatter={(val, name, props) => [`${val}`, `Value (${props.payload.weather})`]} />

//               <Bar dataKey="value" fill="#4FC3F7" barSize={6} radius={[10, 10, 0, 0]} />
//               <Line type="monotone" dataKey="value" stroke="#90CAF9" strokeWidth={2} dot={false} />
//               <Scatter dataKey="value" fill="#fff" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }















// "use client"

// import {
//   ResponsiveContainer,
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Bar,
//   Line,
//   Scatter
// } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const data = [
//   { time: "10AM", weather: "Rainy", value: 8 },
//   { time: "11AM", weather: "Sunny", value: 10 },
//   { time: "12PM", weather: "Heavy", value: 15 },
//   { time: "1PM", weather: "Sunny", value: 5 },
//   { time: "2PM", weather: "Heavy", value: 14 },
//   { time: "3PM", weather: "Rainy", value: 6 },
// ]

// export default function ChartLineDots() {
//   return (
//     <Card className="w-full max-w-lg bg-[#111] text-white">
//       <CardHeader>
//         <CardTitle>Chance Of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart
//               data={data}
//               margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />

//               {/* time along X-axis */}
//               <XAxis dataKey="time" tick={{ fill: "#aaa" }} />

//               {/* categorical weather labels on Y-axis */}
//               <YAxis
//                 type="category"
//                 dataKey="weather"
//                 tick={{ fill: "#aaa" }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <Tooltip />

//               {/* thin vertical bars */}
//               <Bar
//                 dataKey="value"
//                 fill="#4FC3F7"
//                 barSize={6}
//                 radius={[10, 10, 0, 0]}
//               />

//               {/* smooth line */}
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#90CAF9"
//                 strokeWidth={2}
//                 dot={false}
//               />

//               {/* dots */}
//               <Scatter dataKey="value" fill="#fff" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }








// "use client"

// import {
//   ResponsiveContainer,
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Bar,
//   Line,
//   Scatter
// } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const data = [
//   { time: "10AM", weather: "Rainy", value: 8 },
//   { time: "11AM", weather: "Sunny", value: 10 },
//   { time: "12PM", weather: "Heavy", value: 15 },
//   { time: "1PM", weather: "Sunny", value: 5 },
//   { time: "2PM", weather: "Heavy", value: 14 },
//   { time: "3PM", weather: "Rainy", value: 6 },
// ]

// export default function ChartLineDots() {
//   return (
//     <Card className="w-full max-wlg  bg-[#111] text-white">
//       <CardHeader>
//         <CardTitle>Chance Of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart
//               data={data}
//               layout="vertical" // 🔑 flip layout so categories go on Y
//               //margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />

//               {/* numeric values across X */}
//               <XAxis 
//               type="number" 
//               // dataKey="time"
//               tick={{ fill: "#aaa" }} 
//               />

//               {/* categorical weather labels on Y */}
//               <YAxis
              
//                 type="category"
//                 dataKey="weather"
//                 tick={{ fill: "#aaa" }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <Tooltip />

//               {/* thin vertical bars */}
//               <Bar
//                 dataKey="value"
//                 fill="#4FC3F7"
//                 barSize={6}
//                 radius={[10, 10, 0, 0]}
//               />

//               {/* smooth line */}
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#90CAF9"
//                 strokeWidth={2}
//                 dot={false}
//               />

//               {/* dots */}
//               <Scatter dataKey="value" fill="#fff" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }













// "use client"

// import {
//   ResponsiveContainer,
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Bar,
//   Line,
//   Scatter
// } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const data = [
//   { time: "10AM", value: 8 },
//   { time: "11AM", value: 10 },
//   { time: "12PM", value: 15 },
//   { time: "1PM", value: 5 },
//   { time: "2PM", value: 14 },
//   { time: "3PM", value: 6 },
// ]

// export default function ChartLineDots() {
//   return (
//     <Card className="w-full max-w-lg mx-auto bg-[#111] text-white">
//       <CardHeader>
//         <CardTitle>Chance Of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//               <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
//               <YAxis tick={{ fill: "#aaa" }} />
//               <Tooltip />
              
//               {/* thin vertical bars */}
//               <Bar dataKey="value" fill="#4FC3F7" barSize={6} radius={[10, 10, 0, 0]} />
              
//               {/* smooth line */}
//               <Line type="monotone" dataKey="value" stroke="#90CAF9" strokeWidth={2} dot={false} />
              
//               {/* dots */}
//               <Scatter dataKey="value" fill="#fff" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }











// "use client"

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const data = [
//   { weather: "Rainy", value: 12 },
//   { weather: "Sunny", value: 8 },
//   { weather: "Heavy", value: 15 },
//   { weather: "", value: 15 },
// ]

// export default function ChartLineDots() {
//   return (
//     <Card className="w-full max-w-lg mx-auto">
//       <CardHeader>
//         <CardTitle>Chance of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               layout="vertical"
//               data={data}
//               margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis 
//               type="number"
//               axisLine={true}   />
//               <YAxis
//                 type="category"
//                 dataKey="weather"
//                 axisLine={true}   // vertical line ON
//                 tickLine={false}  // hide small tick marks
//                 tickMargin={8}
//               />
//               <Tooltip />
//               <Bar dataKey="weather" fill="#8884d8" radius={[4, 4, 4, 4]} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

















// "use client"

// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from '@/components/ui/card'
// import {
//     ChartConfig,
//     ChartContainer,
// } from '@/components/ui/chart'

// const chartData = [
//     { time: "10AM", weather: "Rainy", desktop: 186, mobile: 80 },
//     { time: "11AM", weather: "", desktop: 305, mobile: 200 },
//     { time: "12AM", weather: "Sunny", desktop: 237, mobile: 120 },
//     { time: "1AM", weather: "", desktop: 73, mobile: 190 },
//     { time: "2AM", weather: "Heavy", desktop: 209, mobile: 130 },
//     { time: "3AM", weather: "", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "var(--chart-1)",
//     },
//     mobile: {
//         label: "Mobile",
//         color: "var(--chart-2)",
//     },
// } satisfies ChartConfig

// export function ChartLineDots() {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Chance of Rain</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig}>
//                     <LineChart data={chartData}>
//                         <CartesianGrid />
//                         <XAxis
//                             dataKey="time"
//                             tickLine={false}
//                             axisLine={false}
//                             tickMargin={8}
//                         />
//                         <YAxis
//                             type="category"
//                             dataKey="weather"
//                             tickLine={false}
//                             axisLine={false}
//                             tickMargin={8}
//                         />
//                         <Line
//                             dataKey="desktop"
//                             type="natural"
//                             stroke="var(--color-desktop)"
//                             strokeWidth={2}
//                             dot={{ fill: "var(--color-desktop)" }}
//                             activeDot={{ r: 6 }}
//                         />
//                     </LineChart>
//                 </ChartContainer>
//             </CardContent>
//         </Card>
//     )
// }





















// "use client"

// import { TrendingUp } from "lucide-react"
// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'

// export const description = "A line chart with dots"

// const chartData = [
//   { time: "10AM", desktop: 186, mobile: 80 },
//   { time: "11AM", desktop: 305, mobile: 200 },
//   { time: "12AM", desktop: 237, mobile: 120 },
//   { time: "1AM", desktop: 73, mobile: 190 },
//   { time: "2AM", desktop: 209, mobile: 130 },
//   { time: "3AM", desktop: 214, mobile: 140 },
// ]

// const weather = ["Rainy", "Sunny", "Heavy"]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig

// export function ChartLineDots() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Chance of Rain</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             // margin={{
//             //   left: 12,
//             //   right: 12,
//             // }}
//           >
//             <CartesianGrid
//             // vertical={false}
//             />
//             <XAxis
//               dataKey="time"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <YAxis
//               dataKey="weather"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             {/* <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             /> */}
//             <Line
//               dataKey="desktop"
//               type="natural"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={{
//                 fill: "var(--color-desktop)",
//               }}
//               activeDot={{
//                 r: 6,
//               }}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }
