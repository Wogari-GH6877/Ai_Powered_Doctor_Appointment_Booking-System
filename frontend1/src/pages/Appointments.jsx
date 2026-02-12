import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/frontend_assets/assets';

import axios from 'axios';
function Appointments() {


const navigate=useNavigate();


const {doctors,getDoctorsData,token,backendUrl,userData}=useContext(AppContext);
const {doctId}=useParams();

const [doctInfo,setDoctInfo]=useState(null);
const [relatedDoc,setRelatedDoc]=useState([]);

const daysOfWeek=["SUN","MON","TUE","WEN","THU","FRI","SAT"]

const [docSlots,setDocSlots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('')


const fetchDocInfo=()=>{

  const filterDoc=doctors.find(doc=>doc._id===doctId);
  const filterRelatedDoc=doctors.filter(doc=> doc.speciality===filterDoc.speciality && doc._id!==doctId);
  setRelatedDoc(filterRelatedDoc);
  setDoctInfo(filterDoc);

// console.log(filterDoc)}
}

  

const getAvailableSlots = async()=>{
  setDocSlots([]);


  // getting current date
  let today=new Date();

  for(let i=0; i<7;i++){
     
    // getting date with index
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i)

    // setting end time of the date with index

    let endTime=new Date();
    endTime.setDate(today.getDate() +i)

    endTime.setHours(21,0,0,0)

    if(today.getDate()=== currentDate.getDate()){

      currentDate.setHours(currentDate.getHours()>10? currentDate.getHours() +1 :10);
      currentDate.setMinutes(currentDate.getMinutes()>30? 30:0)
    }else{
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    let timeSlots=[]

    while(currentDate < endTime){
      let formattedTime= currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',})

      let day= currentDate.getDate();
      let month= currentDate.getMonth() +1;
      let year= currentDate.getFullYear();

      let slotDate= day + "-" + month + "-" + year;

      const slotTime= formattedTime;

      const isSlotAvailable =
  doctInfo?.slots_booked?.[slotDate]?.includes(slotTime)
    ? false
    : true;

      
      if(isSlotAvailable){
         

        timeSlots.push({
        datetime:new Date(currentDate),
        time:formattedTime
      })
      }
      

      // increament current time by 30 minute

      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }

    setDocSlots(prev=> ([...prev,timeSlots]))

    
  }
}


const bookAppointment=async()=>{

  if(!token){

    toast.warn("Please login to book an appointment");
    return navigate("/login");
}
    try {
       let date=docSlots[slotIndex][0].datetime;
       let day= date.getDate();
       let month=date.getMonth() +1;
       let year=date.getFullYear();

       const slotDate=day + "-" + month + "-" + year;
      //  console.log(slotDate);
        const {data}=await axios.post(backendUrl + "/api/user/book-appointment",{userId:userData._id,docId:doctId,slotDate,slotTime},{headers:{token}});
        console.log(data);
          
        if(data.success){
          toast.success(data.message);
          getDoctorsData();
          navigate("/my-appointments");
        }else{
          // console.log(data);
          toast.error(data.message);
        }
    } catch (error) {
      //  console.log(error);
       toast.error(error.message);
    }
}
 

useEffect(()=>{
  fetchDocInfo();

  
},[doctors,doctId])


useEffect(()=>{
  getAvailableSlots();
},[doctInfo]);

useEffect(()=>{
  


},[docSlots])


  // const {doctors}=useContext(AppContext);
  // const {doctId}=useParams();
  // const [filterDoc,setFilterDoc]=useState([]);
  // const [speDoctor,setSpeDoctor]=useState([]);
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   const filtered = doctors.filter(doc=> doc._id===doctId);
  //   setFilterDoc(filtered);
  //   if (filtered.length > 0) {
  //     setSpeDoctor(doctors.filter(doc=>doc.speciality===filtered[0].speciality && doc._id !== doctId));
  //   } else {
  //     setSpeDoctor([]);
  //   }
  // },[doctId,doctors]);
  
  

  // // useEffect(()=>{
  // //   ApplyFilter();
  // // },[doctId,doctors])

    

  
  return (
    <div className='mt-6'>
      {/* Top part */}

      
      <div className='flex gap-5'>
        {/* images part */}
        <div className='flex'>
          <div className='w-80  border border-black justify-center rounded-2xl bg-primary'>
              {doctInfo && <img src={doctInfo?.image} alt="Doctor" />}
          </div>
          

          

        </div>


        {/* Middle part */}

        <div className='flex flex-col border border-black justify-center rounded-2xl px-8'>

          {/* text part */}

          <div>
            <h1 className='text-2xl mb-3 font-semibold flex items-center gap-2'>{doctInfo?.name} <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" /></h1>
            <p>
              <span className='text-xl '>{doctInfo?.degree} -</span>
              <span className='text-xl '>{doctInfo?.speciality}</span>
              <span className='py-2 px-4 border border-gray-500 ml-2 rounded-full text-black-400'> {doctInfo?.experience} Year</span>

            </p>

          </div>
          <div className='mt-6'>
            <p className='flex gap-3 mb-4 font-semibold'>About <img src={assets.info_icon} alt="Info" className="w-5 h-5" /></p>

            <p>{doctInfo?.about}</p>
          </div>

          <div className='mt-4 '>
            <p className='text-xl font-semibold'>Appointment fee: ${doctInfo?.fees} </p>
          </div>

        </div>
      </div>
  
      
      {/* middle part */}

      <div className='flex flex-col ml-10 gap-4 mt-7'>
        <h1 className='text-xl font-semibold'>Booking slots</h1>

        <div className='flex gap-4'>

          {
            docSlots.length && docSlots.map((items,index)=>(
              <div onClick={()=>{setSlotIndex(index)}}className={`py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer ${slotIndex===index ?'bg-primary text-white ' :'bg-white '}`} key={index}>
                <p>{items[0] && daysOfWeek[items[0].datetime.getDay()]}</p>
                <p>{items[0] && items[0].datetime.getDate()}</p>

              </div>

            ))
          }
          {/* <ul className='flex gap-4'>
            <li className='py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer'>MON <br />11</li>
            <li className='py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer'>TUE <br />12</li>
            <li className='py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer'>WEN <br /> 13</li>
            <li className='py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer'>THU <br /> 14</li>
            <li className='py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer'>FRI <br /> 15</li>
            <li className='py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer'>SAT <br /> 16</li>
            <li className='py-4 px-3 border border-primary rounded-full text-xl text-center hover:bg-primary hover:text-white cursor-pointer'>SUN <br /> 17</li>
          </ul> */}
        </div>

        <div className='flex gap-4 min-w-[80px] overflow-x-scroll whitespace-nowrap no-scrollbar'>

          {
            docSlots.length && docSlots[slotIndex].map((items,index)=>(

              
                <p onClick={()=>{setSlotTime(items.time)}} key={index} className={`w-full flex py-2 px-2 rounded-full border border-primary 
                 text-xs text-center hover:bg-primary hover:text-white cursor-pointer 
                 ${items.time===slotTime ? `bg-primary text-white`:`text-gray-500 `}`}>{items.time.toLowerCase()}</p>
              

            ))
          }
          {/* <ul className='flex gap-3'>
            <li className='py-2 px-3 border border-primary rounded-full text-xs text-center hover:bg-primary hover:text-white cursor-pointer'>8.00 am</li>
            <li className='py-2 px-3 border border-primary rounded-full text-xs text-center hover:bg-primary hover:text-white cursor-pointer'>8.30 am</li>
            <li className='py-2 px-3 border border-primary rounded-full text-xs text-center hover:bg-primary hover:text-white cursor-pointer'>9.00 am</li>
            <li className='py-2 px-3 border border-primary rounded-full text-xs text-center hover:bg-primary hover:text-white cursor-pointer'>9.30 am</li>
            <li className='py-2 px-3 border border-primary rounded-full text-xs text-center hover:bg-primary hover:text-white cursor-pointer'>10.00 am</li>
            <li className='py-2 px-3 border border-primary rounded-full text-xs text-center hover:bg-primary hover:text-white cursor-pointer'>10.30 am</li>
            <li className='py-2 px-3 border border-primary rounded-full text-xs text-center hover:bg-primary hover:text-white cursor-pointer'>11.00 am</li>
          </ul> */}
        </div>
        <div>
        <button onClick={bookAppointment} className='mt-4 px-8 py-3 bg-primary border border-primary rounded-full text-white '>Book an appointment</button>
      </div>

      </div>


      {/* botttom part */}

      <div className='flex flex-col items-center mt-20'>
        <h1 className='text-3xl mb-3'>Related Doctors</h1>
        <p className='text-xs'>Simply browse through our extensive list of trusted doctors.</p>


        <div className=' justify-center ml-150 w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 pt-5 px-3  sm:px-0   '>
        {
          relatedDoc.map((items,index)=>(
            <div onClick={()=> {navigate(`/appointments/${items._id}`),scrollTo(0,0)}} key={items._id} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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

export default Appointments