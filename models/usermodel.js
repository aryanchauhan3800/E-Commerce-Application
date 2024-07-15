import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
       type:String,
       required:true,
       trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:{},
        require:true
    },
    phonenumber:{
        type:Number,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})


export default mongoose.model("User",userSchema);