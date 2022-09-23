import { pool } from "../db/database.js";
import { validationResult } from "express-validator";
// export const getPersons = (req, res) => {
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query("SELECT * FROM persona", (err, rows) => {
//       if (err) return res.send(err);
//       res.json(rows);
//     });
//   });
// };

export const getPersons = async (req, res) => {
  const sqlQuery = `SELECT * FROM persona`;
  try {
    const result = await pool.query(sqlQuery);
    res.json(result[0]);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getOnePerson = (req, res) => {
  req.getConnection((err, conn) => {
    if (err)
      return res.status(500).send("Error en la conexión con la base de datos");
    conn.query(
      "SELECT * FROM persona WHERE num_identificador = ?",
      [req.params.numId],
      (err) => {
        if (err)
          return res
            .status(400)
            .send(
              "Persona no encontrada, intente con un numero identificador válido"
            );
      }
    );
  });
};

// export const addPerson = (req, res) => {
//   console.log(req.body);
//   req.getConnection((err, conn) => {
//     if (err) return res.send(err);
//     conn.query("INSERT INTO persona set ?", [req.body], (err, rows) => {
//       if (err) return res.send(err);
//       res.send("Persona registrada");
//     });
//   });
// };

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
      id: rows.insertId,
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

export const deletePerson = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "DELETE FROM persona WHERE num_identificador = ?",
      [req.params.numId],
      (err, rows) => {
        if (err) return res.send(err);
        res.send("Persona eliminada correctamente");
      }
    );
  });
};

export const updatePerson = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query(
      "UPDATE persona SET ? WHERE num_identificador = ?",
      [req.body, req.params.numId],
      (error, rows) => {
        if (error) return res.send(error);
        res.send("Persona modificada correctamente");
      }
    );
  });
};
