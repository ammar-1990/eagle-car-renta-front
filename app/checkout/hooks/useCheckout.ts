import { CarsWithBookings } from "@/lib/Types";

export const useCheckout = ({car,totalPrice}:{car:CarsWithBookings[number], totalPrice:number})=>{

    const totalAmount = totalPrice + car.deposit


    return {totalAmount}

}