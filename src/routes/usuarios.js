import { Router } from "express";

const usuariosController = require("../controllers/usuariosControllersuariosController");

const router = Router();

// PRODUCTORES

router
  .get("/usuarios/", usuariosController.getAllUsuario)
  .get("/usuarios/id", usuariosController.getOneUsuario)
  .post("/usuarios/id", usuariosController.createNewUsuario)
  .put("/usuarios/id", usuariosController.updateUsuario)
  .delete("/usuarios/id", usuariosController.deleteOneUsuario);

// CLIENTES EXTERNOS

// CLIENTES INTERNOS

export default router;
