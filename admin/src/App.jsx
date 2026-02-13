import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import {Route,Routes} from "react-router-dom"
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';

function App() {


  const {aToken}=useContext(AdminContext);

  return aToken?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />

      <div className='md:flex items-start px-3'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/add-doctor" element={<AddDoctor />}/>
          <Route path="/doctor-list" element={<DoctorList/>}/>


        </Routes>
      </div>
    </div>
  ):(
    <>
       <Login />
      <ToastContainer />
    </>
  )
}

export default App