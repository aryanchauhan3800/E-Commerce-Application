import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout/layout"
import {useAuth} from "../context/auth"
import {Checkbox, Radio} from "antd"
import axios from "axios";
import {toast} from "react-hot-toast" 
import {Prices} from "../components/price"
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import env from "react-dotenv";
// import banner from "../images/banner.jpeg"
import "../styles/homepage.css"


const Homepage = () => {
  const navigate=useNavigate();
  const [offerloading ,setOfferloading]=useState(true);
  const [banner,setBanner]=useState();
  const [count,setCount]=useState(0);
  const [auth,setAuth]=useAuth();
  const [cart,setCart]=useCart();
  const [categories,setCategories]=useState([]);
  const [products,setProducts]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const [offer,setOffer]=useState([]);


  const getallproducts = async () => {
    try {
      const { data } = await axios.get(
        `/product/productlist/${1}`
      );
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error("unsuccessfully in getting all products");
      }
    } catch (error) {
      toast.error("error in getting products");
    }
  };

  const productlist=async()=>{
    try{
       setLoading(true);
       const {data}=await axios.get(`/product/productlist/${page}`);
       setLoading(false);
       setProducts([...products,...data?.products]);
    }catch(error){
      toast.error("error in getting list")
    }
  }

  const similarproductlist=async()=>{
    try{
      setLoading(true);
      const {data}=await axios.get(`/product/similarproductlist/${page}`,{
        checked,radio
      })
       setLoading(false);
       setProducts([...products,...data?.products]);
     }catch(error){
      toast.error("error in getting list")
     }
  }

  useEffect(()=>{
    if(page===1) return;
    productlist();
  },[page])


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
 const totalength=async()=>{
  try{
    const {data}=await axios.get("/product/product-count");
    setTotal(data.totallength);
  }catch(error){
    toast.error("error in getting total len");
  }
 }
 useEffect(() => {
  getallcategory();
  totalength();
}, []);

 const filterproduct=async()=>{
  try{
    const {data}=await axios.post("/product/filterproduct",{checked,radio});
    setProducts(data.products);
  }catch(error){
    console.log(error);
  }
 }
 useEffect(() => {
    if (!checked.length && !radio.length){
      setPage(1);
      setProducts([]);
      getallproducts();
    //eslint-disable-next-line
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length){
      filterproduct();
      setPage(total);
    } 
  }, [checked, radio]);

 const handleFilter=(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
 }

 const getalloffer=async()=>{
    try{  
      const {data}=await axios.get("/offer/getalloffers");
      setOffer(data?.offers);
      
    }catch(error){
      console.log(error);
      toast.error("error in getting offers");
    }
 }
 useEffect(()=>{
  setOfferloading(true);
   getalloffer();
 },[])

 
 let size=0;
 useEffect(()=>{
   size=offer.length;
   if(offer.length===0) return ;
   const interval=setInterval(()=>{
     setBanner(`/offer/getofferphoto/${offer[count]._id}`);
     setOfferloading(false);
     setCount((count+1)%size);
    },4000);
    return ()=> clearInterval(interval);
  },[banner,[]]);
  
  return (
    <Layout title={"All product - best offers"}>
      {
        offerloading?(
          <div className="loader-container mt-3 mb-3">
      	       <div className="spinner"></div>
            </div>
        ):(
          <div style={{height:"60vh"}}>
              <img
                src={banner}
                className="banner-img"
                alt="bannerimage"
                width="100%"
                height="100%"
              />
          </div>
        )
      }
        <div className="container-fluid row mt -3 home-page">
          <div className='col-md-3 filters'>
             <h3 className='text-center mt-5'>
              Fliter By category
             </h3>
             <div className='d-flex flex-column'>
               {categories?.map((c)=>(
                <Checkbox 
                 key={c._id}
                 onChange={(e)=>handleFilter(e.target.checked,c._id)}
                >
                  {c.name}
                </Checkbox>
               ))}
             </div>
             <h4 className="text-center mt-4" style={{color:"black"}}>Filter By Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </button>
              </div>
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All products</h1>
            <div className='d-flex flex-wrap' style={{justifyContent:'center'}}>
            {products?.map((c) => (
                  <div className="card m-2" style={{ width: "18rem" }} key={c._id}>
                    <img
                      src={`/product/getproduct-photo/${c._id}`}
                      className="card-img-top"
                      alt={c.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {c.name}
                      </h5>
                      <p className="card-text">
                        {c.description}...
                      </p>
                      <p className="card-text">
                        $ {c.price}
                      </p>
                      <button className='btn btn-primary ms-1' onClick={()=> navigate(`/product/${c.slug}`)}>More detail</button>
                      <button className='btn btn-secondary ms-1' onClick={()=> {setCart([...cart, c]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, c])
                        );
                        toast.success("Item Added to cart");
                      }}>Add to card</button>
                    </div>
                  </div>
            ))}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload/>
                  </>
                )}
              </button>
            )}
          </div>
          </div>
        </div>
    </Layout>
  )
}

export default Homepage;