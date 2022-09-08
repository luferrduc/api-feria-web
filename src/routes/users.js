import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
  getUserRol,
} from "../controllers/userController.js";
import { body } from "express-validator";
const router = Router();

router
  .get("/", getAllUsers)
  .get("/:userName", getOneUser)
  .post(
    "/",
    [
      body("email", "El formato del email es incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    ],
    addUser
  )
  .delete("/:userName", deleteUser)
  .patch("/:userName", updateUser)
  .get("/rol_usuarios", getUserRol);


export default router;
