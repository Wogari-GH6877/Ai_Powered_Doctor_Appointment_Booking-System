import React from 'react'
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';

function Banner() {

    const navigate=useNavigate();
  return (
    <div className=' w-full bg-primary flex  items-center justify-evenly rounded-2xl px-6 m sm:px-10 lg:px-12 my-20 md:mx-10'>
        {/* left part Text-part */}
        <div className='flex flex-col md:gap-4 items-center'>
            <p className='md:text-4xl text-white font-bold sm:px-10  my-3 text-3xl '>
                Trusted Care Starts Here  </p>
                <p className='md:text-4xl text-white font-bold sm:px-10 text-3xl '>100+ Doctors at Your Service
            </p>
            <div className='mb-3'>
                <button onClick={()=>{navigate("/login");scrollTo(0,0)}}className='w-full mt-4 md:px-10 px-8 py-3 bg-white rounded-full text-center text-sm sm:text-base hover:scale-105 transition-all'>Create Account</button>
            </div>
            
        </div>
        <div className='  hidden md:block md:w-1/2 lg:w-[370px] '>
          {/*Right img part */}

           <img className=""src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner