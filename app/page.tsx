import { wait } from "@/lib/utils";
import Banner from "./_components/Banner";
import SearchComponent from "./_components/SearchComponent";
import { Suspense } from "react";
import Container from "./_components/Container";
import BrandsSlider from "./_components/BrandsSlider";
import Benefits from "./_components/Benefits";
import OurCars from "./_components/OurCars";

type Props = {};

export default async function Home(props: Props) {
  return (
    <div>
      <Banner
        label="Descover Top Cars <br/> With Just One Click."
        className="justify-end"
        labelStyles=""
      />
      {/* search component */}
      <div className="-mt-[72.5px]">
        <Suspense>
          <SearchComponent />
        </Suspense>
      </div>
      {/* Brands Slider */}
      <div className="mt-[52px]">
        <BrandsSlider />
      </div>
      {/* Benefits */}
      <div className="mt-[41px] pb-[95px]">
        <Benefits />
      </div>
      {/* Our Cars */}
      <div className="py-[95px] bg-[#F5F5F5]">
      <OurCars />
      </div>
   
    </div>
  );
}
