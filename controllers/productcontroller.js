import slugify from "slugify";
import productmodel from "../models/productmodel.js";
import fs from "fs";
import braintree from "braintree";
import ordermodel from "../models/ordermodel.js"
import dotenv from "dotenv"

dotenv.config();


var gateway= new braintree.BraintreeGateway({
  environment:braintree.Environment.Sandbox,
  merchantId:process.env.PAYMENT_MERCHANT_ID,
  publicKey:process.env.PAYMENT_PUBLIC_KEY,
  privateKey:process.env.PAYMENT_PRIVATE_KEY
});


export const createproduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });  
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products =new productmodel({...req.fields,slug:slugify(name)});
    if(photo){
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
        success:true,
        message:"successfully created products",
        products
    })
  } catch(error){
    res.status(401).send({
        success:false,
        message:"error in creating product"
    })
  }
};

export const getallproduct=async(req,res)=>{
  try{
    const products=await productmodel.find({}).select("-photo").populate("category").limit(12).sort({createdAt:-1});
    res.status(200).send({
      success:true,
      countTotal:products.length,
      message:"successfully get all product",
      products
    })
  }catch{
    req.status(401).send({
      success:false,
      message:"error in getting all product"
    })

  }
}

export const getsingleproduct=async(req,res)=>{
  try{
    const product=await productmodel.findOne({slug:req.params.slug}).select("-photo").populate("category");
    res.status(200).send({
      success:true,
      message:"successfully product is get",
      product
    })
  }catch{
    res.status(401).send({
      success:false,
      message:"error in getting product"
    })
  }
}

export const getproductphoto=async(req,res)=>{
  try{
    const product=await productmodel.findById(req.params.pid).select("photo");
    if(product.photo.data){
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }

  }catch(error){
     res.status(401).send({
      success:true,
      message:"error in getting product photo"
     })
  }
}

export const deleteproduct=async(req,res)=>{
  try{
    await productmodel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success:true,
      message:"successfully deleted product"
    })
  }catch{
    res.status(400).send({
      success:false,
      message:"error in deleting product"
    })
  }
}

export const updateproduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });  
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const products=await productmodel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});
    
    if(photo){
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
        success:true,
        message:"successfully update products",
        products
    })
  } catch(error){
    res.status(401).send({
        success:false,
        message:"error in updating product"
    })
  }
};


// filter
export const filterproduct=async(req,res)=>{
  try{
    const {checked,radio} =req.body;
    let filter={};
    if(checked.length>0) filter.category=checked;
    if(radio.length) filter.price={$gte:radio[0],$lte:radio[1]};
    const products=await productmodel.find(filter);
    res.status(200).send({
      success:true,
      products
    })
  }catch(error){
    res.status(400).send({
      success:false,
      message:"error in filtering"
    })
  }
}

export const productcount=async(req,res)=>{
  try{
    const totallength=await productmodel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success:true,
      totallength
    })
  }catch(error){
     res.status(400).send({
      success:false,
      message:"error in getting total count"
     })
  }
}

export const similarproductlist=async(req,res)=>{
  try{
    const {checked,radio} =req.body;
    let filter={};
    if(checked.length>0) filter.category=checked;
    if(radio.length) filter.price={$gte:radio[0],$lte:radio[1]};
    let l=1;
    const page=req.params.page;
    const products=await productmodel.find(filter).select("-photo").skip((page-1)*l).limit(l).sort({createdAt:-1});
    console.log(products);
    res.status(200).send({
      success:true,
      products
    })
  }catch(error){
    res.status(400).send({
      success:false,
      message:"error in getting product list"
    })
  }
}
export const productlist=async(req,res)=>{
  try{
    let l=3;
    const page=req.params.page?req.params.page:1
    const products=await productmodel.find({}).select("-photo").skip((page-1)*l).limit(l).sort({createdAt:-1});
    res.status(200).send({
      success:true,
      products
    })
  }catch(error){
    res.status(400).send({
      success:false,
      message:"error in getting product list"
    })
  }
}

export const searchproduct =async(req,res)=>{
  try {
    const { keyword } = req.params;
    const resutls = await productmodel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
}

export const similarproduct =async(req,res)=>{
  try {
    const { pid, cid } = req.params;
    const products = await productmodel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
}

export const categoryproduct=async(req,res)=>{
  try{
    const products=await productmodel.find({category:req.params.cid});
    res.status(200).send({
      success:true,
      message:"successfully get products",
      products
    })
  }catch(error){
     res.status(400).send({
      success:false,
      message:"error in getting products"
     })
  }
}

export const braintreetokencontroller=async(req,res)=>{
  try{
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).send(err);
      }else{
        res.send(response);
      }
    });
  }catch(error){
    console.log(error);
  }
}

export const braintreepaymentcontroller=async(req,res)=>{
  try{
    const {nonce,cart}=req.body;
    let total=0;
    cart.map((i)=>{
      total+=i.price;
    })

    let newTransaction=gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true,
      }
    },
    function(error,result){
      if (result) {
        const order = new ordermodel({
          products: cart,
          payment: result,
          buyer: req.user._id,
        }).save();
        res.json({ ok: true });
      } else {
        res.status(500).send(error);
      }})
  }catch(error){
    console.log(error);
  }
}

