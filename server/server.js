const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const enquiryRoutes = require("./routes/enquiryRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/enquiries",enquiryRoutes);
app.get("/", (req,res)=>{
    res.json({
        message:"Car Dealership API Running 🚗"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});