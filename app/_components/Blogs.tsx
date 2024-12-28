import React from 'react'
import SectionHeader from './SectionHeader'
import prisma from '@/lib/prisma'
import { Blog } from '@prisma/client'
import ImageComponent from '@/components/ImageComponent'
import { Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

type Props = {}

const Blogs = async(props: Props) => {

    const blogs = await prisma.blog.findMany({
        take:3,
        orderBy:{
            createdAt:'desc'
        }
    })
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[13px] px-8 sm:px-0'>
      {blogs.map(blog=><BlogCard key={blog.id}  blog={blog}/>)}

    </div>
  )
}

export default Blogs



const BlogCard = ({blog}:{blog:Blog})=>{
    const formattedDate = formatDistanceToNow(new Date(blog.createdAt),{addSuffix:true})
    return (
    <Link className='h-full' href={`/blog/${blog.slug}`}>
    <article className='p-[16px] rounded-[16px] border flex flex-col hover:shadow-md transition h-full'>
        <ImageComponent src={blog.featuredImage} alt='blog-image' aspect='video'  className='rounded-[12px] overflow-hidden'/>
        <div className='p-[4px] mt-[16px] flex flex-col gap-[16px] flex-1'>
            <h3 className='text-[16px] font-[500] text-[#414141]'>{blog.title}</h3>
            <p className='text-[12px] font-[400] text-[#757575]'>{blog.seoDescription}</p>
            <div className='flex justify-end text-[#757575] text-xs mt-auto items-center gap-2'>
                <Clock className='w-[18px] h-[18px]'  />
                <p>{formattedDate}</p>
            </div>

        </div>

    </article>
    </Link>
    )
}