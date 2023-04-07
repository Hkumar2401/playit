import React from 'react'
import './searchsection.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SearchVideoCard from '../SearchVideoCard/SearchVideoCard'
import SearchChannelCard from '../SearchChannelCard/SearchChannelCard'
import SearchPlaylistCard from '../SearchPlaylistCard/SearchPlaylistCard'

const SearchSection = () => {

    

    const {query} = useParams();
    
    const [searchData, setSearchData] = useState([]);

    const BASE_URL = 'https://youtube138.p.rapidapi.com/search';
    
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };
    
    useEffect(()=>{

        const fetchSearchData = async () =>{
            const res = await fetch(`${BASE_URL}/?q=${query}`, options);
            const data = await res.json();
            console.log(data.contents);
            setSearchData(data.contents);
        }
        
        fetchSearchData();
    }, [query]);
    
  return (
    <div className='flex flex-col mx-auto mt-20 justify-center'>
        {
            searchData.map((item, i)=>{
                return (
                    <>
                    {
                        item.type === "video" ? 
                        <SearchVideoCard 
                            key={i}
                            videoId={item.video.videoId}
                            thumbnail={item.video.thumbnails.reverse()[0].url}
                            movingThumbnail={item.video.movingThumbnails === null ? null : item.video.movingThumbnails[0].url}
                            title={item.video.title}
                            viewCount={item.video.stats.views}
                            publishedAt={item.video.publishedTimeText}
                            channelIcon={item.video.author.avatar.reverse()[0].url}
                            channelTitle={item.video.author.title}
                            description={item.video.descriptionSnippet}
                        />
                        :
                        item.type === "channel" ?
                        <SearchChannelCard 
                            key={i}
                            channelId={item.channel.channelId}
                            channelIcon={item.channel.avatar.reverse()[0].url}
                            channelTitle={item.channel.title}
                            channelUsername={item.channel.username}
                            subscribersCount={item.channel.stats.subscribersText}
                            channelDescription={item.channel.descriptionSnippet}
                        />
                        :
                        <SearchPlaylistCard 
                            key={i}
                            playlistId={item.playlist.playlistId}
                            thumbnail={item.playlist.thumbnails.reverse()[0].url}
                            playlistTitle={item.playlist.title}
                            channelTitle={item.playlist.author.title}
                        />


                    }
                    </>
                );
            })
        }
    </div>
  )
}

export default SearchSection