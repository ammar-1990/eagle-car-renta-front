import { wait } from "@/lib/utils";
import Banner from "./_components/Banner";
import SearchComponent from "./_components/SearchComponent";
import { Suspense } from "react";

type Props = {}

 
export default async function Home(props: Props) {

  return (
    <div>
         <Banner label="Descover Top Cars <br/> With Just One Click." className="justify-end" labelStyles="mr-[110px]"/>
         {/* search component */}
         <div className="-mt-[72.5px]">
          <Suspense>
         <SearchComponent/>
         </Suspense>
         </div>
      
    </div>
  );
}
