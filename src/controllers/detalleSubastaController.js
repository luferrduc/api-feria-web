import { pool } from "../db/database.js";

export const getDetalleSubasta = (req, res) => {
     const query = "SELECT * FROM detalle_subasta dts JOIN subasta_transporte st WHERE st."
};

export const addDetalleSubasta = (req, res) => {
  const { id_transporte, id_subasta, cargo, precio } = req.body;
};

export const updateDetalleSubasta = (req, res) => {};

export const deleteDetalleSubasta = (req, res) => {};

