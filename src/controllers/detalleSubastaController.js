import { pool } from "../db/database.js";

export const getDetalleSubastasBySubastaID = async (req, res) => {
  const sqlQuery = "SELECT * FROM detalle_subasta WHERE id_subasta = ?";
  const id_subasta = parseInt(req.params.subId);

  try {
    const rows = await pool.query(sqlQuery, [id_subasta]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Detalles de subasta no encontrados`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetalleSubastasByTransporteID = async (req, res) => {
  const sqlQuery = "SELECT * FROM detalle_subasta WHERE id_transporte = ?";
  const id_transporte = parseInt(req.params.transId);

  try {
    const rows = await pool.query(sqlQuery, [id_transporte]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Detalles de subasta no encontrados`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetalleSubastasBySubTransID = async (req, res) => {
  const sqlQuery =
    "SELECT * FROM detalle_subasta WHERE id_transporte = ? and id_subasta = ?";
  const id_transporte = req.params.transId;
  const id_subasta = req.params.subId;

  try {
    const [rows] = await pool.query(sqlQuery, [id_transporte, id_subasta]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Detalles de subasta no encontrados`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addDetalleSubasta = async (req, res) => {
  const { id_transporte, id_subasta, cargo, precio, nombre } = req.body;
  try {
    if (
      id_subasta === "" ||
      id_transporte === "" ||
      precio === "" ||
      nombre === "" ||
      cargo === ""
    ) {
      throw new Error(
        "Algunos campos se encuentran vacios"
      );
    }

    const [rows] = await pool.query(`INSERT INTO detalle_subasta SET ?`, [
      req.body,
    ]);
    res.json({
      id_subasta,
      id_transporte,
      precio,
      cargo,
      nombre,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDetalleSubasta = (req, res) => {};

export const deleteDetalleSubasta = (req, res) => {};
