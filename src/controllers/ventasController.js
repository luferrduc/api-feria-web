import { pool } from "../db/database.js";

export const getVentas = async (req, res) => {
  const sqlQuery = `SELECT * FROM ventas`;
  try {
    const result = await pool.query(sqlQuery);
    res.json(result[0]);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getOneVenta = async (req, res) => {
  const id_venta = req.params.venId;
  const sqlQuery = `SELECT * FROM ventas WHERE id_venta = ?`;
  try {
    const [rows] = await pool.query(sqlQuery, [id_venta]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Venta no encontrada`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addVenta = async (req, res) => {
  const { id_venta, descripcion, total_venta, id_tipo_venta, id_usuario, fecha_venta, estado } =
    req.body;

  try {
    if (
      id_venta === "" ||
      descripcion === "" ||
      total_venta === "" ||
      id_tipo_venta === "" ||
      id_usuario === "" ||
      fecha_venta === "" ||
      estado === ""
    )
      throw new Error(
        "Algunos campos se encuentran vacios, por favor rellenarlos"
      );

    const [rows] = await pool.query(`INSERT INTO ventas set ?`, [req.body]);
    res.json({
      id: rows.insertId,
      id_venta,
      descripcion,
      total_venta,
      id_tipo_venta,
      id_usuario,
      fecha_venta,
      estado,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVenta = async (req, res) => {
  const id_venta = parseInt(req.params.venId);
  const sqlQuery = "DELETE FROM ventas WHERE id_venta = ?";
  try {
    const [result] = await pool.query(sqlQuery, [id_venta]);
    if (result.affectedRows < 0)
      return res.status(404).json({ message: `Venta no encontrada` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVenta = async (req, res) => {
  const id_venta = req.params.venId;
  const { descripcion, total_venta, id_tipo_venta, id_usuario, fecha_venta, estado } = req.body;
  const sqlQuery = `UPDATE ventas SET descripcion = ?, total_venta = ?, id_tipo_venta = ?,
                    id_usuario = ?, fecha_venta = ?, estado = ? WHERE id_venta = ?`;
  try {
    const [result] = await pool.query(sqlQuery, [
      descripcion,
      total_venta,
      id_tipo_venta,
      id_usuario,
      fecha_venta,
      estado,
      id_venta
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Venta no encontrada" });
    const [rows] = await pool.query(
      "SELECT * FROM ventas WHERE id_venta = ?",
      [id_venta]
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
