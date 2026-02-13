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
    <form
  onSubmit={onSubmitHandler}
  className='min-h-screen flex justify-center items-center px-4'
>
  <div className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-300 shadow-lg px-6 py-8 rounded-xl bg-white'>
    
    <h2 className='text-xl mb-3 font-semibold text-gray-600'>
      {state === "SignUp" ? "Create Account" : "Login"}
    </h2>

    <p className='text-sm mb-4'>
      {state === "SignUp"
        ? "Please sign up to book appointment"
        : "Please Login to book appointment"}
    </p>

    {state === "SignUp" && (
      <div className='flex flex-col gap-2 mb-4'>
        <span className='text-sm text-gray-600'>Full Name</span>
        <input
          className='bg-white py-2 px-3 outline-none border border-gray-300 rounded-md focus:border-primary'
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
          value={name}
        />
      </div>
    )}

    <div className='flex flex-col gap-2 mb-4'>
      <span className='text-sm text-gray-600'>Email</span>
      <input
        className='bg-white py-2 px-3 outline-none border border-gray-300 rounded-md focus:border-primary'
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        value={email}
      />
    </div>

    <div className='flex flex-col gap-2 mb-4'>
      <span className='text-sm text-gray-600'>Password</span>
      <input
        className='bg-white py-2 px-3 outline-none border border-gray-300 rounded-md focus:border-primary'
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        value={password}
      />
    </div>

    <button
      type="submit"
      className='py-2 w-full bg-primary rounded-lg text-white mt-2 hover:opacity-90 transition'
    >
      {state === "SignUp" ? "Create Account" : "Login"}
    </button>

    <p className='text-sm mt-4 text-center'>
      Already have an account?{" "}
      {state === "SignUp" ? (
        <span
          className='underline text-blue-700 cursor-pointer'
          onClick={() => setState("Login")}
        >
          Login here
        </span>
      ) : (
        <span
          className='underline text-blue-700 cursor-pointer'
          onClick={() => setState("SignUp")}
        >
          Sign Up
        </span>
      )}
    </p>
  </div>
</form>

  )
}

export default Login