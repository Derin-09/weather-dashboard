import GridOne from "@/components/sections/desktop/gridOne/GridOne";
import GridTwo from "@/components/sections/desktop/gridTwo/GridTwo";
import Explore from "@/components/sections/mobile/Explore";
import Forecast from "@/components/sections/mobile/Forecast/Forecast";
import OtherCities from "@/components/sections/mobile/OtherCities";
import Overview from "@/components/sections/mobile/Overview";
import RainChance from "@/components/sections/mobile/RainChance";
import Image from "next/image";

export default function Home() {
  return (
    <main  style={{ fontFamily: 'var(--font-montserrat)' }}>
      <div className=" md:hidden px-6 space-y-5 pb-6">
        <Forecast />
        <RainChance />
        <Overview />
        <Explore />
        <OtherCities />
      </div>

      <div className="md:grid grid-cols-5 px-6 gap-6 hidden pb-6">
        <div className="col-span-4 items-stretch">
          <GridOne />
        </div>
        <div className="col-span-1">
          <GridTwo />
        </div>
      </div>
    </main>
  );
}
