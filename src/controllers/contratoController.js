import { pool } from "../db/database.js";


export const getContratos = async (req, res) => {
    const sqlQuery = `SELECT * FROM contratos`;
    try{
        const result = await pool.query(sqlQuery);
        res.json(result[0]);
    }catch (error){
        res.json({ message: error});
    }
};


export const getOneContrato = async (req, res) => {
    const id_contrato = req.params.conId;
    const sqlQuery = `SELECT * FROM productos WHERE id_contrato = ?`;
    try{
        const [rows] = await pool.query(sqlQuery, [id_contrato]);
        if (rows.length <= 0)
          return res.status(404).json({
            message: `Contrato no encontrado`,
          })  
        res.json(rows[0]);  
    }catch (error){
        res.satus(500).json({ message: error.message});
    }
}

export const addContrato = async (req, res) => {
    const{
        fecha_inicio,
        fecha_termino,
        estado,
        observaciones,
        id_tipo_contrato,
        arch_cont,
        id_persona,
    } = req.body;

    try{
        if (
          fecha_inicio === "" ||
          fecha_termino === "" ||
          estado === "" ||
          observaciones === "" ||
          id_tipo_contrato === "" ||
          arch_cont === "" ||
          id_persona === "" 
        )
        throw new Error ("Alguno de los campos se encuentra vacío");
       
        const [rows] = await pool.query(`INSERT INTO contratos set ?`, [req.body]);
        res.json({
            id: rows.insertId,
            fecha_inicio,
            fecha_termino,
            estado,
            observaciones,
            id_tipo_contrato,
            arch_cont,
            id_persona,
        });
    } catch (error){
        res.status(500).json({ message: error.message });
    }   
};

export const deleteContrato = async (req, res) => {
    const id_contrato = req.params.conId;
    const sqlQuery = "DELETE FROM contratos WHERE id_contrato = ?";
    try{
        const [result] = await pool.query(sqlQuery, id_contrato);
        if(result.affectedRows < 0)
            return res.status(404).json({ message: `Contrato no encontrado` });
        res.sendStatus(204);    
    } catch (error){
        res.status(500).json({ message: error.message })
    }
};

export const updateContrato = async (req,res) => {
    const id_contrato = req.params.numId;
    const { fecha_inicio, fecha_termino, estado, observaciones, id_tipo_contrato, arch_cont, id_calidad } = req.body;
    const sqlQuery = `UPDATE contratos SET fecha_inicio = ?, fecha_termino = ?, estado = ?
                      observaciones = ?, id_tipo_contrato = ?, arch_cont = ?, id_persona = ? WHERE id_contrato = ?`;
    try{
        const [result] = await pool.query(sqlQuery,[
            fecha_inicio,
            fecha_termino,
            estado,
            observaciones,
            id_tipo_contrato,
            arch_cont,
			id_persona,
            id_contrato
        ]);
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "Contrato no encontrado" });
        const [rows] = await pool.query(
            "SELECT * FROM contratos WHERE id_contrato = ?",
            id_contrato
        );  
        res.json(rows[0]);    
    }catch (error){
        res.json({ message: error.message});
    }                    
};