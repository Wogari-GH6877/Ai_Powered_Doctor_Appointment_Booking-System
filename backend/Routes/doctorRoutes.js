import express from "express"
import { doctorList, DoctorLogin,appointmentDoctors, appointmentCompleted, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile } from "../Controllers/doctorController.js";
import doctorAuth from "../MiddleWare/authDoctor.js";


const doctorRouter=express.Router();
doctorRouter.get("/list",doctorList);
doctorRouter.post("/login",DoctorLogin);
doctorRouter.get("/appointment",doctorAuth,appointmentDoctors);
doctorRouter.post("/complete-appointment",doctorAuth,appointmentCompleted);
doctorRouter.post("/cancel-appointment",doctorAuth,appointmentCancel);
doctorRouter.get("/dashboard",doctorAuth,doctorDashboard);
doctorRouter.get("/profile",doctorAuth,doctorProfile);
doctorRouter.post("/update-profile",doctorAuth,updateDoctorProfile);





export default doctorRouter;