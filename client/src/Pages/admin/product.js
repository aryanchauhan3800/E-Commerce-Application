import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/layout";
import AdminMenu from "../../components/Layout/adminmenu";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getallproducts = async () => {
    try {
      const { data } = await axios.get(
        "/product/all-product"
      );
      console.log(data);
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error("unsuccessfully in getting all products");
      }
    } catch (error) {
      toast.error("error in getting products");
    }
  };
  useEffect(() => {
    getallproducts();
  }, []);

  return (
    <Layout title={"All-product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Products list</h1>
            <div className="d-flex flex-wrap">
              {products?.map((c) => (
                <Link
                  key={c._id}
                  to={`http://localhost:3000/dashboard/admin/product/${c.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
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
                        {c.description}
                      </p>
                      <p className="card-text">
                        Price: {c.price}
                      </p>
                      <p className="card-text">
                      Quantity: {c.quantity}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
