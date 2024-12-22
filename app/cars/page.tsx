import React, { Suspense } from 'react'
import Banner from '../_components/Banner'
import SearchComponent from '../_components/SearchComponent'

type Props = {}

const CarsPage = (props: Props) => {
  return (
    <div>
         <Banner label='Cars' />
         <div className="-mt-[72.5px]">
          <Suspense>
         <SearchComponent/>
         </Suspense>
         </div>
      </div>
  )
}

export default CarsPage