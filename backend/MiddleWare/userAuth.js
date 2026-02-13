


import jwt from "jsonwebtoken";

const userAuth=async(req,res,next)=>{    
    try {
        
        const {token}=req.headers;

        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})

        }

        const token_decode = jwt.verify(token, process.env.JWT_KEY);
        
        req.userId = token_decode.id;
        next();

    } catch (error) {
        console.error("something is wrong", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default userAuth;