import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

function About() {
  return (
    <div className='mt-6'>
      <h1 className='text-center mt-4 mb-8 text-xl '>ABOUT <span className='font-semibold'>US</span></h1>
      
      {/* Top text */}
      <div className='md:flex gap-5 px-8'>

        {/* image part */}
        <div >
          <img className='mt-6 ' src={assets.about_image} alt="" />
        </div>
        {/* text part */}
        <div className='md:flex flex-col gap-8 py-3 text-gray-600'>
          <p className='mb-4'>Welcome to wakcare, your trusted partner in managing your healthcare needs conveniently and efficiently. At wakcare, we understand the challenges 
            individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className='mb-4'>wakcare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or 
            managing ongoing care, wakcare is here to support you every step of the way.</p>

          <p className='underline mt-3 '>Our <span className='font-semibold text-black'>Vision</span></p>

          <p className='mb-4' >Our vision at wakcare is to create a seamless healthcare experience for every user.
             We aim to bridge the gap between patients and healthcare providers, 
            making it easier for you to access the care you need, when you need it.</p>


        </div>



      </div>

      {/* bottom text */}

      <div >
        <h1 className='font-semibold  mb-5'>Why Choose Us</h1>

        <div className='md:flex gap-3 '>
          <div className='border border-gray-500 py-15 px-6 mb-3 '>
            <h1 className='font-semibold mb-3'>Efficiency</h1>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>

          <div className='border border-gray-500 py-15 px-6 mb-3'>
            <h1 className='font-semibold mb-3'>Convenience</h1>
            <p>Access to a network of trusted healthcare professionals in your area.</p>

          </div>

          <div className='border border-gray-500 py-15 px-6 mb-3'>
            <h1 className='font-semibold mb-3'>Personalization</h1>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About