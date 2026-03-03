import doctorModel from "../Models/DoctorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../Models/AppointmentModel.js";
import { json } from "express";

export const changeAvailability= async(req,res)=>{

    try {
        
        const {docId}=req.body;

        const docData=await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available});
        res.json({success:true,message:"availability changed"})


    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const doctorList=async(req,res)=>{
    try {

        const doctors=await doctorModel.find({}).select(-['email','password']);

        res.json({success:true,doctors});
        
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message:error.message });
    }
}


export const DoctorLogin= async(req,res)=>{
    
    try {
        
        const {email,password}=req.body;

        const doctor=await doctorModel.findOne({email});

        if(!email || !password){
            return res.json({success:false,message:"Missing Datails"})
        }
        
        if(!doctor){
            return res.json({success:false,message:"invalid credentials"});

        }

        const isMatch=await bcrypt.compare(password,doctor.password);


        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_KEY)
            res.json({success:true,token:token})

        }else{
            return res.json({success:false,message:"invalid credentials"});
        }





    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const  appointmentDoctors=async(req,res)=>{
    try {
        const docId=req.docId;
        const appointments=await appointmentModel.find({docId});
        
        return res.json({success:true,appointments});
    } catch (error) {
         console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Api for Appointment Completed


export const appointmentCompleted=async(req,res)=>{
    try {
        const docId=req.docId;
        const {appointmentId}=req.body;

        const appointmentData=await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
            return res.json({success:true,message:"Appiontment Completed"});
        }else{
            return res.json({success:false,message:"Mark Failed"});
        }

    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//Api to cancel Appointment

export const appointmentCancel=async(req,res)=>{
    try {
        const docId=req.docId;
        const {appointmentId}=req.body;

        const appointmentData=await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            return res.json({success:true,message:"Appiontment Cancelled"});
        }else{
            return res.json({success:false,message:"Mark Failed"});
        }

    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const doctorDashboard= async(req,res)=>{
    try {
        const docId=req.docId;

        const appointments= await appointmentModel.find({docId});

        let earnings=0;
        appointments.map((items)=>{
            if(items.isCompleted || items.payment){
                earnings +=items.amount
            }
        })
       
        let patients=[]

        appointments.map((items)=>{
            if(!patients.includes(items.userId)){
                patients.push(items.userId);
            }
        });

        const dashData={
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        
        res.json({success:true,dashData});
        
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


// Api for Doctor profile

export const doctorProfile =async(req,res)=>{
    try {

        const docId=req.docId;
        const profileData = await doctorModel.findById(docId).select("-password");

        res.json({success:true,profileData})
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// api to update doctor profile

export const updateDoctorProfile=async(req,res)=>{


    try {
        const docId=req.docId;

        const {fees,address,available}=req.body;

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available});

        res.json({success:true,message:"Profile is Updated"})
        
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
    }
