import React, { PropsWithChildren } from 'react'

type Props = {} & PropsWithChildren

const Container = ({children}: Props) => {
  return (
    <div className='max-w-[1224px] w-full mx-auto'>
        {children}
    </div>
  )
}

export default Container