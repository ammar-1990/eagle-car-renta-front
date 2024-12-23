import React from 'react'
import Container from './Container'
import ImageComponent from '@/components/ImageComponent'

type Props = {}

const BRANDS = [
    'Honda.png',
    'Hyundai.png',
    'Jeep.png',
    'Kia.png',
    'Lexus.png',
    'Mercedes.png',
    'Nissan.png',
    'Toyota.png'


]

const BrandsSlider = (props: Props) => {
  return (
    <Container className=' px-[8px]'>
        <div className="flex items-center flex-wrap justify-between   gap-[20px]">
            {BRANDS.map(brand=><ImageComponent key={brand} src={`/brands/${brand}`} alt='brand' aspect='square' className='w-[75px]' imgClassName='object-contain' />)}
        </div>
      </Container>
  )
}

export default BrandsSlider