import React from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingCartFill } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";

const SideBar = () => {
  return (
    <div className='sidebar h-[82.5vh] w-60 p-5 flex flex-col gap-10 '>
      <Link to={'/addproduct'} style={{textDecoration:"none"}} >
      <div className="sidebar-item bg-zinc-100 p-2 rounded-md flex items-center gap-5">
      <RiShoppingCartFill size={25}/>
      <p className='font-semibold text-yellow-800'>Add Product</p>
      </div>
      </Link>

      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item bg-zinc-100 rounded-md p-2 flex items-center gap-5">
      <FaListCheck size={20} />
      <p className='font-semibold text-yellow-800'>List Product</p>
      </div>
      </Link>
    </div>
  )
}

export default SideBar
