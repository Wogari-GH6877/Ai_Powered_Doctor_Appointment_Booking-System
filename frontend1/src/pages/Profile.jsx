import React, { useState,useContext} from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'  

function Profile() {

  const {userData,setUserData,backendUrl,token}=useContext(AppContext);

  const [isEdit,setIsEdit]=useState(false);
  const [image,setImage]=useState(false);

  const updateProfile=async()=>{
  
  
    try {
      const formData=new FormData();
      image &&formData.append("image",image);
      formData.append("name",userData.name);
      formData.append("gender",userData.gender);
      formData.append("dob",userData.dob);
      formData.append("phone",userData.phone);
      formData.append("address",JSON.stringify({ line1: userData.address?.line1, line2: userData.address?.line2 }));
  
      const {data}=await axios.post(backendUrl + "/api/user/update-profile",formData,{headers:{token}});
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    }
      catch(error){
        toast.error(error.message);
      }
    }

    
  return (userData) && (
    <div className='mt-6'>
     { isEdit ?<><label htmlFor="image">
              <img className="w-16 bg-gray-100 rounded-full cursor:pointer" src={image? URL.createObjectURL(image) : userData?.image } alt="" />
        </label>

        <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden/></>:<img className="w-16 bg-gray-100 rounded-full cursor:pointer" src={image? URL.createObjectURL(image) : userData?.image } alt="" />}
      {/* <img className='w-37'src={userData?.image} alt="" /> */}
      {isEdit?<input className="bg-gray-200 mt-4 text-3xl font-medium"type="text" value={userData?.name}onChange={e=>setUserData(prev => ({...prev,name:e.target.value}))}/>:<h1 className='mt-8 text-semibold text-2xl'>{userData?.name} </h1>}
      <hr className='w-1/2'/>

      <div className='flex flex-col gap-5'>
          <h2 className='mt-5 mb-5 text-gray-600 underline py-1'>CONTACT INFORMATION</h2>
            
            {/* email part */}
          <div className='flex gap-10 '><span>Email Id:</span> 
          <p className='text-blue-400'>{userData?.email}</p>
         </div>
           
           {/* phone part */}
           <div className='flex gap-10 '><span>Phone:</span> 
          {isEdit?<input className="bg-gray-200"type="text" value={userData?.phone}onChange={e=>setUserData(prev => 
            ({...prev,phone:e.target.value}))}/>:<p className=''>{userData?.phone}</p>}
         </div>

          {/* <div className='flex gap-10'><span>Phone:</span> <p className='text-blue-400'>+251 9778855</p></div> */}

          {/* Address */}
          
          <div className='flex gap-10 '><span>Address:</span> 
          {isEdit?<><input className="bg-gray-200" type="text" value={userData?.address?.line1}onChange={e=>setUserData(prev => 
            ({...prev,address:{...prev.address,line1:e.target.value}}))}/> <br />

            <input className="bg-gray-200" type="text" value={userData?.address?.line2}onChange={e=>setUserData(prev => 
            ({...prev,address:{...prev.address,line2:e.target.value}}))}/>
            </>:<><p className=''>{userData?.address?.line1}</p> <br />
            <p className=''>{userData?.address?.line2}</p></>}
         </div>


          {/* <div className='flex gap-10'><span>Address:</span> <p>57th Cross, Richmond <br />
             Circle, Church Road, London</p></div>
      </div> */}

      <div>
          <h2 className='mt-5 mb-5 text-gray-600 underline py-1'>BASIC INFORMATION</h2>

          <div className='flex gap-10'><span>Gender:</span> {isEdit ? 
          <select onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData?.gender}>
            <option value="Male">Male</option>
            <option value="Female">FeMale</option>
          </select>:<p>{userData?.gender}</p>}</div>


          <div className='flex gap-10 '><span>BirthDay:</span> 
          {isEdit?<input type="date" value={userData?.dob}onChange={e=>setUserData(prev => 
            ({...prev,dob:e.target.value}))}/>:<p className=''>{userData?.dob}</p>}
         </div>


          {/* <div className='flex gap-10'><span>BirthDay:</span> <p>20 July, 2024</p></div> */}
          
      </div>

      <div className='flex gap-10'>
        <button className='mt-5 border border-primary py-2 px-6 rounded-full' onClick={()=>{setIsEdit(true)}}>Edit</button>
        <button className='mt-5 border border-primary py-2 px-6 rounded-full' onClick={()=>{setIsEdit(false),updateProfile(),setImage(image)}}>Save information</button>
      </div>
    </div>
    </div>
  )
}

export default Profile;