import doctorModel from "../Models/DoctorModel.js";

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
