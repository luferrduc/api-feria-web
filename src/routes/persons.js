import { Router } from "express";
import {
  addPerson,
  getPersons,
  deletePerson,
  updatePerson,
  getOnePerson,
} from "../controllers/personsController.js";
const router = Router();

router
  .get("/", getPersons)
  .get("/:numId", getOnePerson)
  .post("/", addPerson)
  .delete("/:numId", deletePerson)
  .put("/:numId", updatePerson);

export default router;
