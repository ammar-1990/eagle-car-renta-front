import ImageComponent from '@/components/ImageComponent'
import { cn } from '@/lib/utils'
import React from 'react'
import { Figtree } from "next/font/google";

type Props = {
    className?:string,
    labelStyles?:string,
    label:string
}

const figtree = Figtree({
    weight: ["400", "500", "700", "900"],
    subsets: ["latin"],
  });

const Banner = ({className,label,labelStyles}: Props) => {
  return (
    <div className={cn('h-[600px] w-full relative flex items-center  justify-center',className)}>
        <ImageComponent className='absolute w-full h-full' imgClassName='object-cover object-bottom' alt='banner' src='/banner.jpg' aspect='video' />
        <div className='absolute w-full h-full top-0 left-0 bg-site-primary/60' />
        <p className={cn('relative font-[700] text-[52px] text-white',labelStyles,figtree.className)} dangerouslySetInnerHTML={{ __html: label }}></p>
    </div>
  )
}

export default Banner