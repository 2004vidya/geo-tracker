import mongoose, { models, Schema } from "mongoose";


const AlertSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    JourneyId:{
        type:Schema.Types.ObjectId,
        ref:"Journey",
        required:true

    },
    type:{
        type:String,
        enum:["route-deviation","no-movement"],
        required:true
    },
    message:{
        type:String
    }
},{timestamps:true})


export default models.Alert || mongoose.model("Alert",AlertSchema);