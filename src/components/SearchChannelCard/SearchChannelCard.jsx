import React from 'react'
import './searchchannelcard.css'
import { Link } from 'react-router-dom'

const SearchChannelCard = (props) => {

  const {channelId, channelIcon, channelTitle, channelUsername, subscribersCount, channelDescription} = props;
  
  return (
    <Link to={`/channel/details/${channelId}`}>
      <div className='search-channel-card flex items-center cursor-pointer mx-auto mt-5 py-4 w-full border-t-2 border-gray-200 border-b-2'>
          <div className='channel-icon-section flex justify-center items-center'>
              <img className='search-channel-card-icon rounded-full' src={channelIcon} alt="" />
          </div>

          <div className="channel-details p-5 flex flex-col justify-center">
              <p className='text-xl'>{channelTitle}</p>
              <div className='flex mt-2'>
                  <p className='text-sm'>{channelUsername}</p>
                  <p className='ml-1 mr-1'>•</p>
                  <p className='text-sm'>{subscribersCount}</p>
              </div>
              <p className='text-sm w-11/12/12 mt-1'>{channelDescription}</p>
          </div>

          <div className='bg-black text-white px-4 py-2 rounded-3xl ml-5 hover:bg-zinc-800'>
                <button>Subscribe</button>
          </div>
      </div>
    </Link>
  )
}

export default SearchChannelCard