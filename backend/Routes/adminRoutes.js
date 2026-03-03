import express from "express";
import { addDoctor, AdminLogin, allDoctors, appointmentsAdmin ,AppointmentCancel, adminDashBoard} from "../Controllers/adminController.js";
import upload from "../MiddleWare/Multer.js";
import adminAuth from "../MiddleWare/adminAuth.js";
import { changeAvailability } from "../Controllers/doctorController.js";



const AdminRouter=express.Router();

AdminRouter.post("/add-doctor",adminAuth,upload.single('image'),addDoctor);
AdminRouter.post("/admin-login",AdminLogin);
AdminRouter.get("/all-doctors",adminAuth,allDoctors);
AdminRouter.post("/change-availability",adminAuth,changeAvailability);
AdminRouter.get("/appointment",adminAuth,appointmentsAdmin);
AdminRouter.post("/cancel-appointment",adminAuth,AppointmentCancel);
AdminRouter.get("/dashboard",adminAuth,adminDashBoard);






export default AdminRouter;