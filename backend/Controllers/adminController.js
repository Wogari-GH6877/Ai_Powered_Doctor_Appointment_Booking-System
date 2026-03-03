import express from "express"
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../Models/DoctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../Models/AppointmentModel.js";
import userModel from "../Models/UserModel.js";

export const addDoctor= async(req,res)=>{

    try {
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        const imageFile=req.file;

        const isDoctorExist=await doctorModel.findOne({email});

        
        if(!name || !email || !password  || !speciality || !degree || !experience || !about   || !fees || !address){

            return res.json({success:false,message:"Missing Details"})
        }

        if(!imageFile){
            return res.json({success:false,message:"Doctor image reqiured"});
        }

        // email validation

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        // Check if the Doctor already Exist

        if(isDoctorExist){
             return res.status(401).json({success:false,message:"This Doctor  Already Exist!"});
        }

        //password length

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hash salt

        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);

        // upload image to cloudinary

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{
            resource_type:"image"
        });

        const imageUrl=imageUpload.secure_url;

       

        const doctorData={
            name,email,
            image:imageUrl,
            password:hashPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = await doctorModel.create(doctorData);

        res.json({success:true,message:"new doctor added"})
        
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Admin Login
export const AdminLogin= async(req,res)=>{
    
    try {
        
        const {email,password}=req.body;

        if(!email || !password){
            return res.json({success:false,message:"Missing Datails"})
        }

        if(process.env.ADMIN_EMAIL !=email || process.env.ADMIN_PASSWORD !=password){
            return res.json({success:false,message:"invalid credentials"});
        }

        const token=jwt.sign(email + password,process.env.JWT_KEY);

        res.json({success:true,token:token})



    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// get all doctor in admin panel

export const allDoctors= async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-password');
        // console.log(doctors);
        res.json({success:true,doctors:doctors})
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message:error.message });
    }
}


export const  appointmentsAdmin= async(req,res)=>{
    try {
        
        const appointments=await appointmentModel.find({});
        res.json({success:true,appointments})


    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message:error.message });
    }
}

// api for  appointment cancellation

export const AppointmentCancel=async(req,res)=>{


    try {

        const {appointmentId}=req.body;
         
                // console.log(userId);

        const appointmentData=await appointmentModel.findById(appointmentId);
         
        // console.log(appointmentData.userId);

        
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

        // releasing from doctor



        const { docId, slotDate, slotTime } = appointmentData;

    // 2️ Get doctor data
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // 3 Remove the slot from doctor's booked slots
    if (doctor.slots_booked[slotDate]) {
      doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter(
        (time) => time !== slotTime
      );
      // If no more slots booked for that date, remove the date key
      if (doctor.slots_booked[slotDate].length === 0) {
        delete doctor.slots_booked[slotDate];
      }
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked: doctor.slots_booked });



    // 5 Send success response
    res.json({ success: true, message: "Appointment cancelled successfully" });


        
    } catch (error) {
        res.json({success:false,message:error.message})

    }
   
}

export const adminDashBoard=async(req,res)=>{

try {
    const doctors=await doctorModel.find({});
    const users=await userModel.find({});
    const appointment=await appointmentModel.find({});
    
    const dashData={
        doctorsNum:doctors.length,
        patientNum:users.length,
        appointmentNum:appointment.length,
        latestAppointments:appointment.reverse().slice(0,5)

    }

    res.json({success:true,dashData});

} catch (error) {
    res.json({success:false,message:error.message})
}

}