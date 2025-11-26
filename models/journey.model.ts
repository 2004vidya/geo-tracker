
import mongoose, { model, models, Schema } from "mongoose";


const CoordinateSchema = new mongoose.Schema({
    lat:{
        type:Number,
        required:true
    },
     long:{
        type:Number,
        required:true
    },
    timestamp:{
    type:Date,
    default:Date.now()

    }
});

const JourneySchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    source:{
        lat:Number,
        long:Number,
        address:String
    },
    destination:{
        lat:Number,
        long:Number,
        address:String
    },

    plannedRoute:{
        type:[CoordinateSchema],
        default:[]
    },

    liveLocationUpdates:{
        type:[CoordinateSchema],
        default:[]
    },
    deviationDetected:{
        type:Boolean,
        default:false,
    },

    startedAt:Date,
    endedAt:Date



},{timestamps:true})

export default models.Journey || model("Journey",JourneySchema);