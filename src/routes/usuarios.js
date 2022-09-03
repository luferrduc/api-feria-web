import { Router } from "express";
import { getAllUsuario, getOneUsuario} from "../controllers/usuariosController.js";
const router = Router();

router
.get("/usuarios/", getAllUsuario)
.get("/usuarios/:id", getOneUsuario)
/*.
  .post("/usuarios/id", usuariosController.createNewUsuario)
  .put("/usuarios/id", usuariosController.updateUsuario)
  .delete("/usuarios/id", usuariosController.deleteOneUsuario);*/

// CLIENTES EXTERNOS

// CLIENTES INTERNOS

export default router;
