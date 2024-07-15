import express from "express";
const router =express.Router();
import {registeruser,loginuser,testtoken, updateprofile, getuserorders, getalluserorders, changeorderstatus, getalluser} from "../controllers/authcontroller.js"
import {isAdmin, requireSignIn} from "../middleware/authmiddleware.js"



// register
router.post("/register",registeruser);

// login
router.post("/login",loginuser);

router.get("/getalluser",requireSignIn,isAdmin,getalluser);

// test
router.get("/test",requireSignIn,isAdmin,testtoken);

// autorisation
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

router.put("/update-profile/:id",updateprofile);

router.get("/user-order",requireSignIn,getuserorders);

router.get("/alluser-order",requireSignIn,isAdmin,getalluserorders);

router.put("/changestatus/:orderId",requireSignIn,isAdmin,changeorderstatus);

export default router;