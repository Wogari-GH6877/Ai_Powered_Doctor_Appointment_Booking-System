import jwt from "jsonwebtoken";

const adminAuth= async(req,res,next)=>{
    try {
        
        const {atoken}=req.headers;

        if(!atoken){
            return res.json({success:false,message:"Not Authorized Login Again"})

        }

        const token_decode = jwt.verify(atoken, process.env.JWT_KEY);
        
        if (
            token_decode !== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD
        ) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        next();

    } catch (error) {
        console.error("something is wrong", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default adminAuth;