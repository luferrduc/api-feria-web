import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  addPerson,
  getPersons,
  addUser,
  deleteUser,
  updateUser
} from "../controllers/userController.js";
const router = Router();

router
  .get("/usuarios/", getAllUsers)
  .get("/usuarios/:userName", getOneUser)
  .post("/usuarios/", addUser)
  .delete("/usuarios/:userName", deleteUser)
  .patch("/usuarios/:userName", updateUser)
  
  .get("/persona/", getPersons)
  .post("/persona/", addPerson);

// CLIENTES EXTERNOS

// CLIENTES INTERNOS

export default router;
