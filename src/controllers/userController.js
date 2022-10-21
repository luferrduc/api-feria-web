import { validationResult } from "express-validator";
import { pool } from "../db/database.js";
import { encriptar } from "../helpers/handleBcrypt.js";

export const getAllUsers = async (req, res) => {
  const sqlQuery = `select u.id_usuario, u.nombre_usuario, u.password,
                    p.nombre, p.apellido_p, p.apellido_m, u.imagen, 
                    ru.descripcion as rol_usuario, p.num_identificador, p.direccion, p.ciudad, p.ciudad, u.email
                    from usuarios u inner join persona p on u.id_persona = p.id_persona
                    inner join rol_usuarios ru on ru.id_rol = u.id_rol`;
  const [result] = await pool.query(sqlQuery);
  res.json(result);
};

export const getOneUser = async (req, res) => {
  const nombre_usuario = req.params.userName;
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

export const addUser = async (req, res) => {
  const { password, nombre_usuario, id_rol, id_persona, imagen, email } =
    req.body;
  const passwordHash = await encriptar(password);
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
      passwordHash,
      nombre_usuario,
      id_rol,
      id_persona,
      imagen,
      email,
    ]);
    res.json({
      id_usuario: rows.insertId,
      nombre_usuario,
      password: passwordHash,
      id_rol,
      id_persona,
      imagen,
      email,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const nombre_usuario = req.params.userName;
  const sqlQuery = `DELETE FROM usuarios WHERE nombre_usuario = ?`;
  try {
    const [result] = await pool.query(sqlQuery, [nombre_usuario]);
    if (result.affectedRows < 0)
      return res.status(404).json({ message: `Empleado no encontrado` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const nombre_usuario = req.params.userName;
  const { password, id_rol, imagen, email } = req.body;
  const passwordHash = await encriptar(password);

  const sqlQuery = `UPDATE usuarios SET nombre_usuario = ?, imagen = ?, password = ?,
                     email = ?, id_rol = ? WHERE nombre_usuario = ?`;

  try {
    const [result] = await pool.query(sqlQuery, [
      nombre_usuario,
      imagen,
      passwordHash,
      email,
      id_rol,
      nombre_usuario,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      [nombre_usuario]
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserRol = async (req, res) => {
  const sqlQuery = "SELECT * FROM rol_usuarios";
  try {
    const [result] = await pool.query(sqlQuery);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
