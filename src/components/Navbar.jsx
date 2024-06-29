import React from 'react'
import navlogo from '../assets/SNClogo.png'
import profile from '../assets/profile.jpg'

const Navbar = () => {
  return (
    <div className='navbar flex h-32 items-center justify-between w-full'>
      <img src={navlogo} alt="" className="nav-logo h-28" />
      <img className='h-20 mr-4' src={profile} alt="" />
    </div>
  )
}

export default Navbar
