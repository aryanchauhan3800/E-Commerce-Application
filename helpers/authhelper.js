import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.config();


export const hashpassword=async(password)=>{
    try{
       const saltRounds = 10;
       const hashpass= await bcrypt.hash(password,saltRounds);
       return hashpass;
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in hashing password",
            error:error
        })
    }
}

export const comparepassword=(wriitenpass,password)=>{
    return bcrypt.compare(wriitenpass,password);
}