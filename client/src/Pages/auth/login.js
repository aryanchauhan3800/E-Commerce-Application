import React,{useState} from 'react'
import axios from "axios"
import {useNavigate, useLocation } from "react-router-dom";
import "../../styles/authstyles.css";
import toast from 'react-hot-toast'
import Layout from "../../components/Layout/layout"
import { useAuth } from '../../context/auth';

const Login = () => {
  const navigate=useNavigate();
  const [auth,setAuth]=useAuth();
  const location = useLocation();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
       const res =await axios.post(`/authroute/login`,
        {email,password}
       )
       
       if(res.data.success){
        toast.success(res.data.message);
        setAuth({...auth,user:res.data.user,token:res.data.token});
        localStorage.setItem("auth",JSON.stringify(res.data));
        navigate(location.state || "/");
       }else{
        toast.error(res.data.message);
       }
    }catch(error){
      toast.error("unable to register");
    }
  }

  return (
    <Layout title={"Login"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">Login page</h4>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;