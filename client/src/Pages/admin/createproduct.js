import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/adminmenu';
import axios from 'axios';
import toast from "react-hot-toast"
import {Select} from "antd"
import {useNavigate} from "react-router-dom"

const {Option} =Select;

const Createproduct = () => {
  const navigate=useNavigate();
  const [categories,setCategories]=useState([]);
  const [category, setCategory] =useState("");
  const [photo,setPhoto] =useState("");
  const [name,setName] =useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState("");
  const [quantity,setQuantity]=useState("");
  const [shipping,setShipping] =useState("");

  const getallcategory=async()=>{
    try{
      const {data}=await axios.get('http://localhost:8000/category/get-all-category');
      if(data?.success){
       setCategories(data?.category);
        // toast.success("successfully get categories");
      }else{
       toast.error("unable to get categories");
      }
    }catch(error){
      toast.error("Error in getting categories");
    }
 }

 const handleCreate=async(e)=>{
   e.preventDefault();
   try{
      const productData=new FormData(); 
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);


      const {data}= await axios.post("/product/create-product",productData);
      if(data?.success){
        toast.success("product created successfully");
        navigate("/dashboard/admin/products");
      }else{
        toast.error("unsuccessfull in create product");
      }
   }catch(error){
      toast.error("error in creating product");
   }
 }

 useEffect(()=>{
  getallcategory();
  // react-hooks/exhaustive-deps  
  },[])


  return (
    <Layout title={"create-product"}>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h1>create product</h1>
                <div className="m-1 w-75">
                  <Select className='form-select mb-3' size='large' showSearch bordered={false} placeholder="select a category" onChange={(value)=>{setCategory(value)}}>
                    {categories?.map((c)=>(
                      <Option key={c._id} value={c._id}>{c.name}</Option>
                    ))}
                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-outline-secondary com-md-12'>
                      {photo?photo.name:"Upload photo"}
                      <input  type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                    </label>
                  </div>
                  <div className='mb-3'>
                    {photo && (
                      <div className='text-center'>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product-photo"
                          height="200px"
                          className='img img-responsive'
                        />
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <input 
                      type="text"
                      value={name}
                      placeholder='enter product name'
                      className='form-control'
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <textarea
                      type="text"
                      value={description}
                      placeholder='write description'
                      className='form-control'
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <input
                      type="number"
                      value={price}
                      placeholder='Price of product in rupee'
                      className='form-control'
                      onChange={(e)=>setPrice(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <input
                      type="number"
                      value={quantity}
                      placeholder='Quantity'
                      className='form-control'
                      onChange={(e)=>setQuantity(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <Select 
                      bordered={false}
                      placeholder="Select Shipping "
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                  `<button className="btn btn-primary" onClick={handleCreate}>
                    CREATE PRODUCT
                  </button>`
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Createproduct;