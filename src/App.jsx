import React from 'react'
import Navbar from './components/Navbar'
import Admin from './pages/Admin/Admin'

const App = () => {
  return (
    <div className='h-screen w-full'>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App
