import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import { Route,Routes } from 'react-router-dom';
import AddDoctor from '../src/Pages/Admin/AddDoctors';
import DoctorList from './Pages/Admin/DoctorList';
import AllAppointment from './Pages/Admin/AllAppointment';
import DashBoard from './Pages/Admin/DashBoard';
import { DoctorContext } from './Context/DoctorContext';
import DoctorDashboard from './Pages/Doctors/DoctorDashboard';
import DoctorAppointments from './Pages/Doctors/DoctorAppointments';
import DoctorProfile from './Pages/Doctors/DoctorProfile';
function App() {

  const {aToken,setAToken}=useContext(AdminContext);
   const {dToken}=useContext(DoctorContext);
  

  return (
    aToken || dToken?<>
    <ToastContainer/>
    <Navbar/>
    <div className='flex pl-2 '>
      <Sidebar/>

      <Routes>
        {/* Admin routes */}
        <Route  path="/" element={<></>} />
        <Route  path="/add-doctors" element={<AddDoctor/>} />
        <Route  path="/doctors-list" element={<DoctorList />} />
        <Route  path="/all-appointments" element={<AllAppointment/>} />
        <Route  path="/admin-dashboard" element={<DashBoard />} />

        {/* Doctor Route */}
        <Route  path="/doctors-dashboard" element={<DoctorDashboard/>} />
        <Route  path="/doctors-appointments" element={<DoctorAppointments/>} />
        <Route  path="/doctors-profile" element={<DoctorProfile/>} />

      </Routes>
    </div>
    </>
    :
    <div >
      
      <Login />
       <ToastContainer />

    </div>
  )
}

export default App