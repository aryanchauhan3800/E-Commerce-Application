import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout'
import AdminMenu from '../../components/Layout/adminmenu'
import axios from "axios"


const Users = () => {
  const [user,setUser]=useState([]);

  const getalluser=async()=>{
    try{
      const {data}=await axios.get("/authroute/getalluser");
      setUser(data?.users);
      console.log(user);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getalluser();
  },[])

  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
              <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Address</th>
                      <th scope="col">phonenumber</th>

                      {/* <th scope="col">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {user?.map((c)=>{
                     return (<>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td key={c._id}>{c.email}</td>
                          <td key={c._id}>{c.address}</td>
                          <td key={c._id}>{c.phonenumber}</td>
                        </tr>
                      </>)
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Users;