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
import { errorValidation } from "../middlewares/errorsValidation.js";

//
const router = Router();

router
  .get("/", getAllUsers)
  .get("/:userName", getOneUser)
  .get("/rol/rol_usuarios", getUserRol)
  .post(
    "/",
    [body("email", "El formato del email es incorrecto").trim().isEmail()],
    errorValidation,
    addUser
  )
  .delete("/:userName", deleteUser)
  .put(
    "/:userName",
    [body("email", "El formato del email es incorrecto").trim().isEmail()],
    updateUser
  );

export default router;
