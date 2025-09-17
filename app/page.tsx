import Explore from "@/components/sections/Explore";
import Forecast from "@/components/sections/Forecast/Forecast";
import OtherCities from "@/components/sections/OtherCities";
import Overview from "@/components/sections/Overview";
import RainChance from "@/components/sections/RainChance";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-6 space-y-4" style={{fontFamily: 'var(--font-montserrat)'}}>
      <Forecast />
      <RainChance />
      <Overview />
      <Explore />
      <OtherCities />
    </main>
  );
}
