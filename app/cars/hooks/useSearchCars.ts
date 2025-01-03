import { useSearchParams } from "next/navigation"

export const useSearchCars  =()=>{

    const searchParams = useSearchParams()
    const seats = searchParams.getAll('seats').flatMap((s) => s.split(','));
    const fuel = searchParams.getAll('fuel').flatMap((f) => f.split(','))
 


    return { seats, fuel}
}