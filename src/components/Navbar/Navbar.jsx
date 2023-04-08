import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MicIcon from '@mui/icons-material/Mic';
import YoutubeIcon from '../../assets/youtube-icon.png'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const Navbar = (props) => {

  const hamburgerButton = useRef();
  const searchIconOnFocus = useRef();
  const hoverTitleSearch = useRef();
  const hoverTitleMic = useRef();
  const hoverTitleCreate = useRef();
  const hoverTitleNotifications = useRef();

  
  const handleClick = () =>{
    if(props.fullSidebar==true){
      props.setFullSidebar(false);
    } else{
      props.setFullSidebar(true);
    }
  }

  
  
  
  return (
    <div className="navbar flex justify-between items-center pl-2 pr-2">
        <div className="logo-section flex items-center">
          <div className="hamburger-icon-section">
            <button ref={hamburgerButton} onClick={handleClick} className='hamburger-icon'>
                <div className="hamburger-icon-lines"></div>
                <div className="hamburger-icon-lines"></div>
                <div className="hamburger-icon-lines"></div>
            </button>
          </div>

          <Link to={'/category/ohara'}>
          <div title='Youtube Home' className="youtube-icon ml-5 mt-1 flex items-center cursor-pointer">
              <img className='w-8' src={YoutubeIcon} alt="" />
              <p className='font-semibold text-2xl ml-1'>Youtube <sup className='font-light text-xs text-gray-500'>IN</sup> </p>
          </div>
          </Link>
        </div>

        <div className="search-section pt-2 flex items-center">
          <button className='search-icon-focus'  ref={searchIconOnFocus}><SearchRoundedIcon fontSize='large' className='p-1' /></button>
          <input 
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            className='search-input' 
            onFocus={()=> searchIconOnFocus.current.style.display = 'block'} 
            onBlur={()=> searchIconOnFocus.current.style.display = 'none'} 
            placeholder='Search' 
            type="text" 
          />
          
        <Link to={`/search/${props.search}`}>
          <button className='search-icon relative' onMouseOver={()=> hoverTitleSearch.current.style.display = 'block'} onMouseOut={()=> hoverTitleSearch.current.style.display = 'none'}>
            <SearchRoundedIcon fontSize='large' className='p-1' />
            <p className='hover-titles hover-title-search' ref={hoverTitleSearch}>Search</p>
          </button>
          </Link>

          <button className='search-mic-icon ml-4 relative' onMouseOver={()=> hoverTitleMic.current.style.display = 'block'} onMouseOut={()=> hoverTitleMic.current.style.display = 'none'}>
            <MicIcon />
            <p className="hover-titles hover-title-mic" ref={hoverTitleMic}>Search with your voice</p>
          </button>
          
        </div>

        <div className="profile-section w-44 p-2 flex justify-between items-center mr-14">
          <button className='profile-section-icons relative' onMouseOver={()=> hoverTitleCreate.current.style.display = 'block'} onMouseOut={()=> hoverTitleCreate.current.style.display = 'none'}>
            <VideoCallOutlinedIcon fontSize='large' className='p-1'  />
            <p className="hover-titles hover-title-create" ref={hoverTitleCreate}>Create</p>
          </button>

          <button className='profile-section-icons relative' onMouseOver={()=> hoverTitleNotifications.current.style.display = 'block'} onMouseOut={()=> hoverTitleNotifications.current.style.display = 'none'}>
            <NotificationsNoneOutlinedIcon fontSize='large' className='p-1' />
            <p className="hover-titles hover-title-notifications" ref={hoverTitleNotifications}>Notifications</p>
          </button>

          <button className='profile-section-icons'><AccountCircleOutlinedIcon fontSize='large' className='p-1' /></button>
        </div>
    </div>
  )
}

export default Navbar