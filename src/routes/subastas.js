import { Router } from "express";
import{
    addSubasta,
    getSubastas,
    deleteSubasta,
    updateSubasta,
    getOneSubasta,
} from "../controllers/subastaController.js";

const router = Router();

router
   .get("/", getSubastas)
   .get("/:subId", getOneSubasta)
   .post("/", addSubasta)
   .delete("/:subId", deleteSubasta)
   .put("/:subId", updateSubasta)

export default router;   