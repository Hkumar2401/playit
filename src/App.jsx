import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Feed from './components/Feed/Feed'

const App = () => {
  return (
    <BrowserRouter>
    <div className='App relative'>
      <Navbar />
      <Feed />
    </div>
    </BrowserRouter>
  )
}

export default App