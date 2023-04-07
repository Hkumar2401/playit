import React from 'react'
import './searchchannelcard.css'

const SearchChannelCard = (props) => {
  return (
    <div className='search-channel-card flex items-center cursor-pointer mx-auto mt-5 py-4 w-full border-t-2 border-gray-200 border-b-2'>
        <div className='channel-icon-section flex justify-center items-center'>
            <img className='search-channel-card-icon rounded-full' src={props.channelIcon} alt="" />
        </div>

        <div className="channel-details p-5 flex flex-col justify-center">
            <p className='text-xl'>{props.channelTitle}</p>
            <div className='flex mt-2'>
                <p className='text-sm'>{props.channelUsername}</p>
                <p className='ml-1 mr-1'>•</p>
                <p className='text-sm'>{props.subscribersCount}</p>
            </div>
            <p className='text-sm w-11/12/12 mt-1'>{props.channelDescription}</p>
        </div>

        <div className='bg-black text-white px-4 py-2 rounded-3xl ml-5 hover:bg-zinc-800'>
              <button>Subscribe</button>
        </div>
    </div>
  )
}

export default SearchChannelCard