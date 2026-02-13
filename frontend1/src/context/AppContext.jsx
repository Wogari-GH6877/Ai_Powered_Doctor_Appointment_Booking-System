import React, { Children, createContext, useContext, useState,useEffect, use } from 'react'
import { doctors,specialityData } from '../assets/frontend_assets/assets.js'
import Specaility from '../components/Specaility.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
export const AppContext=createContext()

function AppContextProvider(props) {
     

  const backendUrl=import.meta.env.VITE_BACKEND_URL;
   const currencySymbol='$';
  const [doctors,setDoctors]=useState([])
  const [token,setToken]=useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
  const [userData,setUserData]=useState(false);  

  
  const getDoctorsData= async()=>{
          
  
          try {
              const {data}=await axios.get(backendUrl + "/api/doctor/list");
              if(data.success){
                  setDoctors(data.doctors);
                  // console.log(data)
              }else{
                  toast.error(data.message);
              }
          } catch (error) {
              console.log(error);
              // toast.error(error.message);
          }
      }

  const loadProfileData= async()=>{
    try {
        const {data}=await axios.get(backendUrl + "/api/user/profile",{headers:{token}});
        if(data.success){
          setUserData(data.userData);
          // console.log(data)

        }else{         
          //  toast.error(data.message);
        }
      
      }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
      }
    


      
const value={doctors,specialityData,currencySymbol,
  backendUrl,token,setToken,userData,setUserData,loadProfileData,getDoctorsData}

  useEffect(()=>{
          getDoctorsData();
      },[])

      useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;

          loadProfileData();
          
    }else{
      setUserData(false);

    }
    },[token]);


  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider