import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

function AllAppointment() {

  const {aToken,backendUrl,getAllAppointments,appointments,setAppointments,cancelAppointment}=useContext(AdminContext);
  const {ageCalculate,slotDateFormat,currencySymbol}=useContext(AppContext);

  

  useEffect(()=>{
    // console.log(aToken)
    if(aToken){
    getAllAppointments();
  }
  },[aToken])

  // console.log(appointments)
  

  
  return (
      <div className='w-full m-5 max-w-6xl'>
         <h1 className='mb-5 text-lg font-medium'>All Appointments</h1>

         {/* titles  */}
         <div className='bg-white border rounded py-2 text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
           <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
           </div>

           {/* Appointment lists */}
  
          

            {
             appointments && appointments.map((items,index)=>(
                <div key={index} className=' flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b
                hover:bg-gray-50'>
                   <p className='max-sm:hidden'>{index +1 }</p>

                    <div className='flex gap-3'>
                      <img className="w-8 h-8 rounded-full"src={items.userData.image} alt="" />
                      <span>{items.userData.name}</span>
                    </div>

                    <p>{ageCalculate(items.userData.dob)}</p>

                    <div>
                       <p>{slotDateFormat(items.slotDate)},{items.slotTime}</p>
                    </div>

                    


                    <div className='flex gap-3'>
                      <img className="w-8 h-8 rounded-full bg-gray-200" src={items.docData.image} alt="" />
                      <span>{items.docData.name}</span>
                    </div>

                    <p>{currencySymbol}{items.amount}</p>

                    {items.cancelled? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                    :items.isCompleted?
                    <p className='text-green-500 text-xs font-medium'>Completed</p>:
                    <img onClick={()=>cancelAppointment(items._id)}src={assets.cancel_icon} className='cursor-pointer' alt="" />
                    }

                    

                    
                </div>
              ))
            }

            
              
              
            

           
         </div>
      </div>

    

    
  )
}

export default AllAppointment