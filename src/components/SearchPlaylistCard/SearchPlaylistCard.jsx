import React from 'react'
import './searchplaylistcard.css'

const SearchPlaylistCard = (props) => {
  return (
    <div className='playlist-card flex mt-5 cursor-pointer'>

        <div className="playlist-thumbnail-section">
            <img src={props.thumbnail} alt="" className="playlist-thumbnail rounded-xl" />
        </div>

        <div className='playlist-details ml-5'>
            <p className='text-lg'>{props.playlistTitle}</p>
            <p className='text-sm'>{props.channelTitle}</p>
            <p className='text-xs mt-4 font-semibold text-gray-500'>VIEW FULL PLAYLIST</p>
        </div>

    </div>
  )
}

export default SearchPlaylistCard