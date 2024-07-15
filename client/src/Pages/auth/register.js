import React, { useState } from "react";
import "../../styles/authstyles.css";
import Layout from "../../components/Layout/layout";
import axios from "axios"
import {useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'



const Register = () => {
  const navigate=useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phonenumber,setPhonenumber]=useState("");
  const [address,setAddress]=useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log({name,email,password,phonenumber,address});
    try{
       const res =await axios.post(`/authroute/register`,
        {name,email,password,phonenumber,address}
       )
       
       if(res.data.success){
        toast.success(res.data.message);
        console.log(res.data.user);
        navigate("/login");
       }else{
        toast.error(res.data.message);
       }
    }catch(error){
      toast.error("unable to register");
    }
  }

  return (
    <Layout title={"Create account"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">Register page</h4>
          <div className="mb-3">
            <input
              type="name"
              value={name}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password of minimum length 8"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="name"
              value={phonenumber}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your phone number"
              onChange={(e)=>setPhonenumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="name"
              value={address}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Address"
              onChange={(e)=>setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
