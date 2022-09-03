import { Router } from "express";
//import { getAllUsuario } from "../controllers/usuariosController";
//const usuariosController = require("../controllers/usuariosControllersuariosController");
const router = Router();

router.get("/usuarios/", (req, res) => {
  //const allUsers = usuarioService.getAllUsuario;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("SELECT * FROM usuarios", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});
/*.get("/usuarios/id", usuariosController.getOneUsuario)
  .post("/usuarios/id", usuariosController.createNewUsuario)
  .put("/usuarios/id", usuariosController.updateUsuario)
  .delete("/usuarios/id", usuariosController.deleteOneUsuario);*/

// CLIENTES EXTERNOS

// CLIENTES INTERNOS

export default router;
