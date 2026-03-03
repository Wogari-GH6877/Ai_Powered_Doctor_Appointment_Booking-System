import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../Context/AdminContext'
import { DoctorContext } from '../Context/DoctorContext';

function Sidebar() {

    const {aToken}=useContext(AdminContext);
    const {dToken}=useContext(DoctorContext)
  return (
    <div className='bg-white border-r min-h-screen pt-5'>
       { aToken && 
        <ul className='text-[#515151]'>
            <NavLink to={"/admin-dashboard"} className={({isActive})=>`flex gap-2 items-center py-3.5 px-4 md:px-9 md:min-w-72  cursor-pointer ${isActive?"bg-[#F2F3FF] border-r-4 border-primary ":""}`}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink>

        <NavLink to={"/all-appointments"} className={({isActive})=>`flex gap-2 items-center py-3.5 px-4 md:px-9 md:min-w-72  cursor-pointer ${isActive? "bg-[#F2F3FF] border-r-4 border-primary ":""}`}>
            <img src={assets.appointment_icon} alt="" />
            <p >Appointmants</p>
        </NavLink>

        <NavLink to={"/add-doctors"} className={({isActive})=>`flex gap-2 items-center py-3.5 px-4 md:px-9 md:min-w-72  cursor-pointer ${isActive? "bg-[#F2F3FF] border-r-4 border-primary ":""}`}>
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
        </NavLink>

        <NavLink to={"/doctors-list"} className={({isActive})=>`flex gap-2 items-center py-3.5 px-4 md:px-9 md:min-w-72cursor-pointer ${isActive? "bg-[#F2F3FF] border-r-4 border-primary ":""}`}>
            <img src={assets.people_icon} alt="" />
            <p>Doctor List</p>
        </NavLink>
        </ul>}

         { dToken && 
        <ul className='text-[#515151]'>
            <NavLink to={"/doctors-dashboard"} className={({isActive})=>`flex gap-2 items-center py-3.5 px-4 md:px-9 md:min-w-72  cursor-pointer ${isActive?"bg-[#F2F3FF] border-r-4 border-primary ":""}`}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
        </NavLink>

        <NavLink to={"/doctors-appointments"} className={({isActive})=>`flex gap-2 items-center py-3.5 px-4 md:px-9 md:min-w-72  cursor-pointer ${isActive? "bg-[#F2F3FF] border-r-4 border-primary ":""}`}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointmants</p>
        </NavLink>

       

        <NavLink to={"/doctors-profile"} className={({isActive})=>`flex gap-2 items-center py-3.5 px-4 md:px-9 md:min-w-72  cursor-pointer ${isActive? "bg-[#F2F3FF] border-r-4 border-primary ":""}`}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Profile</p>
        </NavLink>
        </ul>}
    </div>
  )
}

export default Sidebar