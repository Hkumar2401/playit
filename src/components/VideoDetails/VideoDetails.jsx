import React, { useEffect, useState } from 'react'
import './videodetails.css'
import { Link, useParams } from 'react-router-dom'
import Youtube from 'react-youtube'
import RelatedVideosCard from '../RelatedVideosCard/RelatedVideosCard'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentCard from '../CommentCard/CommentCard'

const VideoDetails = () => {

    const {id} = useParams();

    const [relatedVideoData, setRelatedVideoData] = useState([]);

    const [commentData, setCommentData] = useState([]);

    const [videoData, setVideoData] = useState({
      title: '',
      author: {
        avatar: [
          {
            url: ''
          }
        ],
        title: '',
        stats: {
          subscribersText: '',
        }
      },
      stats: {
        likes: ''
      },
      publishedDate: '',
      description: '',
      superTitle: {
        items: [
          ''
        ]
      }

    });

    const BASE_URL = 'https://youtube138.p.rapidapi.com';

   
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
      }
    };
  
    
    useEffect(()=>{

      // to fetch related videos data
      const fetchRelatedVideos = async () =>{

        try{
          const response = await fetch(`${BASE_URL}/video/related-contents/?id=${id}&hl=en&gl=US`, options);
          const data = await response.json();
          console.log(data.contents);
          setRelatedVideoData(data.contents);
        }catch(error){
          console.log(error);
        }

      }

      // to fetch video details
      const fetchVideoDetails = async () =>{

        try{
          const response = await fetch(`${BASE_URL}/video/details/?id=${id}&hl=en&gl=US`, options);
          const data = await response.json();
          // console.log(data);
          setVideoData(data);
        }catch(error){
          console.log(error);
        }
        
      }

      // to fetch video comments
      const fetchVideoComments = async () =>{
        
          try{
            const response = await fetch(`${BASE_URL}/video/comments/?id=${id}&hl=en&gl=US`, options);
            const data = await response.json();
            console.log(data.comments);
            setCommentData(data.comments);
          }catch(error){
            console.log(error);
          }
        }


      fetchVideoComments();
      fetchVideoDetails();
      fetchRelatedVideos();
    },[id])

    const opts = {
      height: '750',
      width: '1250',
    };


    
  return (
    <div className='video-details flex mt-10 mx-auto ml-20'>

    <div className='video-player-section mr-8'>
      <div className='video-player'>
        <Youtube 
            videoId={id}
            opts={opts}
        />
      </div>

      <div className="video-player-details p-1 flex flex-col">
        <div>
          <h1 className='text-xl font-bold my-2'>{videoData.title}</h1>
        </div>

        <div className='flex justify-between'>
          <div className='channel-detail-section flex items-center'>

            <div>
              <img className='rounded-3xl' src={videoData.author.avatar[0].url} alt="" />
            </div>

            <div className='ml-3'>
              <h1 className='text-xl font-bold'>{videoData.author.title}</h1>
              <p>{videoData.author.stats.subscribersText}</p>
            </div>

            <div className='bg-black text-white px-4 py-2 rounded-3xl ml-5 hover:bg-zinc-800'>
              <button>Subscribe</button>
            </div>

          </div>


          <div className='cta-buttons flex items-center'>

            <div className='cta-button light-gray-color rounded-3xl flex items-center mr-2'>
              <button className='cta-button-color cursor-pointer rounded-l-3xl px-4 py-2'> <ThumbUpOutlinedIcon /> <span className='px-1'> {videoData.stats.likes} </span></button>
              <p className='text-gray-600'>|</p>
              <button className='cta-button-color cursor-pointer rounded-r-3xl px-4 py-2'> <ThumbDownOffAltOutlinedIcon /> </button>
            </div>

            <div className='cta-button mr-2'>
              <button className='cta-button-color rounded-3xl px-4 py-2'> 
                <div className='flex justify-center items-center'>
                  <p className='-scale-x-100 px-1'>
                    <ReplyOutlinedIcon /> 
                  </p> 
                  <p>Share</p>
                </div>
               </button>
            </div>

            <div className='cta-button mr-2'>
            <button className='cta-button-color rounded-3xl px-4 py-2'> 
                <div className='flex justify-center items-center'>
                  <p className='px-1'>
                    <ContentCutOutlinedIcon />
                  </p>
                  <p>Clip</p>
                </div>
               </button>
            </div>

            <div className='cta-button mr-2'>
            <button className='cta-button-color rounded-3xl px-4 py-2'> 
                <div className='flex justify-center items-center'>
                  <p className='px-1'>
                    <PlaylistAddOutlinedIcon />
                  </p> 
                  <p>Save</p>
                </div>
               </button>
            </div>

            <div className='cta-button'>
            <button className='cta-button-color rounded-3xl px-4 py-2'> 
                <MoreHorizOutlinedIcon />
               </button>
            </div>
          </div>
        </div>


        <div className="description bg-gray-200 p-2 rounded-xl mt-5">
          <div className='flex'>
            <p className='mr-3 text-sm font-bold'>{videoData.stats.views} views</p>
            <p className='mr-3 text-sm font-bold'>{videoData.publishedDate}</p>
            <p className='mr-1 text-sm'>{videoData.superTitle.items[0]}</p>
          </div>
        </div>

        <div className="comment-section mt-5">
          <p>{videoData.stats.comments} Comments</p>

          <div className='comments'>
              
              {
                commentData.map((item,i)=>{
                  return (
                    <CommentCard 
                      key={i}
                      avatar={item.author.avatar.reverse()[0].url}
                      title={item.author.title}
                      publishedAt={item.publishedTimeText}
                      content={item.content}
                      votes={item.stats.votes}
                    />
                  );
                })
              }
              
          </div>
          
        </div>

        
      </div>


    </div>

    <div className='related-videos mr-10'>
      {
        relatedVideoData.map((item, i)=>{
          return (
            <RelatedVideosCard 
              key={i}
              videoId={item.video.videoId}
              thumbnail={item.video.thumbnails.reverse()[0].url}
              title={item.video.title}
              channelName={item.video.author.title}
              viewCount={item.video.stats.views}
              publishedAt={item.video.publishedTimeText}
            />
          );
        })
      }
    </div>

    </div>
  )
}

export default VideoDetails