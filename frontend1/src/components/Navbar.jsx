import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import {NavLink, useNavigate} from "react-router-dom"

const NavList=[
  {label:"HOME",link:"/"},
  {label:"ALL DOCTORS",link:"/doctors"},
  {label:"ABOUT",link:"/abouts"},
  {label:"CONTACT",link:"/contacts"}
]

function Navbar() {
    const [isLoggedIn,setIsLoggedIn]=useState(true);

  const navigate=useNavigate();

  const [isMobileMenuOpened,setIsMobileMenuOpened]=useState(false);

  return (
    <div>
    <div className='flex justify-between px-3 py-4 items-center '>
        {/* left side Logo part */}
        <div>
            <img onClick={()=>navigate("/")}className='w-44'src={assets.logo} alt="Logo" />
        </div>

        {/* Middle part  */}

        <div className='hidden md:flex gap-6 '>
          {
            NavList.map((item,index)=>(
              <NavLink to={item.link} key={index} className=' text-lg'> 
               {item.label}
               <hr className='hidden bg-primary h-0.5'/>
              </NavLink>
            ))
          }

        </div>

        {/* Right Side Part */}

        <div className='flex gap-3'>

           {/* Mobile Menu Button */}

          <button className='md:hidden cursor-pointer' onClick={()=>{setIsMobileMenuOpened(!isMobileMenuOpened)}}>
            {<img src={assets.menu_icon} alt="Menu_icon" />}
          </button>


          {/* CTA size */}

          {isLoggedIn?<div >
          {isLoggedIn?
          <div className='flex gap-2 align-center cursor-pointer relative group'>
               <img className="w-8 rounded-full "src={assets.profile_pic} alt="profile_image" />
               <img className="w-2.5" src={assets.dropdown_icon} alt="drop_down_icon" />
              <div className='absolute top-0 right-0 pt-14 font-medium text-gray-600 z-20 hidden group-hover:block'>
                 <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-4'>
                  <p onClick={()=>navigate("/my-profile")}className='hover:text-black'>My Profile</p>
                  <p onClick={()=>navigate("/my-appointments")} className='hover:text-black'>My Appointments</p>
                  <p onClick={()=>setIsLoggedIn(false)}className='hover:text-black'>Logout</p>
                 </div>
              </div>
            </div>:
            <button onClick={()=>navigate("/login")} className='px-8 py-3 bg-primary text-white rounded-full'>Create Account</button>
            }


        </div>
        :<div className='hidden md:block'>
              <button className='px-3 py-2 rounded-full bg-primary text-white ' onClick={()=>{navigate("/login")}}>Create Account</button>
          </div>
        }
          
          

         
        </div>


    </div>
    
    <hr />
    {isMobileMenuOpened && (
      <div className='md:hidden glass-strong'>
      <div className='flex flex-col gap-8 justify-center'>
          {
            NavList.map((item,index)=>(
              <NavLink to={item.link} key={index} className="text-center text-lg font-semibold"
              onClick={()=>{setIsMobileMenuOpened(!isMobileMenuOpened)}}> 
               {item.label}
              </NavLink>
            ))
          }

        </div>

        <div className=''>
              <button className='px-3 py-2 rounded-full bg-primary text-white w-full mt-5 text-lg  '>Create Account</button>
          </div>

        </div>
    )}

    
    </div>
  )
}

export default Navbar