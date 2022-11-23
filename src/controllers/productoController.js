import { pool } from "../db/database.js";

export const getProducts = async (req, res) => {
  const sqlQuery = `SELECT * FROM productos`;
  try {
    const result = await pool.query(sqlQuery);
    res.json(result[0]);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getOneProduct = async (req, res) => {
  const id_producto = req.params.proId;
  const sqlQuery = `SELECT * FROM productos WHERE id_producto = ?`;
  try {
    const [rows] = await pool.query(sqlQuery, [id_producto]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Producto no encontrado`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { nombre, precio, observaciones, id_calidad, imagen, id_usuario, fecha_limite, cantidad, saldo } =
    req.body;

  try {
    if (
      nombre === "" ||
      precio === "" ||
      id_calidad === "" ||
      id_usuario === "" ||
      fecha_limite === "" ||
      cantidad === ""
    )
      throw new Error(
        "Algunos campos se encuentran vacios, por favor rellenarlos"
      );

    const [rows] = await pool.query(`INSERT INTO productos set ?`, [req.body]);
    res.json({
      id_producto: rows.insertId,
      nombre,
      precio,
      observaciones,
      id_calidad,
      imagen,
      fecha_limite,
      cantidad,
      saldo,
      id_usuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id_producto = parseInt(req.params.proId);
  const sqlQuery = "DELETE FROM productos WHERE id_producto = ?";
  try {
    const [result] = await pool.query(sqlQuery, [id_producto]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: `Producto no encontrado` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const id_producto = req.params.proId;
  const { nombre, precio, observaciones, id_calidad, imagen, saldo, fecha_limite, cantidad } = req.body;
  const sqlQuery = `UPDATE productos SET nombre = ?, precio = ?,
                      observaciones = ?, id_calidad = ?, imagen = ?, saldo = ?, fecha_limite = ?, cantidad = ? 
                                WHERE id_producto = ?`;
  try {
    const [result] = await pool.query(sqlQuery, [
      nombre,
      precio,
      observaciones,
      id_calidad,
      imagen,
      saldo,
      fecha_limite,
      cantidad,
      id_producto,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id_producto]
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
