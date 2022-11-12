import { pool } from "../db/database.js";
import { validationResult } from "express-validator";

export const getPersons = async (req, res) => {
  const sqlQuery = `SELECT * FROM persona`;
  try {
    const result = await pool.query(sqlQuery);
    res.json(result[0]);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getOnePerson = async (req, res) => {
  const num_identificador = req.params.numId;
  const sqlQuery = `SELECT * FROM persona WHERE num_identificador = ?`;
  try {
    const [rows] = await pool.query(sqlQuery, [num_identificador]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: `Persona no encontrada`,
      });
    res.json(rows[0]);
  } catch (error) {
    res.satus(500).json({ message: error.message });
  }
};

export const addPerson = async (req, res) => {
  const {
    nombre,
    apellido_p,
    apellido_m,
    direccion,
    pais,
    ciudad,
    num_identificador,
  } = req.body;

  try {
    if (
      nombre === "" ||
      apellido_p === "" ||
      apellido_m === "" ||
      direccion === "" ||
      pais === "" ||
      ciudad === "" ||
      num_identificador === ""
    )
      throw new Error("Alguno de los campos se encuentra vacío");

    const [rows] = await pool.query(`INSERT INTO persona set ?`, [req.body]);
    res.json({
      id_persona: rows.insertId,
      nombre,
      apellido_p,
      apellido_m,
      direccion,
      pais,
      ciudad,
      num_identificador,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePerson = async (req, res) => {
  const num_identificador = req.params.numId;
  const sqlQuery = "DELETE FROM persona WHERE num_identificador = ?";
  try {
    const [result] = await pool.query(sqlQuery, [num_identificador]);
    if (result.affectedRows < 1)
      return res.status(404).json({ message: `Persona no encontrada` });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePerson = async (req, res) => {
  const num_identificador = req.params.numId;
  const { nombre, apellido_p, apellido_m, direccion, pais, ciudad } = req.body;
  const sqlQuery = `UPDATE persona SET nombre = ?, apellido_p = ?, apellido_m = ?,
                    direccion = ?, pais = ?, ciudad = ? WHERE num_identificador = ?`;
  try {
    const [result] = await pool.query(sqlQuery, [
      nombre,
      apellido_p,
      apellido_m,
      direccion,
      pais,
      ciudad,
      num_identificador,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Persona no encontrada" });
    const [rows] = await pool.query(
      "SELECT * FROM persona WHERE num_identificador = ?",
      [num_identificador]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
