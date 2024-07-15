import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/adminmenu';
import axios from 'axios';
import toast from "react-hot-toast"
import {Modal} from "antd"

const Offerpage = () => {
    const [offers,setOffers]=useState([]);
    const [photo,setPhoto]=useState();
    const getalloffers=async()=>{
        try{  
           const {data}=await axios.get("http://localhost:8000/offer/getalloffers");
           setOffers(data?.offers);
        }catch(error){
            console.log(error);
            toast.error("error in getting offers");
        }
    }

    useEffect(()=>{
       getalloffers();
    },[])


    const handleSubmit=async()=>{
        try{
            const offerdata=new FormData();
            offerdata.append("photo",photo);
          const {data}=await axios.post("/offer/create-offer",offerdata);
          if(data?.success){
             getalloffers();
             setPhoto();
             toast.success("successfully added offer");
          }
        }catch{
            toast.error("error in creating offer");
        }
    }
    const handleDelete=async(Id)=>{
        try{
          const {data}=await axios.delete(`/offer/delete-offer/${Id}`);
          
          if(data?.success){
            toast.success("successfully delete the offer");
            getalloffers();
          } 
        }catch(error){
            toast.error("Error in deleting the offer");
        }
    }
  return (
    <Layout title={"Create-category"}>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-9'>
        <div>
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
            <button className='btn btn-primary ml-2' onClick={handleSubmit}>Add offer</button>
            </div>
            </div>
            <div>
            {offers.map((c)=>(
                <>
                    <div className='card w-75 p-3 mt-2'>
                        <img
                            src={`/offer/getofferphoto/${c._id}`}
                            className="card-img-top"
                            alt="image"
                        />
                    </div>
                    <button className='btn btn-secondary mt-2' style={{height:"10%"}} onClick={()=>handleDelete(c._id)}>Delete</button>
                </>
            ))}  
            </div>
        </div>
      </div>
    </div>
</Layout>
  )
}

export default Offerpage