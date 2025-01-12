import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export const useSearchCars  =()=>{
    const [pending, startTransition] = useTransition()
    const router = useRouter()
    const searchParams = useSearchParams()

    const seats = searchParams.getAll('seats').flatMap((s) => s.split(','));
    const fuel = searchParams.getAll('fuel').flatMap((f) => f.split(','))
    const carYear = searchParams.get('carYear')
  

    const handleReset = ()=>{
        const params = new URLSearchParams(searchParams)
        params.delete('seats')
        params.delete('fuel')
        params.delete('carType')
        params.delete('pageNumber')
        params.delete('carYear')

        startTransition(()=>{
            router.push(`/cars?${params}`,{scroll:false})
            
        })

    }
 


    return { seats, fuel, carYear, handleReset,pending}
}