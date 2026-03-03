import React, { createContext, useContext, useState } from 'react'


export const AppContext=createContext();
const  AppContextProvider = (props) => {

     const currencySymbol='$';


   const ageCalculate=(dob)=>{

    // console.log(dob)

        const today=new Date();
        const birthDate=new Date(dob);

        let age=today.getFullYear() - birthDate.getFullYear();

        return age;
    }

    const monthNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split("-");
    return dateArray[0] + " " + monthNames[parseInt(dateArray[1]) - 1] + " " + dateArray[2];

  }
    
    const value={
        ageCalculate,slotDateFormat,currencySymbol

    }
    

    

  return (
    <AppContext.Provider value={value}>

        {props.children}

    </AppContext.Provider>
  )
}

export default AppContextProvider