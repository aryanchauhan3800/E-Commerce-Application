import offersmodel from "../models/offersmodel.js";

import fs from "fs";


export const createoffer=async(req,res)=>{
    try{
      const {photo} =req.files;
    const offer=new offersmodel();
    if(photo){
        offer.photo.data=fs.readFileSync(photo.path),
        offer.photo.contentType=photo.type
    }
    await offer.save();
    res.status(200).send({
      success:true,
      message:"successfully get", 
      offer
    })
  }catch(error){
    res.status(400).send({
        success:false,
        message:"error in getting the offer"
    })
  }
}

export const deleteoffer=async(req,res)=>{
  try{
    await offersmodel.findByIdAndDelete(req.params.Id);
    res.status(200).send({
      success:true,
      message:"successfully deleted the offer"
    })
  }catch(error){
    res.status(400).send({
      success:true,
      message:"error in deleting the offer"
    })
  }
}

export const getalloffers=async(req,res)=>{
  try{
    const offers=await offersmodel.find({}).select("-photo");
    res.status(200).send({
      success:true,
      message:"successfully get the product",
      offers
    })

  }catch(error){
    res.status(400).send({
      success:true,
      message:"error in getting the offers"
    })
  }
}

export const getofferimage=async(req,res)=>{
  try{
    const offer=await offersmodel.findById(req.params.Id).select("photo");
    if(offer.photo.data){
      res.set("Content-type", offer.photo.contentType);
      return res.status(200).send(offer.photo.data);
    }
  }catch(error){
    res.status(400).send({
      success:true,
      message:"error in getting image"
    })
  }
}