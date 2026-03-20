import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'

const App = () => {
  return (
    <>
    <Toaster />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  )
}

export default App