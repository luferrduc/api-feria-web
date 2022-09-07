import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
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
  


// CLIENTES EXTERNOS

// CLIENTES INTERNOS

export default router;
