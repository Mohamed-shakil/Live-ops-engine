const mongoose=require("mongoose");


const user_schema=new mongoose.Schema({
    username:{type:String,required:true},
    email:String,
    password:{type:String,required:true}
})

const userdetails=mongoose.model("userdetails",user_schema);

module.exports=userdetails;