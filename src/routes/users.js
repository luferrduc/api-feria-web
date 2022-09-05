import { Router } from "express";
import { getAllUsers, getOneUser} from "../controllers/userController.js";
const router = Router();

router
.get("/usuarios/", getAllUsers)
.get("/usuarios/:id", getOneUser)
//.delete("/usuarios/:id", deleteOneUsuario);
//.post("/usuarios/", createNewUsuario)
/*.
  estos faltan
  .post("/usuarios/id", usuariosController.createNewUsuario)
  .put("/usuarios/id", usuariosController.updateUsuario)
  .delete("/usuarios/id", usuariosController.deleteOneUsuario);*/

// CLIENTES EXTERNOS

// CLIENTES INTERNOS

export default router;
