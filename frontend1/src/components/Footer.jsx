import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
function Footer() {
  return (
    <div >


    <div className=' md:flex md:justify-between mt-7'>
        {/* left part */}
        <div>
          <img className='w-44' src={assets.logo} alt="" />
          <p className='mt-4 text-sm'>
            We are a trusted healthcare platform dedicated to connecting patients with 100+ verified <br/> 
            and  experienced doctors. Easily book appointments , access quality medical care , and <br />take control of your health with confidence.
          </p>
        </div>

        {/* middle part */}

        <div>

            <h2 className='font-bold text-gray-500 mt-6'>COMPANY</h2>
            <ul className='mt-4'>
                <li>Home </li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>

        </div>

        {/* right part */}

        <div>
            <h2 className='font-bold text-gray-500 mt-7'>GET IN TOUCH</h2>
            <p className='mt-4'>+251 966554433</p>
            <p>wakTechs@gamil.com</p>


        </div>
    </div>

    <div className='mt-6 mb-5 '>
        <hr />
        <p className='text-center mt-3'>Copyright © 2026 Waktech - All Right Reserved.</p>
    </div>

        
        
 </div>

  )
}

export default Footer