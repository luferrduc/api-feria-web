import { pool } from "../db/database.js";

export const getSubastas = async (req, res) => {
    const sqlQuery = `SELECT * FROM subasta_transporte`;
    try{
        const result = await pool.query(sqlQuery);
        res.json(result[0]);
    }catch (error){
        res.error({ message: error})
    }
};

export const getOneSubasta = async (req, res) => {
    const id_subasta = req.params.subId;
    const sqlQuery = `SELECT * subasta_transporte WHERE id_subasta = ?`;
    try{
        const [rows] = await pool.query(sqlQuery, [id_subasta]);
        if (rows.length <= 0)
          return res.status(404).json({
            message: `Subasta no encontrada`,
          })
        res.json(rows[0]);  
    }catch (error){
        res.error({ message: error.message })
    }
};

export const addSubasta = async (req, res ) => {
    const{
        id_subasta,
        ganador,
        fecha_ter,
        fecha_inicio,
        cargo,
        total,
        estado,
        id_venta,
    } = req.body;

    try{
        if(
            id_subasta === "" ||
            ganador === "" ||
            fecha_ter === "" ||
            fecha_inicio === "" ||
            cargo === "" ||
            total === "" ||
            estado === "" ||
            id_venta === "" 
        )
         throw new Error("Algunos campos se encuentran vacios, por favor rellenarlos");
        
        const [rows] = await pool.query(`INSERT INTO subasta_trasporte set ?`, [req.body]);
        res.json({
            id: rows.insertId,
            id_subasta,
            ganador,
            fecha_ter,
            fecha_inicio,
            cargo,
            total,
            estado,
            id_venta
        });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

export const deleteSubasta = async (req, res) => {
    const id_subasta = req.params.subId;
    const sqlQuery = "DELETE FROM subasta_transporte WHERE id_subasta = ?";
    try{
        const[result] = await pool.query(sqlQuery, id_subasta);
        if (result.affectedRows < 0)
          return res.status(404).json({ message: `Subasta no encontrada`});
        res.sendStatus(204); 
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSubasta = async (req, res) => {
    const id_subasta = req.param.subId;
    const { ganador, fecha_ter, fecha_inicio, cargo, total, estado, id_venta } = req.body;
    const sqlQuery = `UPDATE subasta_transporte SET ganador = ?, fecha_ter = ?, fecha_inicio = ?,
                      cargo = ?, total = ?, estado = ?, id_ventas = ?`;
    try{
        const [result] = await pool.query(sqlQuery, [
            ganador,
            fecha_ter,
            fecha_inicio,
            cargo,
            total,
            estado,
            id_venta,
        ]);
        if(result.affectedRows === 0)
         return res.status(404).json({ message: "Subasta no encontrada" });
        const [rows] = await pool.query (
            "SELECT * FROM subasta_transporte WHERE id_subasta = ?",
            id_subasta
        );
        res.json(rows[0]);
    }catch (error){
        res.json({ message: error.message })
    }                  
};