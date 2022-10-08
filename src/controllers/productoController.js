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
  const { id_producto, nombre, precio, observaciones, id_calidad, imagen } =
    req.body;

  try {
    if (
      id_producto === "" ||
      nombre === "" ||
      precio === "" ||
      observaciones === "" ||
      id_calidad === "" ||
      imagen === ""
    )
      throw new Error(
        "Algunos campos se encuentran vacios, por favor rellenarlos"
      );

    const [rows] = await pool.query(`INSERT INTO productos set ?`, [req.body]);
    res.json({
      id: rows.insertId,
      id_producto,
      nombre,
      precio,
      observaciones,
      id_calidad,
      imagen,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id_producto = req.params.numId;
  const sqlQuery = "DELETE FROM productos WHERE id_producto = ?";
  try {
    const [result] = await pool.query(sqlQuery, [id_producto]);
    if (result.affectedRows < 0)
      return res.status(404).json({ message: `Prodcuto no encontrado` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const id_producto = req.params.numId;
  const { nombre, precio, observaciones, id_calidad, imagen } = req.body;
  const sqlQuery = `UPDATE productos SET nombre = ?, precio = ?, calidad = ?
                      observaciones = ?, id_calidad = ?, imagen = ? WHERE id_producto = ?`;
  try {
    const [result] = await pool.query(sqlQuery, [
      nombre,
      precio,
      observaciones,
      id_calidad,
      imagen,
      id_producto,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Prodcuto no encontrado" });
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id_producto]
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
