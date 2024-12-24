import React from 'react'
import Container from './Container'
import prisma from '@/lib/prisma'
import { LOCATIONS_CONST } from '@/lib/Types'
import CarCard from './cards/CarCard'

type Props = {
    location:(typeof LOCATIONS_CONST)[number]
}

const CarsByLocation =async ({location}: Props) => {
const cars = await prisma.car.findMany({
    where:{
        location:location
    },
    include:{
      carType:{
        select:{
          title:true
        }
      }
    }
})

  return (
    <Container>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]'>
    {cars.map(car=><CarCard key={car.id} car={car}  />)}
   </div>
    </Container>
 
  )
}

export default CarsByLocation