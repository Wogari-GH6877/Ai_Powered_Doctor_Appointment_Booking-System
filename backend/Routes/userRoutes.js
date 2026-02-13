import express from "express";
import { Login, SignUp, updateProfile, userProfile,bookAppointment, listAppointment } from "../Controllers/userController.js";
import userAuth from "../MiddleWare/userAuth.js";
import upload from "../MiddleWare/Multer.js";

const userRouter=express.Router();

userRouter.post("/sign-up",SignUp);
userRouter.post("/login",Login);
userRouter.get("/profile",userAuth,userProfile);
userRouter.post("/update-profile",userAuth,upload.single("image"),updateProfile);
userRouter.post("/book-appointment",userAuth,bookAppointment);
userRouter.get("/appointments",userAuth,listAppointment)




export default userRouter;