import React from 'react'
import SideBar from '../../components/SideBar'
import { Routes , Route } from 'react-router-dom'
import AddProduct from '../../components/AddProduct'
import ListProducts from '../../components/ListProducts'

const Admin = () => {
  return (
    <div className='admin flex'>
      <SideBar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProducts/>}/>
      </Routes>

    </div>
  )
}

export default Admin
