import { Router } from "express";
import {
  addPerson,
  getPersons,
  deletePerson,
  updatePerson,
} from "../controllers/personsController.js";
const router = Router();

router
  .get("/persona/", getPersons)
  .post("/persona/", addPerson)
  .delete("/persona/:numId", deletePerson)
  .patch("/persona/:numId", updatePerson)

export default router;
