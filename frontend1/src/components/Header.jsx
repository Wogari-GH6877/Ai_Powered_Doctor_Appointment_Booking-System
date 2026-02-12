import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function Header() {
  return (
    <div className='md:px-10 px-5 py-8'>

        <div className='bg-primary md:flex justify-evenly items-center rounded-2xl px-5' >

       
        {/* Left Part  */}
        <div className='flex flex-col gap-5'>
            <p className='md:text-6xl md:py-0 py-6 text-center font-semibold text-white text-4xl sm:text-3xl'>Book Your Appointment  <br />
             with Top-Rated Doctors</p>

             <div className='mt-5 gap-3  md:flex'>
                <img className='w-25' src={assets.group_profiles} alt="" />
                <p className='text-sm text-white'>Simply browse through our extensive list of trusted doctors,<br />
                   schedule your appointment hassle-free.</p>
             </div>

             <a href="#speciality-section"className='flex gap-2 px-4 py-3   text-black  justify-center items-center bg-white rounded-full md:w-1/3 mb-4'>
              <button className=''>Book Appointment </button>
              <img className='' src={assets.arrow_icon} alt="" />
          </a>
        </div>

        {/* Right Part */}

        <div className=' flex justify-center '>
            <div>
                <img src={assets.header_img} alt="" />
            </div>

        </div>
    </div>
     </div>
  )
}

export default Header