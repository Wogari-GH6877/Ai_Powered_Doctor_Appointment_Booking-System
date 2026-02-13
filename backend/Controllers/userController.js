import validator from "validator"
import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import{v2 as cloudinary} from "cloudinary";
import doctorModel from "../Models/DoctorModel.js";
import appointmentModel from "../Models/AppointmentModel.js";

export const SignUp=async (req,res)=>{

    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.json({success:false,message:"Missing Details"})
    }
 
    try {
        const isUserExist = await userModel.findOne({ email });

        if (isUserExist){
            return res.json({success:false,message:"User already exist"});
        }


        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password at least 8 length"})
        }

        const salt=await bcrypt.genSalt(10);

        const hashPassword=await bcrypt.hash(password,salt);


        const userData={name,email,password:hashPassword}

        const newUser=await userModel.create(userData);
        
        const token=jwt.sign({user_id:newUser._id},process.env.JWT_KEY,{expiresIn:"7d"});

        res.json({success:true,message:"User is Created",token:token});
        


        
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message:error.message });
    }

}

export const Login= async(req,res)=>{

    const {email,password}=req.body;

    

    try {

        if( !email || !password){
        return res.json({success:false,message:"Missing Details"})
    }

    const isUserExist = await userModel.findOne({ email });

        if (!isUserExist){
            return res.json({success:false,message:"User Does not exist Sign up"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        // if(password.length<8){
        //     return res.json({success:false,message:"Please enter a strong password at least 8 length"})
        // }

        const salt=await bcrypt.genSalt(10);

        const isMatch=await bcrypt.compare(password,isUserExist.password);

        if(isMatch){

            const token=jwt.sign({id:isUserExist._id},process.env.JWT_KEY,{expiresIn:"7d"});

            res.json({success:true,message:"User is Loggined",token:token});
            
        }else{
            return res.json({success:false,message:"invalid credentials"})

        }

        

        


        
    } catch (error) {

        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message:error.message });
        
    }


}

// api to user profile

export const userProfile= async(req,res)=>{
    try {
        const userId=req.userId;
        const newUser=await userModel.findById(userId).select(-'password');

        if(newUser){
            return res.json({success:true,userData:newUser});
        }else{
            return res.json({success:false,message:"invalid Credentials"})
        }
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message:error.message });
    }
}

// update user profile

export const updateProfile=async(req,res)=>{
    try {

        const userId=req.userId;
        const {name,address,gender,dob,phone}=req.body;
        const imageFile=req.file;


        
        if(!name || !gender || !dob || !phone || !address){

            return res.json({success:false,message:"Missing Details"})
        }
       

        const updateUser={
            name,
            gender,
            dob,
            phone,
            address:JSON.parse(address),
            
        }

        
        await userModel.findByIdAndUpdate(userId,updateUser)

        if(imageFile){
             // upload image to cloudinary

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{
            resource_type:"image"
        });
          
          const imageUrl=imageUpload.secure_url;
         await userModel.findByIdAndUpdate(userId,{image:imageUrl})


        }

        res.json({success:true,message:"profile is updated"});
        
    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


// API to Book Appointment 

export const bookAppointment = async(req,res)=>{

    try {
        
        const {userId,docId,slotDate,slotTime}=req.body;
        const docData=await doctorModel.findById(docId).select("-password");
        console.log(docData);

        // if(!userId || !docId || !slotDate || !slotTime){
        //     return res.json({success:false,message:"Missing Details"})}
        

        if(!docData.available){
            res.json({success:false,message:"Doctor is not available, Please choose another doctor or date"})   
        }

        let slots_booked=docData.slots_booked;

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                 res.json({success:false,message:"Slot is not available, Please choose another doctor or date"})   
        }else{
            slots_booked[slotDate].push(slotTime);
        }
    }else{
    slots_booked[slotDate]=[];
    slots_booked[slotDate].push(slotTime);}


const userData=await userModel.findById(userId).select("-password");
           delete docData.slots_booked

        const appointmentData={
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount:docData.fees,
            date:Date.now()
        }
        const newAppointment=await appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment Booked",appointmentData:appointmentData});


    }catch (error) {
    
        res.json({success:false,message:error.message})
    }
    
}

// API to get user appointments for my appointments page

export const listAppointment=async(req,res)=>{
    try {
        const userId=req.userId;
        const appointments=await appointmentModel.find({userId});
        console.log(appointments);


        res.json({success:true,appointments});
    }
        catch (error) {
            res.json({success:false,message:error.message})
        }}