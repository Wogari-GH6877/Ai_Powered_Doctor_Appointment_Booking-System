import React, { useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from "axios"
import {toast} from "react-toastify"

function TopDoctors() {
  const {backendUrl,doctors}=useContext(AppContext);
    const navigate=useNavigate();


    

    
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-600 md:mx-10'>
        <h1 className='text-3xl font-medium '>Top Doctors To Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {
               doctors?.slice(0,10).map((item,index)=>(
                
                    <div onClick={()=> navigate(`/appointments/${item._id}`)}key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img className="bg-blue-50"src={item.image} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center'>
                                    <p
                                        className={`w-2 h-2 rounded-full ${
                                        item.available
                                            ? "bg-green-500"
                                            : "bg-red-500 animate-pulse"
                                        }`}
                                    ></p>

                                    <p className={item.available ? "text-green-500" : "text-red-500"}>
                                        {item.available ? "Available" : "Not Available"}
                                    </p>
                                    </div>


                            <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                            <p className='text-gray-500 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                
               )) 
            }

            
        </div>
        <button onClick={()=>{navigate("/doctors");scrollTo(0,0)}} className=' rounded-full px-10 py-2 bg-blue-100 text-gray-600 mt-10'>More</button>
    </div>
  )}

export default TopDoctors