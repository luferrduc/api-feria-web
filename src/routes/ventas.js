import { Router } from "express";
import{
    addVenta,
    getVentas,
    deleteVenta,
    updateVenta,
    getOneVenta,
} from "../controllers/ventasController.js";

const router = Router();


router
   .get("/", getVentas)
   .get("/:venId", getOneVenta)
   .post("/", addVenta)
   .delete("/:venId", deleteVenta)
   .put("/:venId", updateVenta)

export default router;   