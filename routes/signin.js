const express=require("express");
const bcrypt=require("bcrypt");
const user_route=express.Router();
const userdetails=require("../schema/user_details_schema");
const jwt=require("jsonwebtoken");
const Secret="abcdef";

user_route.post("/signin",async (req,resp)=>{
    userdetails.findOne({username:req.body.username}).then((user)=>{
        if(user)
        {
            if(bcrypt.compareSync(req.body.password,user.password))
            {
                const token=jwt.sign({id:user._id,username:user.username},Secret)
                resp.send({Msg:"Logged in",Token:token});
            }
            else
            {
                resp.send("password does not match")
            }
        }
        else
        {
            resp.send("User doesn't exist")
        }
    })
    
})

module.exports=user_route;