import { Router } from "express";
import { addPerson, getPersons } from '../controllers/personsController.js'
const router = Router();

router
    .get("/persona/", getPersons)
    .post("/persona/", addPerson)

export default router;
