import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';
import "../styles/singlecategory.css"



const Singlecategory = ({id,name}) => {
    const navigate=useNavigate();
    const [products,setProducts]=useState();
    const [loading,setLoading]=useState(false);
    const [style, setStyle] = useState({display: 'none',position:"absoulte"})
    let box = document.querySelector('.product-container');

    const btnpressprev = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
        console.log(width)
    }

    const btnpressnext = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
        console.log(width)
    }

    const getallproduct=async()=>{
        try{
            setLoading(true);
            const {data}= await axios.get(`/product/category-product/${id}`);
            setLoading(false); 
            setProducts(data?.products);
        }catch(error){
            toast.error("error in getting list");
        }
    }
    useEffect(()=>{
        getallproduct();
    },[])
  return (
    <>
     <h3 style={{paddingLeft:"30px"}}>{name}</h3>
     {
        loading?(
            <div className="loader-container">
      	       <div className="spinner"></div>
            </div>
        ):(
        <div className="product-carousel">
          <button className="pre-btn"  onClick={btnpressprev}><p>&lt;</p></button>
          <button className="next-btn" onClick={btnpressnext}><p>&gt;</p></button>
          <div className="product-container">
            {products?.map((c) => (
                <div className="mycard" key={c._id}>
                    <img
                    onClick={()=> navigate(`/product/${c.slug}`)}
                    src={`/product/getproduct-photo/${c._id}`}
                    className="card-img-top"
                    style={{maxWidth:"200px",maxHeight:"200px",
                        minHeight: "200px",overflow:"hidden"}}
                    alt={c.name}
                    />
                        <div className="card-text" onClick={()=> navigate(`/product/${c.slug}`)} style={{color:"blue",cursor:"pointer"}}>
                            <div >{c.name}{c.description.substring(0,20)}</div>
                            <div>$ {c.price}</div>
                        </div>
                </div>
            ))}
        </div>
    </div>
    )}
    </>
  )
}

export default Singlecategory;



