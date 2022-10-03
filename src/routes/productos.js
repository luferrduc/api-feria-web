import { Router } from "express";
import{
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getOneProduct,
} from "../controllers/productoController.js";


const router = Router();

router
  .get("/", getProducts)  
  .get("/:proId", getOneProduct)
  .post("/", addProduct)
  .delete("/:proId", deleteProduct)
  .put("/:proId", updateProduct)

export default router;  