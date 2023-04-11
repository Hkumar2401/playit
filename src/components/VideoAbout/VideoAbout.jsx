import React, {useState, useEffect} from 'react'
import './videoabout.css'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentCard from '../CommentCard/CommentCard'

const VideoAbout = ({videoData, commentData}) => {


  const [viewsCompute, setViewsCompute] = useState(0);

  const [likesCompute, setLikesCompute] = useState(0);

  const handleViews = () =>{
    let views = videoData.stats.views;
    if(views<1000){
 
    } else if(views>=1000 && views<100000){
      views = `${Math.floor((views*10)/1000)/10}k`;
    } else if(views>=100000 && views<1000000){
      views = `${Math.floor((views*10)/1000)/10}k`;
    } else if(views>=1000000 && views<1000000000){
      views = `${Math.floor((views*10)/1000000)/10}M`;
    } else if(views>=1000000000 && views<1000000000000){
      views = `${Math.floor((views*10)/1000000000)/10}B`;
    }
    setViewsCompute(views);
  }

  const handleLikes = () =>{
    let likes = videoData.stats.likes;
    if(likes<1000){

    } else if(likes>=1000 && likes<100000){
      likes = `${Math.floor((likes*10)/1000)/10}k`;
    } else if(likes>=100000 && likes<1000000){
      likes = `${Math.floor((likes*10)/1000)/10}k`;
    } else if(likes>=1000000 && likes<1000000000){
      likes = `${Math.floor((likes*10)/1000000)/10}M`;
    } else if(likes>=1000000000 && likes<1000000000000){
      likes = `${Math.floor((likes*10)/1000000000)/10}B`;
    }
    setLikesCompute(likes);
  }
 
  useEffect(()=>{
    handleViews();
    handleLikes();
  },[])
  
  
  
  return (
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
                <button className='cta-button-color cursor-pointer rounded-l-3xl px-4 py-2'> <ThumbUpOutlinedIcon /> <span className='px-1'> {likesCompute} </span></button>
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
              <p className='mr-3 text-sm font-bold'>{viewsCompute} views</p>
              <p className='mr-3 text-sm font-bold'>{videoData.publishedDate}</p>
              <p className='mr-1 text-sm'>{videoData.superTitle.items[0]}</p>
            </div>
            <div className='mt-5'>
              <pre className='whitespace-pre-wrap'>{videoData.description}</pre>
            </div>
          </div>

          <div className="comment-section mt-5">
            <p>{videoData.stats.comments} Comments</p>

            <div className='comments'>

              {
                commentData.map((item, i) => {
                  return (
                    <CommentCard
                      key={i}
                      avatar={item.author.avatar[item.author.avatar.length - 1].url}
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
  )
}

export default VideoAbout