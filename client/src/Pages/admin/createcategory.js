import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout';
import AdminMenu from '../../components/Layout/adminmenu';
import axios from 'axios';
import toast from "react-hot-toast"
import CategoryForm from '../../components/form/categoryform';
import {Modal} from "antd"

const Createcategory = () => { 
  const [categories,setCategories]=useState([]);
  const [name,setName]=useState("");
  const [visible, setVisible]=useState(false);
  const [selected,setSelected]=useState(null);
  const [updatename,setUpdatename]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.post("/category/create-category",{name});
      if(data?.success){
        toast.success("successfully created category");
        setName("");
        getallcategory();
      }else{
        toast.error("unable to create category");
      }
    }catch(error){
      toast.error("error in creating category");
    }
  }

  const getallcategory=async()=>{
     try{
       const {data}=await axios.get('/category/get-all-category');
       if(data?.success){
        setCategories(data?.category);
        //  toast.success("successfully get categories");
       }else{
        toast.error("unable to get categories");
       }
     }catch(error){
       toast.error("Error in getting categories");
     }
  }

  useEffect(()=>{
    getallcategory();
    // react-hooks/exhaustive-deps  
  },[])
  
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.put(`/category/update-category/${selected._id}`,{
        name:updatename,
      })
      if(data?.success){
        toast.success("successfully update category");
        setSelected(null);
        setUpdatename("");
        setVisible(false);
        getallcategory();
      }else{
        toast.error("unsuccessfull in updating category");
      }
    }catch(error){
      toast.error("Error in updating category");
    }
  }
  const handleDelete=async(id)=>{
    try{
       const {data} =await axios.delete(`/category/delete-category/${id}`);
       if(data?.success){
        toast.success("successfully deleted category");
        getallcategory();
       }else{
        toast.error("unsuccessfull delete category");
       }
    }catch(error){
      toast.error("Error in deleting category");
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
              <div className='card w-75 p-3'>
                <h1>category</h1>
                <div>
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c)=>{
                     return (<>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className='btn btn-primary ms-3' onClick={()=>{setVisible(true); setSelected(c); setUpdatename(c.name)}}>Edit</button>
                            <button className='btn btn-primary ms-3' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                          </td>
                        </tr>
                      </>)
                    })}
                  </tbody>
                </table>
              </div>
              <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}>
                <CategoryForm
                  setValue={setUpdatename}
                  value={updatename}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Createcategory;