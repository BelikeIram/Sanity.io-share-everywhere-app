import React from 'react'
import Masonry from 'react-masonry-css' 
import PinSingle from './PinSingle'

const breakpointobj = {
    default : 4,
    3000 : 6,
    2000: 5,
    1200 : 3,
    1000: 2,
    500 : 1
}
const MasonryLayout = ({pins}) => {
  return (
   <Masonry className='flex animate-slide-fwd h-screen' breakpointCols={breakpointobj}>
       {pins?.map((pin)=>{
          return <PinSingle key={pin?._id} pin={pin} />
       })}
   </Masonry>
  )
}

export default MasonryLayout;