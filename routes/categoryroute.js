import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
import { createcategory, updatecategory, getallcategory, getsinglecategory, deletecategory} from "../controllers/categorycontroller.js";
const router =express.Router();


// create-category
router.post("/create-category",requireSignIn,isAdmin,createcategory);

// update-category
router.put("/update-category/:id",requireSignIn,isAdmin,updatecategory);

// get-all-category
router.get("/get-all-category",getallcategory);

// get-single-category
router.get("/single-category/:slug",getsinglecategory);

// delete-category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deletecategory);


export default router;

