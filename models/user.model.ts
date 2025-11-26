import mongoose, { model, models } from "mongoose";


const EmergencyContactSchema = new mongoose.Schema({
    name:{type:String},
    phone:{type:String,required:true}
});

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

    emergencyContacts:{
        type:[EmergencyContactSchema],
        default:[]
    },
    

    safeRadius:{
        type:Number,
        default:500
    }

},{timestamps:true})

export default models.User || model("User",userSchema)