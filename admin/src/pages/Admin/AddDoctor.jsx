import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from "axios"

function AddDoctor() {

    const [docImg,setDocImg]=useState(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [experince,setExperince]=useState("1 Year");
    const [fee,setFee]=useState("");
    const [about,setAbout]=useState("");
    const [speciality,setSpeciality]=useState("General physician");
    const [education,setEducation]=useState("");
    const [degree,setDegree]=useState('');
    const [address1,setAddress1]=useState("");
    const [address2,setAddress2]=useState("");

    const {backendUrl,aToken}=useContext(AdminContext);

  const onSubmitHandler= async(event)=>{
    event.preventDefault();

    try {
        if(!docImg){
            return toast.error("Image not selected")
        }
     const formData = new FormData();
     formData.append("image", docImg);
     formData.append("name", name);
     formData.append("email", email);
     formData.append("password", password);

     formData.append("experience", experince);
     formData.append("fees", Number(fee));
     formData.append("about", about);
     formData.append("speciality", speciality);
     formData.append("degree", degree);
     formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

     // console log formdata

     formData.forEach((value, key) => {
     })

     const {data}=await axios.post(backendUrl + "/api/admin/add-doctor",formData,{headers:{aToken}});
     
     
     if(data.success){
         toast.success(data.message);
         setDocImg(false);
         setName("");
         setEmail("");
         setPassword("");
         setAddress1("");
         setAddress2("");
         setDegree("");
         setAbout("");
         setFee("");
     }else{
        toast.error(data.message || "Failed to add doctor");
     }
     

    } catch (error) {
        toast.error(error.message);
        console.log(error);
    }
  }


  return (
    
    <form onSubmit={onSubmitHandler} className='md:m-5 w-full bg-white p-5  border-1 border-primary rounded-lg'>
        <p className='font-medium text-lg mb-3 text-gray-700'>Add Doctor</p>

        <div className='bg-white px-8 py-9  rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll no-scrollbar'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img className="w-16 bg-gray-100 rounded-full cursor:pointer" src={docImg? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                </label>
                <input className="border border-dashed border-primary-300 rounded-lg p-2"onChange={(e)=>setDocImg(e.target.files[0])} type="file"  id="doc-img" hidden/>
                <p className='text-primary font-semibold'>Upload doctor <br />picture</p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Name</p>
                        <input onChange={(e)=>{setName(e.target.value)}} value={name} className="border rounded px-3 py-2 "type="text" placeholder='Name' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input onChange={(e)=>{setEmail(e.target.value)}} value={email}className="border rounded px-3 py-2" type="email" placeholder='email' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Password</p>
                        <input onChange={(e)=>{setPassword(e.target.value)}} value={password}className="border rounded px-3 py-2" type="password" placeholder='password' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Experince</p>
                        <select onChange={(e)=>{setExperince(e.target.value)}} value={experince}className="border rounded px-3 py-2"name="" id="">
                            <option value="1">1 Year</option>
                            <option value="2">2 Year</option>
                            <option value="3">3 Year</option>
                            <option value="4">4 Year</option>
                            <option value="5">5 Year</option>
                            <option value="6">6 Year</option>
                            <option value="7">7 Year</option>
                            <option value="8">8 Year</option>
                            <option value="9">9 Year</option>
                            <option value="10">10 Year</option>
                        </select>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Fees</p>
                        <input onChange={(e)=>{setFee(e.target.value)}} value={fee} className="border rounded px-3 py-2"  placeholder='Your fees' required/>
                    </div>

                    <div>
                        <p className='mt-4 mb-2'>About Doctor</p>
                        <textarea onChange={(e)=>{setAbout(e.target.value)}} value={about}className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor' row={5}/>
                </div>

                  

                </div>

                    
                
                {/* Right Div */}
                
             <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Speciality</p>
                        <select onChange={(e)=>{setSpeciality(e.target.value)}} value={speciality}className="border rounded px-3 py-2"name="" id="">
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                        <div className='flex-1 flex flex-col gap-1'>
                         <p>Education</p>
                         <input onChange={(e)=>{setDegree(e.target.value)}} value={degree} className="border rounded px-3 py-2" type="text" placeholder='education' required/>
                        </div>

                        <div className='flex-1 flex flex-col gap-3'>
                        <p>Address</p>
                        <input onChange={(e)=>{setAddress1(e.target.value)}} value={address1}className="border rounded px-3 py-2" type="text" placeholder='address1' required/>
                        <input onChange={(e)=>{setAddress2(e.target.value)}} value={address2}className="border rounded px-3 py-2" type="text" placeholder='address1' required/>
                    </div>
                    </div>
                </div>
                
            </div>
                <button type="submit" className='bg-primary px-10 py-3 text-white rounded-full mt-5 w-full'>Add Doctor</button>

        </div>
    </form>
  )
}

export default AddDoctor