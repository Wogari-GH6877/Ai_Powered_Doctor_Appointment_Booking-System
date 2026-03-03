import React from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useEffect,useContext } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

function DoctorAppointments() {

  const {dToken ,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(DoctorContext);
  const {ageCalculate,slotDateFormat,currencySymbol}=useContext(AppContext);

  useEffect(()=>{
    if(dToken){
      getAppointments();
    }
  },[dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded py-2 text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='max-sm:hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date&Time</p>
        <p>Fees</p>
        <p>Action</p>

        </div>

        {
                     appointments && appointments.reverse().map((items,index)=>(
                        <div key={index} className=' flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b
                        hover:bg-gray-50'>
                           <p className='max-sm:hidden'>{index +1 }</p>
        
                            <div className='flex gap-3'>
                              <img className="w-8 h-8 rounded-full"src={items.userData.image} alt="" />
                              <span>{items.userData.name}</span>
                            </div>
        
        
                            <div >
                               <p className='text-xs inline border border-primary px-2 rounded-full '>{items.payment ? "Online" : "CASH" }</p>
                            </div>
                            <p className='max-sm:hidden'>{ageCalculate(items.userData.dob)}</p>

                            <p>{slotDateFormat(items.slotDate)},{items.slotTime}</p>

        
                            
                           <p>{currencySymbol}{items.amount}</p>

                           {items.cancelled ?<p className='text-red-400 text-xs font-medium'>Cancelled</p>
                           :items.isCompleted?<p className='text-green-500 text-xs font-medium'>Completed</p>:
                           <div className='flex'>
                            <img  onClick={()=>cancelAppointment(items._id)}className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                            <img onClick={()=>completeAppointment(items._id)}className="w-10 cursor-pointer" src={assets.tick_icon} alt="" />
                           </div>
                           }

                           
        
                            
        
                            
                        </div>
                      ))
                    }
      </div>
    </div>
  )
}

export default DoctorAppointments