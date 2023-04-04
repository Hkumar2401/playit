import React from 'react'
import './skeletonvideocard.css'

const SkeletonVideoCard = ({fullSidebar}) => {
  return (
    <div className={`skeleton-card flex flex-col mt-5 ml-2 mr-2  ${fullSidebar ? 'skeleton-card-full-sidebar' : 'skeleton-card-not-full-sidebar'}`}>
    <div className="top relative">
        <div className="thumbnail"></div>

    </div>

    <div className="bottom flex">
      <div className='pt-4'>
        <div className='channel-icon'></div>

      </div>

      <div className="details ml-3 pt-3 flex-col">
        <div className='pb-1'>
          <p className='w-60 h-5'></p>
        </div>
        <div className='pb-1'>
          <p className='w-32 h-5'></p>
        </div>
        <div className='flex'>
          <p className='w-14 h-5'></p>
          <span className='pl-1 pr-1'>•</span>
          <p className='w-14 h-5'></p>
        </div>
      </div>
    
    </div>
  </div>
  )
}

export default SkeletonVideoCard