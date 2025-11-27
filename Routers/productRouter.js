import express from "express"
import { createProduct, getAllProducts, getProductById } from "../Controllers/productController.js";


const router = express.Router();


router.post("/create",createProduct)
router.get("/getdata",getAllProducts)
router.get("/getdata/:id",getProductById)



export default router;