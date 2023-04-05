import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Feed from './components/Feed/Feed'

const App = () => {

  const [fullSidebar, setFullSidebar] = useState(true);
  
  return (
    <div className='App relative'>
      <Navbar 
        fullSidebar={fullSidebar}
        setFullSidebar={setFullSidebar}
      />
      
      <Feed 
        fullSidebar={fullSidebar}
        setFullSidebar={setFullSidebar}
      />
    </div>
  )
}

export default App