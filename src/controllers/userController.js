//const usuarioService = require("../services/usuarioService");
export const getAllUsers = (req, res) => {
  //const allUsers = usuarioService.getAllUsuario;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      `select u.id_usuario, u.nombre_usuario, u.password,
      p.nombre, p.apellido_p, p.apellido_m, u.imagen,
      ru.descripcion as rol_usuario, p.rut, p.direccion, p.ciudad, p.ciudad 
      from usuarios u inner join persona p on u.id_persona = p.id_persona
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
      `select u.id_usuario, u.nombre_usuario, u.password,
      p.nombre, p.apellido_p, p.apellido_m, u.imagen,
      ru.descripcion as rol_usuario, p.rut, p.direccion, p.ciudad, p.ciudad 
      from usuarios u inner join persona p on u.id_persona = p.id_persona
      inner join rol_usuarios ru on ru.id_rol = u.id_rol where u.nombre_usuario = ?;
      `,
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.json(rows);
      }
    );
  });
};


// export const createNewUsuario = (req, res) => {
//   //const createUser = usuarioService.createNewUsuario(req.params.userId);
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     const shouldAbort = (err) => {
//       if (err) {
//         console.log("Error in transaction", err.stack);
//         conn.query("ROLLBACK", (err) => {
//           if (err) {
//             console.log("Error rolling back client", err.stack);
//           }
//         });
//       }
//       return !!err;
//     };

//     conn.query("BEGIN", (err) => {
//       if (shouldAbort(err)) return
//       const queryText =
//         'INSERT INTO persona (id_persona, nombre, apellido_p, rut, apellido_m, id_ciudad, direccion) VALUES ?'
//       conn.query(queryText, [req.body], (err) => {
//         if (shouldAbort(err)) return
//         const insertNewUser =
//           'INSERT INTO usuarios (id_usuario, password, nombre_usuario, id_rol, id_persona, imagen) VALUES ?'
//         conn.query(insertNewUser, [req.body], (err) => {
//           if (shouldAbort(err)) return
//           conn.query("COMMIT", (err) => {
//             if (err) {
//               console.log("ERROR COMMITING");
//             }
//           });
//         });
//       });
//     });
//   });
// };

/*
export const deleteOneUsuario = (req, res) => {
  //const deleteUser = usuarioService.deleteOneUsuario(req.params.userId);
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(`DELETEde FROM personas as p INNER JOIN usuarios AS u WHERE p.id_persona = u.id_persona && p.id_persona && p.id_persona = ?`, [req.paramas.id], (err, rows) =>{
      res.send('book deleted')
    })
  }) 
}; 
const updateUsuario = (req, res) => {
  const updateUser = usuarioService.updateUsuario(req.params.userId);
  res.send("updateUsuario");
};
      //"BEGIN;" +
      //"INSERT INTO persona (id_persona, nombre, apellido_p, rut, apellido_m, id_ciudad, direccion) VALUES (?);"
      //"INSERT INTO usuarios (id_usuario, password, nombre_usuario, id_rol, id_persona, imagen) VALUES(?);"
      //"COMMIT;",

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
