import validator from "validator";
import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import{v2 as cloudinary} from "cloudinary";
import doctorModel from "../Models/DoctorModel.js";
import appointmentModel from "../Models/AppointmentModel.js";
import Transporter from "../Config/nodemailer.js"

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
        
        const token=jwt.sign({id:newUser._id},process.env.JWT_KEY,{expiresIn:"7d"});


        // send welcome email to user

        const emailTemplate = `
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; color: #1f2937; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f9fafb; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: sans-serif; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background-color: #7375F5; padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -0.5px; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .content h2 { color: #111827; font-size: 22px; margin-top: 0; }
        .content p { color: #4b5563; font-size: 16px; margin-bottom: 24px; }
        .button-container { text-align: center; margin: 30px 0; }
        .button { background-color: #7375F5; color: #ffffff !important; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.3s; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #9ca3af; }
        .divider { border-top: 1px solid #e5e7eb; margin: 30px 0; }
        .badge { display: inline-block; background-color: #eeefff; color: #7375F5; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div className="wrapper">
        <table className="main">
            <tr>
                <td className="header">
                    <h1>🩺 WakCare</h1>
                </td>
            </tr>
            <tr>
                <td className="content">
                    <div className="badge">WELCOME TO THE FAMILY</div>
                    <h2>Hi there,</h2>
                    <p>We’re thrilled to have you join <strong>WakCare</strong>. You’ve taken the first step toward smarter, easier healthcare management. Our AI assistant is ready to help you find the best doctors and manage your appointments in seconds.</p>
                    
                    <div className="button-container">
                        <a href="https://my-mern-frontend-7wvx.onrender.com/login" className="button">Get Started Now</a>
                    </div>

                    <p><strong>What’s next?</strong><br>
                    • Explore our list of top-rated specialists.<br>
                    • Chat with WakCare AI for instant medical info.<br>
                    • Book your first appointment with ease.</p>

                    <div className="divider"></div>
                    
                    <p style="font-size: 14px; margin-bottom: 0;">If you didn't sign up for this account, you can safely ignore this email.</p>
                </td>
            </tr>
        </table>
        <table style="margin: 0 auto; width: 100%; max-width: 600px;">
            <tr>
                <td className="footer">
                    <p>&copy; 2026 WakCare Inc. | Addis Ababa, Ethiopia</p>
                    <p>Stay healthy, stay happy.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;



        const mailOption={
            from:process.env.EMAIL_SENDER,
            to:email,
            subject:"WELL COME TO WAKCARE",
            text:`your Acccount has been created ${email}`,
            html:emailTemplate
        }

        Transporter.sendMail(mailOption);

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


        res.json({success:true,appointments});
    }
        catch (error) {
            res.json({success:false,message:error.message})
        }}