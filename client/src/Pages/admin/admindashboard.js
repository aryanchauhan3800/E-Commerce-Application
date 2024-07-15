import React from 'react'
import Layout from "../../components/Layout/layout.js"
import Adminmenu from "../../components/Layout/adminmenu.js"
import { useAuth } from '../../context/auth.js'

const Admindashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Admin dashboard"}>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <Adminmenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3>Name: {auth?.user?.name}</h3>
                <h3>Email: {auth?.user?.email}</h3>
                <h3>Contact: {auth?.user?.phonenumber}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Admindashboard;