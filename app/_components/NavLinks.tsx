import { CarType } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import ComboBoxField from './ComboBoxField'

type Props = {
    carTypes:CarType[]
}

const links = [
    {
        label:"home",
        href:"/",
    },
    {
        label:"about us",
        href:"/about-us",
    },
    {
        label:"all vehicles",
        href:"/cars",
    },
    {
        label:"rent by type",
   
    },

]

const NavLinks = ({carTypes}: Props) => {
    const refactoredCarTypes = carTypes.map(type=>({value:type.id,label:type.title}))
  return (
    <nav className='flex items-center gap-[40px]'>
        {links.map((link, index)=>{
            if(link.href){
                return (
                    <Link key={`link-${index}`} href={link.href} className='text-[#353535] text-[16px] capitalize font-[500]'>
                        {link.label}
                    </Link>
                )
            }else{
                return(<ComboBoxField items={refactoredCarTypes} placeholder='Select Car Type' param='carType' />)
            }
        })}
    </nav>
  )
}

export default NavLinks