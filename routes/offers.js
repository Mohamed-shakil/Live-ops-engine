const express=require("express");
const offer_route=express.Router();
const offerdetails=require("../schema/offer_details_schema");
const jwt=require("jsonwebtoken");
const Secret="abcdef";

function get_token(usertoken)
{
    return new Promise((resl,rej)=>{
        if(usertoken)
        {
            const decodedtoken=jwt.verify(usertoken,Secret);
            resl(decodedtoken);
        }
        else{
            rej("Invalid token")
        }
    })
}
offer_route.get("/listoffer",async (req,resp)=>{
    offerdetails.find().then((offercollection)=>{
        offercollection,filter((offer)=>{
            const data=offer.target.split("and");
            const displayoffer=[];
            data.forEach(element => {
                let arr=[];
                let sign="";
                if(element.includes("<"))
                {
                    arr=element.trim().split("<");
                    sign="<";
                }
                else
                {
                    arr=element.trim().split(">");
                    sign=">";
                }
                if(`${req.body[arr[0]]} ${sign} ${arr[-1]}`){
                    displayoffer.push(arr[-1])
                }
            });
        })
        resp.status(200).send(`${displayoffer}`);
    }).catch((e)=>{resp.send(e)});});


offer_route.post("/createoffer",async(req,resp)=>{
    get_token(req.headers.authorization).then((data)=>{
        offerdetails.create({...req.body,username:data.username}).then(()=>{
            resp.send("Offer created")
        }).catch((e)=>{resp.send(e)});});
});

offer_route.put("/updateoffer",async(req,resp)=>{
    offerdetails.updateOne({offer_id:req.body.offer_id},req.body).then(()=>{
        resp.status(200).send("Offer updated");
    }).catch((e)=>{resp.send(e)});});

offer_route.delete("/deleteoffer",async(req,resp)=>{
    offerdetails.deleteOne({offer_id:req.body.offer_id}).then(()=>{
        resp.status(200).send("Offer deleted");
    }).catch((e)=>{resp.send(e)});});

module.exports=offer_route;