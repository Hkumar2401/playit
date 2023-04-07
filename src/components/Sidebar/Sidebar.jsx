import './sidebar.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import { MusicNoteOutlined } from '@mui/icons-material';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { Link } from 'react-router-dom';


const Sidebar = ({fullSidebar}) => {

  return (
    <div>

    {fullSidebar ?
      <div className='sidebar pl-2'>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Home'>
        <button><HomeOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Ohara</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Subscriptions'>
        <button><SubscriptionsOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Clever Programmer</p>
      </div>

      <hr className='h-0.5 mt-2 mb-2 border-0 bg-zinc-200' />

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Library'>
        <button><VideoLibraryOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Library</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='History'>
        <button><RestoreOutlinedIcon /></button>
        <p className='pl-6 pt-1'>History</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Your videos'>
        <button><OndemandVideoOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Your videos</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Watch later'>
        <button><WatchLaterOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Watch later</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Liked videos'>
        <button><ThumbUpOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Liked videos</p>
      </div>

      <hr className='h-0.5 mt-2 mb-2 border-0 bg-zinc-200' />

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Trending'>
        <button><WhatshotOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Trending</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Music'>
        <button><MusicNoteOutlined /></button>
        <p className='pl-6 pt-1'>Music</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Movies'>
        <button><MovieOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Movies</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Gaming'>
        <button><SportsEsportsOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Gaming</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='News'>
        <button><NewspaperOutlinedIcon /></button>
        <p className='pl-6 pt-1'>News</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Sports'>
        <button><EmojiEventsOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Sports</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Learning'>
        <button><LightbulbOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Learning</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Fashion & Beauty'>
        <button><DiamondOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Fashion & Beauty</p>
      </div>

      <hr className='h-0.5 mt-2 mb-2 border-0 bg-zinc-200' />

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Settings'>
        <button><SettingsOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Settings</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Report History'>
        <button><FlagOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Report History</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Help'>
        <button><HelpOutlineOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Help</p>
      </div>

      <div className='flex items-center p-2 pl-4 pr-12 sidebar-buttons' title='Send feedback'>
        <button><FeedbackOutlinedIcon /></button>
        <p className='pl-6 pt-1'>Send feedback</p>
      </div>


    </div>
    :
    <div className='sidebar-not-full'>

      <div className='flex items-center flex-col p-0 pt-6 pb-6 sidebar-not-full-buttons' title='Home'>
          <button><HomeOutlinedIcon /></button>
          <p className='pt-1 small-text'>Home</p>
      </div>

      <div className='flex items-center flex-col p-1 pt-6 pb-6 sidebar-not-full-buttons' title='Subscriptions'>
          <button><SubscriptionsOutlinedIcon /></button>
          <p className='pt-1 small-text'>Subscriptions</p>
      </div>

      <div className='flex items-center flex-col p-0 pt-6 pb-6 sidebar-not-full-buttons' title='Library'>
          <button><VideoLibraryOutlinedIcon /></button>
          <p className='pt-1 small-text'>Library</p>
      </div>

    </div>
    }

    </div>
  )
}

export default Sidebar