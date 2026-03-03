


import jwt from "jsonwebtoken";

const doctorAuth=async(req,res,next)=>{    
    try {
        
        const {dtoken}=req.headers;

        if(!dtoken){
            return res.json({success:false,message:"Not Authorized Login Again"})

        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_KEY);
        
        req.docId = token_decode.id;
        next();

    } catch (error) {
        console.error("something is wrong", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default doctorAuth;