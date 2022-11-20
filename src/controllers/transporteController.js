import { pool } from "../db/database.js";

export const getTransportes = async (req, res) => {
  const sqlQuery = `SELECT * FROM transportes`;
  try {
    const result = await pool.query(sqlQuery);
    res.json(result[0]);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getOneTransporte = async (req, res) => {
  const id_transporte = req.params.traId;
  const sqlQuery = `SELECT * FROM transportes WHERE id_transporte = ?`;
  try {
    const [rows] = await pool.query(sqlQuery, [id_transporte]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Transporte no encontrado`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTransporte = async (req, res) => {
  const { patente, tamano, capacidad_carga, refrigeracion, id_tipo, id_usuario } =
    req.body;

  try {
    if (
      patente === "" ||
      tamano === "" ||
      capacidad_carga === "" ||
      refrigeracion === "" ||
      id_tipo === "" ||
      id_usuario === ""
    )
      throw new Error(
        "Algunos campos se encuentran vacios, por favor rellenarlos"
      );

    const [rows] = await pool.query(`INSERT INTO transportes set ?`, [req.body]);
    res.json({
      id_transporte: rows.insertId,
      patente,
      tamano,
      capacidad_carga,
      refrigeracion,
      id_tipo,
      id_usuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransporte = async (req, res) => {
  const id_transporte = parseInt(req.params.traId);
  const sqlQuery = "DELETE FROM transportes WHERE id_transporte = ?";
  try {
    const [result] = await pool.query(sqlQuery, [id_transporte]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: `Transporte no encontrado` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTransporte = async (req, res) => {
  const id_transporte = req.params.traId;
  const { patente, tamano, capacidad_carga, refrigeracion, id_tipo, id_usuario } = req.body;
  const sqlQuery = `UPDATE transportes SET patente = ?, tamano = ?, capacidad_carga = ?,
                      refrigeracion = ?, id_tipo = ?, id_usuario = ? WHERE id_transporte = ?`;
  try {
    const [result] = await pool.query(sqlQuery, [
      patente,
      tamano,
      capacidad_carga,
      refrigeracion,
      id_tipo,
      id_usuario,
      id_transporte,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Transporte no encontrado" });
    const [rows] = await pool.query(
      "SELECT * FROM transportes WHERE id_transporte = ?",
      [id_transporte]
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};