import React, { useEffect, useState, useRef } from 'react'
import './playlistvideocard.css'

const PlaylistVideoCard = (props) => {

    const { videoId, thumbnail, duration, title, channelName, setCurrentVideo } = props;

    const [durationEdit, setDurationEdit] = useState();

    const PlaylistVideoCardRef = useRef();

    useEffect(() => {
        const handleDuration = () => {
            let durationTemp = duration;
            let date = new Date(null);
            date.setSeconds(durationTemp);
            durationTemp = date.toISOString().substring(11, 19);
            if (durationTemp.startsWith("00:")) {
                durationTemp = durationTemp.replace("00:", " ");
            }
            setDurationEdit(durationTemp);
        }

        handleDuration();
    }, [])


    const handleClick = () =>{
        setCurrentVideo(videoId);
        
        const allPlaylistVideoCards = Array.from(document.getElementsByClassName('playlist-video-card'));
        console.log(allPlaylistVideoCards);
        allPlaylistVideoCards.forEach((element)=>{
            element.style.backgroundColor = '';
        });
        
        PlaylistVideoCardRef.current.style = 'background-color: rgb(228, 228, 228);';
    }
    

    return (
            <div ref={PlaylistVideoCardRef} className='playlist-video-card flex mt-1 p-1 cursor-pointer rounded-lg' onClick={handleClick}>
                <div className='related-video-thumbnail-section relative'>
                    <img className='related-video-thumbnail' src={thumbnail} alt="" />
                    <p className='absolute text-sm pl-1 pr-1 right-2 bottom-1 bg-black text-white'>{durationEdit}</p>
                </div>

                <div className="related-video-detail-section ml-2">
                    <p className='line-clamp-2'>{title}</p>
                    <p className='text-sm'>{channelName}</p>
                </div>
            </div>
    )
}

export default PlaylistVideoCard