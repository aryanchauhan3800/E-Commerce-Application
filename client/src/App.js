import './App.css';
import Homepage from "./Pages/homepage"
import About from "./Pages/about"
import Contact from "./Pages/contact"
import Pagenotfound from "./Pages/pagenotfound"
import Policy from "./Pages/policy"
import Login from "./Pages/auth/login"
import Register from "./Pages/auth/register"
import Dashboard from './Pages/user/dashboard';
import {Routes,Route} from "react-router-dom"
import PrivateRoute from './components/routes/private';
import Adminroute from "./components/routes/adminroute"
import Admindashboard from './Pages/admin/admindashboard';
import Createcategory from './Pages/admin/createcategory';
import Createproduct from './Pages/admin/createproduct';
import Users from './Pages/admin/users';
import Profile from './Pages/user/profile';
import Order from "./Pages/user/orders"
import Product from './Pages/admin/product';
import Updateproduct from './Pages/admin/updateproduct';
import Search from './Pages/search';
import Productdetails from "./Pages/productdetails"
import Category from './Pages/category';
import Cartpage from './Pages/cartpage';
import Adminorders from './Pages/admin/adminorders';
import Offerpage from './Pages/admin/offerpage';

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/product/:slug" element={<Productdetails/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/profile" element={<Profile/>}/>
        <Route path="user/orders" element={<Order/>}/>
      </Route>  
      <Route path="/dashboard" element={<Adminroute/>}>
        <Route path="admin" element={<Admindashboard/>}/>
        <Route path="admin/orders" element={<Adminorders/>}/>
        <Route path="admin/offers" element={<Offerpage/>}/>
        <Route path="admin/products" element={<Product/>}/>
        <Route path="admin/product/:slug" element={<Updateproduct/>}/>
        <Route path="admin/create-category" element={<Createcategory/>}/>
        <Route path="admin/create-product" element={<Createproduct/>}/>
        <Route path="admin/users" element={<Users/>}/>
      </Route>  
      <Route path="/category" element={<Category/>}/>
      <Route path="/cart" element={<Cartpage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<Pagenotfound/>}/>
     </Routes>
    </>
  );
}

export default App;
