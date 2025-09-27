import GridOne from "@/components/sections/desktop/gridOne/GridOne";
import GridTwo from "@/components/sections/desktop/gridTwo/GridTwo";
import Explore from "@/components/sections/mobile/Explore";
import Forecast from "@/components/sections/mobile/Forecast/Forecast";
import OtherCities from "@/components/sections/mobile/OtherCities";
import Overview from "@/components/sections/mobile/Overview";
import RainChance from "@/components/sections/mobile/RainChance";

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

      {/* Desktop grid: centered container, progressively tighter gaps at larger widths */}
      <div className="hidden md:grid grid-cols-5 px-4 md:px-6 pb-6 max-w-screen-2xl mx-auto w-full gap-6 lg:gap-4 xl:gap-3 2xl:gap-2 place-items-stretch">
        <div className="col-span-4 items-stretch">
          <GridOne />
        </div>
        <div className="col-span-1  md:pl-4">
          <GridTwo />
        </div>
      </div>
    </main>
  );
}
