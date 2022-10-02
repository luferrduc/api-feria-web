import { Router } from "express";
import{
    addContrato,
    getContratos,
    deleteContrato,
    updateContrato,
    getOneContrato,
} from "../controllers/contratoController.js";


const router = Router();

router
  .get("/", getContratos)  
  .get("/:conId", getOneContrato)
  .post("/", addContrato)
  .delete("/:conId", deleteContrato)
  .put("/:conId", updateContrato)

export default router;  