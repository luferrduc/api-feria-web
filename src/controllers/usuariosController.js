//const usuarioService = require("../services/usuarioService");

export const getAllUsuario = (req, res) => {
  //const allUsers = usuarioService.getAllUsuario;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("SELECT * FROM usuarios", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
};
export const getOneUsuario = (req, res) => { //trae el usuario segun su id
  //const user = usuarioService.getOneUsuario(req.params.userId);
  //res.send("Get one user");
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
};
/*
const createNewUsuario = (req, res) => {
  const createUser = usuarioService.createNewUsuario(req.params.userId);
  res.send("createNewUsuario");
};

const updateUsuario = (req, res) => {
  const updateUser = usuarioService.updateUsuario(req.params.userId);
  res.send("updateUsuario");
};

const deleteOneUsuario = (req, res) => {
  const deleteUser = usuarioService.deleteOneUsuario(req.params.userId);
  res.send("deleteOneUsuario");
}; 
module.exports = {
  getAllUsuario,
  getOneUsuario,
  createNewUsuario,
  updateUsuario,
  deleteOneUsuario,
};
*/
