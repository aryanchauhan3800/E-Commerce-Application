import React from 'react'
import Layout from "../../components/Layout/layout.js"
import Usermenu from '../../components/Layout/usermenu.js'
import { useAuth } from '../../context/auth.js'

const Dashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <Usermenu/>
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

export default Dashboard