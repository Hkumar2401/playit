import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <div className='App relative'>
      <Navbar />
    </div>
    </BrowserRouter>
  )
}

export default App