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
  //res.send("Get all users");
};
/* const getOneUsuario = (req, res) => {
  const user = usuarioService.getOneUsuario(req.params.userId);
  res.send("Get one user");
};

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
