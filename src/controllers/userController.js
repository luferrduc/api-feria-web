//const usuarioService = require("../services/usuarioService");

export const getAllUsers = (req, res) => {
  //const allUsers = usuarioService.getAllUsuario;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `select u.id_usuario, u.nombre_usuario, u.password, p.nombre, p.apellido_p, p.apellido_m, 
      p.rut, p.direccion, u.imagen, c.desc as ciudad, pa.desc as pais,
      ru.desc as rol_usuario
      from usuarios u 
      inner join persona p on u.id_persona = p.id_persona
      inner join ciudad c on c.id_ciudad = p.id_ciudad
      inner join pais pa on pa.id_pais = c.id_pais
      inner join rol_usuarios ru on ru.id_rol = u.id_rol
      `,
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
};
export const getOneUser = (req, res) => {
  //trae el usuario segun su id
  //const user = usuarioService.getOneUsuario(req.params.userId);
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `select u.nombre_usuario, u.password, p.nombre, p.apellido_p, p.apellido_m, 
      p.rut, p.direccion, u.imagen, c.desc as ciudad, pa.desc as pais,
      ru.desc as rol_usuario
      from usuarios u 
      inner join persona p on u.id_persona = p.id_persona
      inner join ciudad c on c.id_ciudad = p.id_ciudad
      inner join pais pa on pa.id_pais = c.id_pais
      inner join rol_usuarios ru on ru.id_rol = u.id_rol
      where u.id_persona = ?`,
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
