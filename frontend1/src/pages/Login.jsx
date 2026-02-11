import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
 function Login() {

  const navigate=useNavigate()

  const {backendUrl,token,setToken}=useContext(AppContext)
  const [state,setState]=useState("SignUp");
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const onSubmitHandler= async(event)=>{
    event.preventDefault();
  

    try {
       if(state==="SignUp"){
        const {data}=await axios.post(backendUrl + "/api/user/sign-up",{name,email,password});
        // console.log(data);
        if(data.success){
          localStorage.setItem("token",data.token);
          setToken(data.token);
          navigate("/");
          setName("");
          setEmail("");
          setPassword("");  
        }else{
          toast.error(data.message);
        }
       }else{
        const {data}=await axios.post(backendUrl + "/api/user/login",{email,password});
        // console.log(data)
        if(data.success){
          localStorage.setItem("token",data.token);
          setToken(data.token);
          navigate("/");
          setEmail("");
          setPassword("");  
        }else{
          toast.error(data.message);
        }
    } }catch (error) {
      toast.error(error.message);
    }
  }
useEffect(()=>{
  if(token){
    navigate("/");
  }},[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-100 md:w-full flex justify-center items-center '>
      <div className='w-1/4 border border-gray-300 drop-shadow-lg px-6 py-13 mt-30 mb-30 ' >
       {state==="SignUp"?<h2 className='text-xl mb-3 font-semibold text-gray-600 '>Create Account</h2>:
       <h2 className='text-xl mb-3 font-semibold text-gray-600 '>Login</h2>
       }
       {state==="SignUp"? <p className='text-sm mb-2 mt-4'>Please sign up to book appointment</p>:
       <p className='text-sm mb-2 mt-4'>Please Login to book appointment</p>}
       

      {state==="SignUp"?<div className='flex flex-col gap-2 '>
        <span className='text-sm text-gray-600'>Full Name</span>
        <input className='bg-white py-1 outline-none border border-gray-300'type="text" onChange={(e)=>setName(e.target.value)} required value={name}/>
       </div>:""}

       <div className='flex flex-col gap-2'>
        <span className='text-sm text-gray-600'>Email</span>
        <input className='bg-white py-1 outline-none border border-gray-300'type="email" onChange={(e)=>setEmail(e.target.value)}required value={email} />
       </div>

       <div className='flex flex-col gap-2'>
        <span className='text-sm text-gray-600'>Password</span>
        <input className='bg-white py-1 outline-none border border-gray-300' type="password" onChange={(e)=>setPassword(e.target.value)}required value={password}/>
       </div>

       <div>
        <button type="submit" className='py-2 w-full bg-primary mt-5 rounded-xl mb-2 text-white'>{state==="SignUp"?"Create Account":"Login"}</button>
       </div>

       <p className='text-sm'>Already have an account? {state==="SignUp"?<span className='underline text-blue-700 cursor-pointer' onClick={()=> setState("Login")}>Login here</span>:
       <span className='underline text-blue-700 cursor-pointer' onClick={()=>{setState("SignUp")}}>SignUp</span>}</p>

       </div>
    </form>
  )
}

export default Login