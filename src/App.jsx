import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Feed from './components/Feed/Feed'

const App = () => {

  const [fullSidebar, setFullSidebar] = useState(true);
  
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App