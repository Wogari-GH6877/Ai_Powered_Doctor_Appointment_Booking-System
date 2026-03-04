// Import packages

import express from "express";
import "dotenv/config";
import cors from "cors";
import DBConnection from "./Config/MongoDb.js";
import connectCloudinary from "./Config/Cloudinary.js";
import AdminRouter from "./Routes/adminRoutes.js";
import doctorRouter from "./Routes/doctorRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import chatRouter from "./Routes/chatRoutes.js";


const app=express();
const Port=process.env.PORT || 4000;

// Db Connection
DBConnection();
connectCloudinary();



// middlewre config

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5177","http://localhost:5174","http://localhost:5173",
        process.env.CLIENT_URL1,process.env.ADMIN_URL1,
    process.env.CLIENT_URL2,process.env.ADMIN_URL2],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));






// Api End Point

app.use("/api/admin",AdminRouter);
app.use("/api/doctor",doctorRouter);
app.use("/api/user",userRouter);
app.use("/api/chat", chatRouter);

app.get("/",(req,res)=>{
    res.send("Apis is Working ");
})

app.listen(Port,()=>{
    console.log(`Server is Listenig at Port ${Port}`)
})