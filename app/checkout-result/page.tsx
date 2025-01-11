import React from 'react'

type Props = {
    searchParams:Promise<{bookingCode:string | undefined,canceled:string|undefined}>
}

const CheckoutResultPage = async ({searchParams}: Props) => {
    const {bookingCode, canceled} = await searchParams
  return (
    <div className='min-h-screen flex items-center justify-center'>
        {bookingCode}
        {canceled}
    </div>
  )
}

export default CheckoutResultPage