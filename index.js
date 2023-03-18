const express=require("express");
const app=express();
const mongoose=require("mongoose");
const body_parser=require("body-parser")
const signuproute=require("./routes/signup");
const signinroute=require("./routes/signin");
const offerroute=require("./routes/offers")
const Listen_Port=8080;


mongoose.connect("mongodb://localhost:27017/user_details").then(()=>{
    console.log("Connected to local Database");
}).catch(()=>{
    console.log("Connection failed");
})
app.use(body_parser.json());
app.listen(Listen_Port,()=>{
    console.log(`${Listen_Port} is running`)
})
app.use("/user_details",signuproute);
app.use("/user_details",signinroute);
app.use("/offer_details",offerroute);