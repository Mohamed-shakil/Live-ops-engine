const express=require("express");
const bcrypt=require("bcrypt");
const user_route=express.Router();
const userdetails=require("../schema/user_details_schema");

const saltval=5;

user_route.post("/signup",async (req,resp)=>{
    bcrypt.genSalt(saltval,(err,val)=>{
        if(!err)
        {
            bcrypt.hash(req.body.password,saltval,(err,val)=>{
                if(!err)
                {
                    userdetails.create({
                        username:req.body.username,
                        email:req.body.email|"",
                        password:val
                    }).then((u)=>{resp.status(200).send(`${u} added successfully`)}).catch((err)=>{console.log(err);resp.status(400).send("not added")})
                }
                else
                {
                    console.log(err);
                }

            })
        }
        else{
            console.log(err);
        }
    })
})
module.exports=user_route;