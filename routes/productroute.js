import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
import { createproduct, getallproduct, getsingleproduct, getproductphoto, deleteproduct, updateproduct, filterproduct, productcount, productlist, searchproduct, similarproduct, categoryproduct, braintreetokencontroller, braintreepaymentcontroller, similarproductlist} from "../controllers/productcontroller.js";
import formidable from "express-formidable"; 
const router =express.Router();



router.post("/create-product",requireSignIn,isAdmin,formidable(),createproduct)

router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateproduct)

router.get("/all-product",getallproduct);

router.get("/getsingle-product/:slug",getsingleproduct);

router.get("/getproduct-photo/:pid",getproductphoto);

router.delete("/delete-product/:pid",requireSignIn,isAdmin,deleteproduct);

router.post("/filterproduct",filterproduct);

router.get("/product-count",productcount);

router.get("/similarproductlist/:page",similarproductlist);

router.get("/productlist/:page",productlist);

router.get("/search/:keyword",searchproduct);

router.get("/similarproduct/:pid/:cid",similarproduct);

router.get("/category-product/:cid",categoryproduct);


// payment
// token
router.get("/braintree/token",braintreetokencontroller);

router.post("/braintree/payment",requireSignIn,braintreepaymentcontroller);

export default router;