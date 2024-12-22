import { wait } from "@/lib/utils";
import Banner from "./_components/Banner";

type Props = {}
export default async function Home(props: Props) {

  return (
    <div>
         <Banner label="Descover Top Cars <br/> With Just One Click." className="justify-end" labelStyles="mr-[110px]"/>
      HOME
    </div>
  );
}
