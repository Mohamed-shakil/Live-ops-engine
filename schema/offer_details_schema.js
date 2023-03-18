const mongoose=require("mongoose");


const offer_schema=new mongoose.Schema({
    username:String,
    offer_id: String, 
    offer_title: String, 
    offer_description: String, 
    offer_image: String,
    offer_sort_order: Number, 
    content: Array, 
    schedule: Object, 
    target: String, 
    pricing: Array

})

const offerdetails=mongoose.model("offerdetails",offer_schema);

module.exports=offerdetails;