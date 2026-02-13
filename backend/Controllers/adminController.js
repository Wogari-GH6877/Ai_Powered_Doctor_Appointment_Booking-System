import express from "express"
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../Models/DoctorModel.js";
import jwt from "jsonwebtoken";

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