import { pool } from "../db/database.js";
import { comparar } from "../helpers/handleBcrypt.js";

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
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
