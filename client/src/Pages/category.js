import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout/layout"
import axios from "axios";
import { toast } from 'react-hot-toast';
import Singlecategory from '../components/singlecategory';



const Category = () => {
  const [categories,setCategories]=useState();
  
  const getallcategory=async()=>{
    try{
      const {data}=await axios.get('/category/get-all-category');
      if(data?.success){
       setCategories(data?.category);
      }else{
       toast.error("unable to get categories");
      }
    }catch(error){
      toast.error("Error in getting categories");
    }
 }
 useEffect(()=>{
    getallcategory();
 },[]);
  return (
    <Layout title={"categories"}>
      {categories && categories.map((c)=>(
         <Singlecategory key={c._id} id={c._id} name={c.name} />
      ))}
    </Layout>
  )
}

export default Category;