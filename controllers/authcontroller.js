import usermodel from "../models/usermodel.js"
import ordermodel from "../models/ordermodel.js"
import {hashpassword,comparepassword} from "../helpers/authhelper.js"
import emailValidator from "deep-email-validator";
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

async function isEmailValid(email) {
    return emailValidator.validate(email);
}

// input validity in register
const checkingInput=async(userdetail)=>{
    const {name,email,password,address,phonenumber}=userdetail;

    if(!name || !email || !password || !address || !phonenumber){
       return false;
    } 
    const {valid, reason, validators} = await isEmailValid(email);
    if(!valid){
      return false;
    }
    
    if(password.length<8){
        return false;
    }
    return true;
}

// register
export const registeruser=async(req,res)=>{
    try{
       const {name,email,password,address,phonenumber}=req.body;
       const check= await checkingInput(req.body);
       if(!check){
         res.status(401).send({
            success:false,
            message:"please provide all valid detail"
         })
         return;
       }
       const alreadyuser=await usermodel.findOne({email:email});
        if(alreadyuser){
            res.status(400).send({
                success:true,
                message:"already register please login"
            })
            return;
        }
        const hashedpassword= await hashpassword(password);
        const user= await new usermodel({name,email,password:hashedpassword,address,phonenumber}).save();
        res.status(201).send({
            success:true,
            message:"successfully register user",
            user
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in registering",
            error
        })
    }
}

// login
export const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            res.status(500).send({
                success:false,
                message:"provide email and password"
            })
            return;
        }
    
        // fetch user
        const user= await usermodel.findOne({email});
        if(!user){
            res.status(500).send({
                success:false,
                message:"No such user exits"
            })
            return;
        }
        const comppass=await comparepassword(password,user.password);
        if(!comppass){
            res.status(500).send({
                success:false,
                message:"Invalid credentail"
            })
            return
        }
        const token =await JWT.sign({_id:user.id},process.env.JWT_SECRET,{
            expiresIn:'10d'
        })
        res.status(200).send({
            success:true,
            message:"successfully login",
            user:{
                name:user.name,
                email:user.email,
                address:user.address,
                phonenumber:user.phonenumber,
                isAdmin:user.isAdmin,
                id:user.id
            },
            token
        })   
    }catch(error){
        res.status(401).send({
            success:false,
            message:"error in login",
            error
        })   
    }
}

export const getalluser=async(req,res)=>{
  try{
    const users=await usermodel.find({});
    res.status(200).send({
      success:true,
      message:"Successfully get all user",
      users
    })
  }catch(error){
    res.status(400).send({
      success:true,
      message:"error in getting users"
    })
  }
}

// test
export const testtoken=(req,res)=>{
    res.status(200).send({
        success:true,
        message:"user verified and admin"
    })
}

export const updateprofile=async(req,res)=>{
    const {name,password,email,address,phonenumber}=req.body;

    try{
      const user=await usermodel.findById(req.params.id);
      
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashpassword(password) : undefined;

      const updatedUser = await usermodel.findByIdAndUpdate(
        req.params.id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phonenumber: phonenumber || user.phonenumber,
          address: address || user.address,
        },
        { new: true }
      )
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser:{
            name:updatedUser.name,
            email:updatedUser.email,
            address:updatedUser.address,
            phonenumber:updatedUser.phonenumber,
            isAdmin:updatedUser.isAdmin,
            id:updatedUser.id
        }
      });
    }catch(error){
        res.status(400).send({
            success:false,
            message:"error in updating"
        })
    }
}


export const getuserorders=async(req,res)=>{
    try {
        const orders = await ordermodel
          .find({ buyer: req.user._id })
          .populate("products", "-photo")
          .populate("buyer", "name");
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error While Geting Orders",
          error,
        }) 
    }   
}

export const getalluserorders=async(req,res)=>{
    try {
        const orders = await ordermodel
          .find()
          .populate("products", "-photo")
          .populate("buyer", "name")
          .sort({createdAt:"-1"})
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error While Geting Orders",
          error,
        }) 
    }   
}

export const changeorderstatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await ordermodel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };