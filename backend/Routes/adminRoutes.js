import express from "express";
import { addDoctor, AdminLogin, allDoctors } from "../Controllers/adminController.js";
import upload from "../MiddleWare/Multer.js";
import adminAuth from "../MiddleWare/adminAuth.js";
import { changeAvailability } from "../Controllers/doctorController.js";



const AdminRouter=express.Router();

AdminRouter.post("/add-doctor",adminAuth,upload.single('image'),addDoctor);
AdminRouter.post("/admin-login",AdminLogin);
AdminRouter.post("/all-doctors",adminAuth,allDoctors);
AdminRouter.post("/change-availability",adminAuth,changeAvailability);




export default AdminRouter;