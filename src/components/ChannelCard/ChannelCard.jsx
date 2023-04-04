import React from 'react'
import './channelcard.css'

const ChannelCard = (props) => {

 
  return (
    <div className='channel-card flex relative justify-center items-center'>
      
      <div className="channel-icon w-52">
        <img src={props.channelIcon} className='absolute opacity-40 left-16 bottom-16 w-56' alt="channel-icon" />
      </div>

      <div className="channel-details pl-4 z-10">
        <h1 className='font-bold'>{props.channelTitle}</h1>
        <div className='flex mb-3'>
          <p className='font-extralight text-xs'>{props.channelUsername}</p>
          <p className='pl-2 pr-2 text-xs'>•</p>
          <p className='text-xs font-extralight'>{props.subscribersCount}</p>
        </div>
        <p className='line-clamp-2'>{props.channelDescription}</p>
      </div>
      
    </div>
  )
}

export default ChannelCard