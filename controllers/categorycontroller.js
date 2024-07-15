import categorymodel from "../models/categorymodel.js"
import slugify from "slugify"

export const createcategory=async(req,res)=>{
   try{
     const {name}=req.body
     if(!name){
        return res.status(200).send({
           success:false,
           message:"provide name of category"
         })
      }
      
      const exitingcategory=await categorymodel.findOne({name});
      if(exitingcategory){
        return res.status(200).send({
            success:true,
            message:"category already exit"})
     }

     const category=await new categorymodel({name,slug:slugify(name)}).save();
     res.status(200).send({
        success:true,
        message:"successfully created category",
        category
     })
   }catch(error){
    res.status(500).send({
        success:false,
        message:"Error in category"
    })
   }
}

export const updatecategory=async(req,res)=>{
   try{
      const {name}=req.body;
      const {id}=req.params;
      const category=await categorymodel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
      res.status(200).send({
         success:true,
         message:"updated successfully",
         category
      })

   }catch(error){
      res.status(500).send({
         success:false,
         message:"error in updation"
      })
   }
}

export const getallcategory=async(req,res)=>{
   try{
     const category=await categorymodel.find({});
     res.status(200).send({
      success:true,
      message:"successfully get all user",
      category
     })
   }catch{
     res.status(500).send({
      success:false,
      message:"error in getting all category"
     })
   }
}

export const getsinglecategory=async(req,res)=>{
   try{
      const category=await categorymodel.findOne({slug:req.params.slug});
      res.status(200).send({
         success:true,
         message:"successfully get category",
         category
      })

   }catch(error){
      res.status(500).send({
         success:false,
         message:"error in getting single category"
      })
   }
}

export const deletecategory=async(req,res)=>{
   try{
      const {id}=req.params
      await categorymodel.findByIdAndDelete(id);
      res.status(200).send({
         success:true,
         message:"successfully deleting the category"
      })
   }catch(error){
      res.status(500).send({
         success:false,
         message:"error in deleting category"
      })
   }
}