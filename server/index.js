import express from "express";
import cors from "cors"
import userRoutes from "./routes/user.js"
import adRoutes from "./routes/ad.js"
import db from "./db/index.js";

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
const port= 4000;

app.use("/user", userRoutes);
app.use("/ad", adRoutes);

app.listen(port,()=>{
    console.log("port 4000 connected")
})