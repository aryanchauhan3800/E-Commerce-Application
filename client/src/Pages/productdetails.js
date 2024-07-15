import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout/layout";
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';
import "../styles/productdetail.css"

const Productdetails = () => {
   const navigate=useNavigate();
   const [cart,setCart]=useCart();
   const [product,setProduct]=useState();
   const [similarproduct,setSimilarproduct]=useState([]);
   const params=useParams();
   const getproductdetail=async()=>{
    try{
        const {data}=await axios.get(`/product/getsingle-product/${params?.slug}`);
        setProduct(data?.product);
        getsimilarproduct(data?.product._id,data?.product.category._id);
    }catch(error){
        console.log("error");
    }
   }
   const getsimilarproduct=async(pid,cid)=>{
    try{
      console.log({pid,cid});
      const {data}=await axios.get(`/product/similarproduct/${pid}/${cid}`);
      setSimilarproduct(data?.products);
      console.log(similarproduct);
    }catch(error){
      console.log("error");
    }
  } 
   useEffect(()=>{
    if(params?.slug) getproductdetail();
   },[params?.slug])
  
  return (
    <Layout title={`product-detail`}>
      {product && <div className="row container product-details">
        <div className="col-md-6 ">
          <img
            src={`/product/getproduct-photo/${product._id}`}
            className="card-img-top"
            style={{maxWidth:"400px",maxHeight:"400px",
                            minHeight: "400px",overflow:"hidden", marginLeft:"50px"}}
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :{product?.price}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1" onClick={()=> {setCart([...cart,product]);
                      toast.success("added to cart")}}>ADD TO CART</button>
        </div>
      </div>}
      <hr/>
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {similarproduct.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
         {similarproduct?.map((c) => (
                <div className="card m-2" style={{ width: "18rem" }} key={c.id}>
                <img
                   src={`/product/getproduct-photo/${c._id}`}
                  className="card-img-top"
                  alt={c.name}
                />
                <div className="card-body">
                <h5 className="card-title">
                  {c.name}
                </h5>
                <p className="card-text">
                  {c.description}...
                </p>
                <p className="card-text">
                  $ {c.price}
                </p>
                <button className='btn btn-primary ms-1' onClick={()=> navigate(`/product/${c.slug}`)}>More detail</button>
                <button className='btn btn-secondary ms-1' onClick={()=> {setCart([...cart, c]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, c])
                        );
                        toast.success("Item Added to cart")}}>Add to card</button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </Layout>
  )
}

export default Productdetails;