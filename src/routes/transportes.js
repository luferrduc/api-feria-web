import { Router } from "express";
import{
    addTransporte,
    getTransportes,
    deleteTransporte,
    updateTransporte,
    getOneTransporte,
} from "../controllers/transporteController.js";

const router = Router();


router
   .get("/", getTransportes)
   .get("/:traId", getOneTransporte)
   .post("/", addTransporte)
   .delete("/:traId", deleteTransporte)
   .put("/:traId", updateTransporte)

export default router; 