const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    moistureContent:{
        type:Number,
        default:null
    },
    status:{
        type:Number, // status 1- if irrigation done 2- waiting for time
        required:true
    },
    cropType:{
        type:String,
        default:true
    },
    cropArea:{
       type:Number,
       required:true
    },
    irrigationTime:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    updatedAt:{
        type:Date,
        required:true
    },
    updatedBy:{
        type:String,
        required:true
    }
});

const Crop = mongoose.model('Crop',cropSchema);
module.exports = Crop;