import React, { useEffect, useState } from 'react'
import './videodetails.css'
import { useParams } from 'react-router-dom'
import Youtube from 'react-youtube'
import RelatedVideosCard from '../RelatedVideosCard/RelatedVideosCard'

import VideoAbout from '../VideoAbout/VideoAbout'

const VideoDetails = () => {

  const { id } = useParams();

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


  useEffect(() => {

    // to fetch related videos data
    const fetchRelatedVideos = async () => {

      try {
        const response = await fetch(`${BASE_URL}/video/related-contents/?id=${id}&hl=en&gl=US`, options);
        const data = await response.json();
        console.log(data.contents);
        setRelatedVideoData(data.contents);
      } catch (error) {
        console.log(error);
      }

    }

    // to fetch video details
    const fetchVideoDetails = async () => {

      try {
        const response = await fetch(`${BASE_URL}/video/details/?id=${id}&hl=en&gl=US`, options);
        const data = await response.json();
        // console.log(data);
        setVideoData(data);
      } catch (error) {
        console.log(error);
      }

    }

    // to fetch video comments
    const fetchVideoComments = async () => {

      try {
        const response = await fetch(`${BASE_URL}/video/comments/?id=${id}&hl=en&gl=US`, options);
        const data = await response.json();
        console.log(data.comments);
        setCommentData(data.comments);
      } catch (error) {
        console.log(error);
      }
    }


    fetchVideoComments();
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id])

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

        <div>
          <VideoAbout 
            videoData={videoData}
            commentData={commentData}
          />
        </div>


      </div>

      <div className='related-videos mr-10'>
        {
          relatedVideoData.map((item, i) => {
            return (
              item.type === 'video' &&
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