import usermodel from "../models/usermodel.js"
import JWT from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const requireSignIn =(req,res,next)=>{
    try{
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode
        next();
    }catch(error){
        res.status(401).send({
            success:false,
            message:"token is not verified"
        })
    }
}

export const isAdmin = async(req,res,next)=>{
    try{
       const user=await usermodel.findById(req.user._id);
       if(user.isAdmin){
        next();
       }else{
        res.status(200).send({
            success:false,
            message:"not admin"
        })
       }
    }catch(error){
        res.status(401).send({
            success:false,
            message:"server error in fetching admin"
        })
    }
}
