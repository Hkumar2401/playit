import React from 'react'
import { useState, createContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Feed from './components/Feed/Feed'

const HideSidebarContext = createContext();

const App = () => {

  const [fullSidebar, setFullSidebar] = useState(true);

  const [hideSidebar, setHideSidebar] = useState(false);
  
  return (
    <div className='App relative'>
    <HideSidebarContext.Provider value={{hideSidebar, setHideSidebar}}>
      <Navbar 
        fullSidebar={fullSidebar}
        setFullSidebar={setFullSidebar}
      />
      
      <Feed 
        fullSidebar={fullSidebar}
        setFullSidebar={setFullSidebar}
      />
    </HideSidebarContext.Provider>
    </div>
  )
}

export default App
export {HideSidebarContext}