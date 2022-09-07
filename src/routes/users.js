import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  addPerson,
  getPersons,
  addUser,
  deleteUser,
  updateUser,
  getUserRol
} from "../controllers/userController.js";
const router = Router();

router
  .get("/usuarios/", getAllUsers)
  .get("/usuarios/:userName", getOneUser)
  .post("/usuarios/", addUser)
  .delete("/usuarios/:userName", deleteUser)
  .patch("/usuarios/:userName", updateUser)
  .get("/rol_usuarios", getUserRol)
  
  .get("/persona/", getPersons)
  .post("/persona/", addPerson);

// CLIENTES EXTERNOS

// CLIENTES INTERNOS

export default router;
