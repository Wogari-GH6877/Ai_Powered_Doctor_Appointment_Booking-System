import  { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

function Doctors() {

  const navigate=useNavigate();
  const {doctors}=useContext(AppContext);
  const [filter,setFilter]=useState(false);
  const [speDoctor,setSpeDoctor]=useState([]);
  const [selected,setSelected]=useState(false);


  const {speciality}=useParams();

  const ApplyFilter=()=>{
    if(speciality){
      setSpeDoctor(doctors.filter(doc=> doc.speciality===speciality));
    }else{
      setSpeDoctor(doctors);
    }
  }
useEffect(()=>{
  ApplyFilter();
},[doctors,speciality,selected])
  
  return (
    <div >
      <p>Browse through the doctors specialist.</p>
    <div className='md:flex '>

      <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${filter?'bg-primary text-white':""}`}onClick={()=>setFilter(prev => !prev)}>Filter</button>
              
                {/* left part */}

      <div className={`mr-20  flex-col gap-3 pl-10 md:p-0 ${filter?'flex':"hidden sm:flex"}`}>
        
        <div onClick={()=>{setSpeDoctor(doctors.filter(doc=> doc.speciality==="General_physician"))}}
        className={`py-2 md:px-5  hover:bg-blue-50 border border-blue-200 rounded-xl  text-center cursor-pointer `}>General physician</div>

        <div onClick={()=>{setSpeDoctor(doctors.filter(doc=> doc.speciality==="Gynecologist"))}}
        className='py-2 px-5 hover:bg-blue-50 border border-blue-200 rounded-xl text-center cursor-pointer'>Gynecologist</div>

        <div onClick={()=>{setSpeDoctor(doctors.filter(doc=> doc.speciality==="Dermatologist"))}}
        className='py-2 px-5 hover:bg-blue-50 border border-blue-200 rounded-xl text-center cursor-pointer'>Dermatologist</div>

        <div onClick={()=>{setSpeDoctor(doctors.filter(doc=> doc.speciality==="Pediatricians"))}}
        className='py-2 px-5 hover:bg-blue-50 border border-blue-200 rounded-xl text-center cursor-pointer'>Pediatricians</div>

        <div onClick={()=>{setSpeDoctor(doctors.filter(doc=> doc.speciality==="Neurologist"))}}
        className='py-2 px-5 hover:bg-blue-50 border border-blue-200 rounded-xl text-center cursor-pointer'>Neurologist</div>

        <div onClick={()=>{setSpeDoctor(doctors.filter(doc=> doc.speciality===" Gastroenterologist"))}}
        className='py-2 px-5 hover:bg-blue-50 border border-blue-200 rounded-xl text-center cursor-pointer'>Gastroenterologist</div>

      </div>
              

      

      {/* Right Part */}
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 pt-5 px-3  sm:px-0   '>
        {
          speDoctor.map((items,index)=>(
            <div onClick={()=> navigate(`/appointments/${items._id}`)}key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className="" src={items.image} alt="" />
              <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                       <p className='w-2 h-2 bg-green-500 rounded-full '></p><p>Avaiable</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium '>{items.name}</p>
                      <p className='text-gray-500 text-sm'>{items.speciality}</p>
              </div>
          
            </div>))
            
        }
      </div>
    </div>
    </div>
  )
}

export default Doctors