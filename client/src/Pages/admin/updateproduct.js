import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/adminmenu';
import axios from 'axios';
import toast from "react-hot-toast"
import {Select} from "antd"
import {useNavigate,useParams} from "react-router-dom"

const {Option} =Select;

const Updateproduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


  const getsingleproduct=async()=>{
    try{
        const {data} =await axios.get(`product/getsingle-product/${params.slug}`);
        if(data?.success){
          setName(data.product.name);
          setDescription(data.product.description);
          setCategory(data.product.category._id);
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setShipping(data.product.shipping);
          setId(data.product._id);
        }else{
          toast.error("unable to get product");
        }
    }catch(error){
       toast.error("Error in getting product")
    }
  }
  useEffect(()=>{
    getsingleproduct();
    //eslint-disable-next-line
  },[]);


  const getallcategory=async()=>{
    try{
      const {data}=await axios.get('/category/get-all-category');
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
  useEffect(()=>{
    getallcategory();
    //eslint-disable-next-line
  },[])

 const handleUpdate=async(e)=>{
   e.preventDefault();
   try{
      const productData=new FormData(); 
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      photo && productData.append("photo",photo);
      productData.append("category",category);


      const {data}= await axios.put(`/product/update-product/${id}`,productData);
      if(data?.success){
        toast.success("product updated successfully");
        navigate("/dashboard/admin/products");
      }else{
        toast.error("unsuccessfull in updating product");
      }
   }catch(error){
      toast.error("error in updating product");
   }
 }

 const handleDelete=async(e)=>{
    e.preventDefault();
    try{
       const {data}=await axios.delete(`/product/delete-product/${id}`);
       if(data?.success){
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
       }else{
        toast.error("unsuccessful deleted");
       }
    }catch(error){
       toast.error("error in deleting product");
    }
 }


  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h1>update product</h1>
                <div className="m-1 w-75">
                  <Select className='form-select mb-3' size='large' showSearch bordered={false} placeholder="select a category" onChange={(value)=>{setCategory(value)}} value={category}>
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
                    {photo ? (
                    <div className="text-center">
                        <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                        />
                    </div>
                    ) : (
                    <div className="text-center">
                        <img
                        src={`/product/getproduct-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
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
                      value={shipping?"Yes":"No"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                   <button className="btn btn-primary" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>`
                  </div>
                  <div className="mb-3">
                   <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
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

export default Updateproduct;