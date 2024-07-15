import React from "react";
import {NavLink,Link} from "react-router-dom"
import logo from "../../images/logo.jpg";
import {useAuth} from "../../context/auth"
import { toast } from "react-hot-toast";
import Searchform from "../form/searchform";
import {useCart} from "../../context/cart"
import {Badge} from "antd"

const Header = () => {
  const [auth,setAuth] =useAuth();
  const [cart]=useCart();
  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth');
    toast.success("Logout successfully");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/ecommerce_store" className="navbar-brand">
              <img
              src={logo}
              alt=""
              style={{ width: "50px"}}
            />
              Ecommerce store
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Searchform/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page" >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link" aria-current="page" >
                  CATEGORY
                </NavLink>
              </li>
              {!auth.user?(
                <>    
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      REGISTER
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              ):(
                 <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.isAdmin===true?"admin":"user"}`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
               <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
