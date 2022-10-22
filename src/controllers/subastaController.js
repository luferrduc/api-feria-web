import { pool } from "../db/database.js";

export const getSubastas = async (req, res) => {
  const sqlQuery = `SELECT * FROM subasta_transporte`;
  try {
    const result = await pool.query(sqlQuery);
    res.json(result[0]);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getOneSubasta = async (req, res) => {
  const id_subasta = parseInt(req.params.subId);
  const sqlQuery = "SELECT * FROM subasta_transporte WHERE id_subasta = ?";
  try {
    const [rows] = await pool.query(sqlQuery, [id_subasta]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Subasta no encontrada`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addSubasta = async (req, res) => {
  const { ganador, fecha_ter, fecha_inicio, cargo, total, estado, id_venta } =
    req.body;

  console.log(req.body);

  try {
    if (
      ganador === "" ||
      fecha_ter === "" ||
      fecha_inicio === "" ||
      cargo === "" ||
      total === "" ||
      estado === "" ||
      id_venta === ""
    ) {
      throw new Error(
        "Algunos campos se encuentran vacios, por favor rellenarlos"
      );
    }

    const sqlQuery = `INSERT INTO subasta_transporte (ganador, fecha_ter, fecha_inicio, cargo, total, estado, id_venta) VALUES (?,?,?,?,?,?,?)`;
    const [rows] = await pool.query(sqlQuery, [
      ganador,
      fecha_ter,
      fecha_inicio,
      cargo,
      total,
      estado,
      id_venta,
    ]);
    res.json({
      id_subasta: rows.insertId,
      ganador,
      fecha_ter,
      fecha_inicio,
      cargo,
      total,
      estado,
      id_venta,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubasta = async (req, res) => {
  const id_subasta = req.params.subId;
  const sqlQuery = "DELETE FROM subasta_transporte WHERE id_subasta = ?";
  console.log(id_subasta);
  try {
    const [result] = await pool.query(sqlQuery, [id_subasta]);
    if (result.affectedRows < 0)
      return res.status(404).json({ message: `Subasta no encontrada` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubasta = async (req, res) => {
  const id_subasta = req.params.subId;
  const {ganador, fecha_ter, fecha_inicio, cargo, total, estado, id_venta, observaciones} = req.body;
  const sqlQuery = `UPDATE subasta_transporte SET ganador = ?, fecha_ter = ?, fecha_inicio = ?,
                    cargo = ?, total = ?, estado = ?, id_venta = ?, observaciones = ? WHERE id_subasta = ?`;
  console.log(req.body)
  try {
    const [result] = await pool.query(sqlQuery, [
      ganador,
      fecha_ter,
      fecha_inicio,
      cargo,
      total,
      estado,
      id_venta,
      observaciones,
      id_subasta
    ]);
    console.log(result)
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Subasta no encontrada" });
    const [rows] = await pool.query(
      "SELECT * FROM subasta_transporte WHERE id_subasta = ?",
      [id_subasta]
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
