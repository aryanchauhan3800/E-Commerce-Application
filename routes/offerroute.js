import express from "express";
import { createoffer, deleteoffer, getalloffers, getofferimage } from "../controllers/offercontroller.js";
import { isAdmin,requireSignIn } from "../middleware/authmiddleware.js";
const router =express.Router();
import formidable from "express-formidable"; 

router.post("/create-offer",requireSignIn,isAdmin,formidable(),createoffer);

router.delete("/delete-offer/:Id",requireSignIn,isAdmin,deleteoffer);

router.get("/getalloffers",getalloffers);

router.get("/getofferphoto/:Id",getofferimage);

export default router;