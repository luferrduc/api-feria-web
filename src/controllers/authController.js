import { pool } from "../db/database.js";
import { comparar } from "../helpers/handleBcrypt.js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookie } from "express-validator";

export const login = async (req, res) => {
  const { nombre_usuario, password } = req.body;
  const queryConsulta = `SELECT * from usuarios WHERE nombre_usuario = ?`;
  try {
    const [rows] = await pool.query(queryConsulta, [nombre_usuario]);
    if (rows.length <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const hashPassword = rows[0].password;
    // Comparar la contraseña que viene de front con la de la BD
    const comparedPass = await comparar(password, hashPassword);
    if (!comparedPass) return res.json({ message: "Contraseña no coincide" });

    const { id_usuario, id_rol, id_persona, imagen, email } = rows[0];
    // secret es la palabra secreta para el token. Reemplazar con una varaible de entorno ayuda a hacerla aún más secreta
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        id_usuario,
        password,
        nombre_usuario,
        id_rol,
        id_persona,
        imagen,
        email,
      },
      "secret"
    );
    // Serialización del token con una cookie
    const serialized = serialize("loginToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const logout = (req, res) => {
  const { loginToken } = req.cookies;
  if (!loginToken)
    return res.status(401).json({ error: "No hay un usuario autenticado" });

  try {
    jwt.verify(loginToken, "secret");
    const serialized = serialize("loginToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
