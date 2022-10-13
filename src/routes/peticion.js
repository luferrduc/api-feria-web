import { Router } from "express";
import{
    addPeticion,
    getPeticiones,
    deletePeticion,
    updatePeticion,
    getOnePeticion,
} from "../controllers/peticionController.js";


const router = Router();

router
  .get("/", getPeticiones)  
  .get("/:petId", getOnePeticion)
  .post("/", addPeticion)
  .delete("/:petId", deletePeticion)
  .put("/:petId", updatePeticion)

export default router;  