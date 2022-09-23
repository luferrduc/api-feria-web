import { json } from "express";
import { validationResult } from "express-validator";
import { pool } from "../db/database.js";

// export const getAllUsers = (req, res) => {
//   //const allUsers = usuarioService.getAllUsuario;
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query(
//       `select u.id_usuario, u.nombre_usuario, u.password,
//       p.nombre, p.apellido_p, p.apellido_m, u.imagen,
//       ru.descripcion as rol_usuario, p.num_identificador, p.direccion, p.ciudad, p.ciudad, u.email
//       from usuarios u inner join persona p on u.id_persona = p.id_persona
//       inner join rol_usuarios ru on ru.id_rol = u.id_rol
//       `,
//       (err, rows) => {
//         if (err) return res.send(err);
//         res.json(rows);
//       }
//     );
//   });
// };

export const getAllUsers = async (req, res) => {
  const sqlQuery = `select u.id_usuario, u.nombre_usuario, u.password,
                    p.nombre, p.apellido_p, p.apellido_m, u.imagen, 
                    ru.descripcion as rol_usuario, p.num_identificador, p.direccion, p.ciudad, p.ciudad, u.email
                    from usuarios u inner join persona p on u.id_persona = p.id_persona
                    inner join rol_usuarios ru on ru.id_rol = u.id_rol`;
  const [result] = await pool.query(sqlQuery);
  res.json(result);
};

// export const getOneUser = (req, res) => {
//   //trae el usuario segun su id
//   //const user = usuarioService.getOneUsuario(req.params.userId);
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query(
//       `select u.id_usuario, u.nombre_usuario, u.password,
//       p.nombre, p.apellido_p, p.apellido_m, u.imagen,
//       ru.descripcion as rol_usuario, p.num_identificador, p.direccion, p.ciudad, p.ciudad, u.email
//       from usuarios u inner join persona p on u.id_persona = p.id_persona
//       inner join rol_usuarios ru on ru.id_rol = u.id_rol where u.nombre_usuario = ?;
//       `,
//       [req.params.userName],
//       (err, rows) => {
//         if (err) return res.send(err);
//         res.json(rows);
//       }
//     );
//   });
// };

export const getOneUser = async (req, res) => {
  const nombre_usuario = req.params.userName;
  console.log(nombre_usuario);
  const sqlQuery = `select u.id_usuario, u.nombre_usuario, u.password,
         p.nombre, p.apellido_p, p.apellido_m, u.imagen,
         ru.descripcion as rol_usuario, p.num_identificador, p.direccion, p.ciudad, p.ciudad, u.email
         from usuarios u inner join persona p on u.id_persona = p.id_persona
         inner join rol_usuarios ru on ru.id_rol = u.id_rol where u.nombre_usuario = ?;`;
  try {
    const [rows] = await pool.query(sqlQuery, [nombre_usuario]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `No se ha encontrado un usuario con el nombre ${nombre_usuario}`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// export const addUser = (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ errors: errors.array() });
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query("INSERT INTO usuarios set ?", [req.body], (err, rows) => {
//       if (err) return res.send(err);
//       res.send("Usuario registrado");
//     });
//   });
// };

export const addUser = async (req, res) => {
  const { password, nombre_usuario, id_rol, id_persona, imagen, email } =
    req.body;

  try {
    if (
      password === "" ||
      nombre_usuario === "" ||
      id_rol === "" ||
      id_persona === "" ||
      email === ""
    ) {
      throw new Error("Alguno de los campos se encuentra vacío");
    }

    const sqlQuery = `INSERT INTO usuarios (password, nombre_usuario, id_rol, id_persona, imagen, email) VALUES (?,?,?,?,?,?)`;
    const [rows] = await pool.query(sqlQuery, [
      password,
      nombre_usuario,
      id_rol,
      id_persona,
      imagen,
      email,
    ]);
    res.json({
      id_usuario: rows.insertId,
      nombre_usuario,
      password,
      id_rol,
      id_persona,
      imagen,
      email,
    });
  } catch (error) {}
};

// export const deleteUser = (req, res) => {
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query(
//       "DELETE FROM usuarios WHERE nombre_usuario = ?",
//       [req.params.userName],
//       (err, rows) => {
//         if (err) return res.send(err);
//         res.send("Usuario eliminado");
//       }
//     );
//   });
// };

export const deleteUser = async (req, res) => {
  const nombre_usuario = req.params.userName;
  const sqlQuery = `DELETE FROM usuarios WHERE nombre_usuario = ?`;
  try {
    const [result] = await pool.query(sqlQuery, nombre_usuario);
    if (result.affectedRows < 0)
      return res.status(404).json({ message: `Empleado no encontrado` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const updateUser = (req, res) => {
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query(
//       "UPDATE usuarios SET ? WHERE nombre_usuario = ?",
//       [req.body, req.params.userName],
//       (err, rows) => {
//         if (err) return res.send(err);
//         res.send("Usuario actualizado!");
//       }
//     );
//   });
// };

// Estaba pensando que si podemos usar los ID para hacer todas las operaciones, ya que
// al final se sacan de una lista, no es necesario que el ADMIN se sepa los ID

export const updateUser = async (req, res) => {
  const nombre_usuario = req.params.userName;
  const { password, id_rol, imagen, email } = req.body;
  const sqlQuery = `UPDATE usuarios SET nombre_usuario = ?, imagen = ?, password = ?,
                     email = ?, id_rol = ? WHERE nombre_usuario = ?`;

  try {
    const [result] = await pool.query(sqlQuery, [
      nombre_usuario,
      imagen,
      password,
      email,
      id_rol,
      nombre_usuario,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      nombre_usuario
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// export const getUserRol = (req, res) => {
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query(`SELECT * FROM rol_usuarios`, (err, rows) => {
//       if (err) return res.send(err);
//       res.send(rows);
//     });
//   });
// };

export const getUserRol = async (req, res) => {
  const sqlQuery = "SELECT * FROM rol_usuarios";
  try {
    const [result] = await pool.query(sqlQuery);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
