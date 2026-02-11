import React, { useContext } from 'react'
import { AppContext} from '../context/AppContext'
import { Link } from 'react-router-dom'
function Specaility() {
    const {specialityData}=useContext(AppContext)
  return (
    <div>
        <div className='flex flex-col justify-center items-center gap-9'>

            <div className='flex flex-col justify-center items-center '>
                <h1 className='mb-8 md:text-4xl text-3xl'>Find by Speciality </h1>

                <p className='md:text-sm text-xs'>Simply browse through our extensive list of trusted doctors,</p>
                            <p className='md:text-sm text-xs'>schedule your appointment hassle-free.</p>
            </div>

            <div className='flex gap-4 overflow-x-auto flex-nowrap w-full px-4 md:justify-center md:overflow-x-hidden py-4'>
                {specialityData.map((items,index)=>(
                <Link onClick={()=>{scrollTo(0,0)}}to={`/doctors/${items.speciality}`} key={index} className='flex  flex-col items-center gap-4 flex-shrink-0 hover:translate-y-[-10px]'>
                    <img className='w-28  md:w-25' src={items.image} alt="" />
                    <p>{items.speciality}</p>
                </Link>
            ))}
            </div>
            
        </div>
    </div>
  )
}

export default Specaility