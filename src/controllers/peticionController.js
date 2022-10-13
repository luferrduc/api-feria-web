import { pool } from "../db/database.js";

// GETs
export const getPeticiones = async (req, res) => {
    const sqlQuery = `SELECT * FROM peticion`;
    try{
        const result = await pool.query(sqlQuery);
        res.json(result[0]);
    }catch (error){
        res.json({ message: error});
    }
};

export const getOnePeticion= async (req, res) => {
    const id_peticion = req.params.petId;
    const sqlQuery = `SELECT * peticion WHERE id_peticion = ?`;
    try{
        const [rows] = await pool.query(sqlQuery, [id_peticion]);
        if (rows.length <= 0)
          return res.status(404).json({
            message: `Peticion no encontrada`,
          })  
        res.json(rows[0]);  
    }catch (error){
        res.status(500).json({ message: error.message});
    }
}

// POST
export const addPeticion = async (req, res) =>{
    const{
        id_peticion,
        id_usuario, 
        kilogramos,
        nombre,
        estado,
        locacion
    } = req.body;

    try{
        if(
            id_peticion === "" ||
            id_usuario === "" || 
            kilogramos === "" ||
            nombre === "" ||
            estado === "" ||
            locacion === ""
        )
         throw new Error("Algunos campos se encuentran vacios, por favor rellenarlos");
         
        const [rows] = await pool.query(`INSERT INTO peticion set ?`, [req.body]);
        res.json({
            id: rows.insertId,
            id_peticion,
            id_usuario,
            kilogramos,
            nombre,
            estado,
            locacion
        }); 
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// DELETE
export const deletePeticion = async (req, res) => {
    const id_peticion = req.params.petId;
    const sqlQuery = "DELETE FROM peticion WHERE id_peticion = ?";
    try{
        const[result] = await pool.query(sqlQuery, id_peticion);
        if (result.affectedRows < 0)
          return res.status(404).json({ message: `Petición no encontrada`});
        res.sendStatus(204);    
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

export const updatePeticion = async (req,res) => {
    const id_peticion = req.params.petId;
    const { id_usuario, nombre, kilogramos, estado, locacion } = req.body;
    const sqlQuery = `UPDATE peticion SET  id_ usuario = ?, nombre = ?, kilogramos = ?, 
                        estado = ?, locacion = ? WHERE id_peticion = ?`;
    try{
        const [result] = await pool.query(sqlQuery,[
            id_usuario,
            kilogramos,
            nombre,
            estado, 
            locacion,
            id_peticion
        ]);
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "Petición no encontrada" });
        const [rows] = await pool.query(
            "SELECT * FROM peticion WHERE id_peticion = ?",
            id_peticion
        );  
        res.json(rows[0]);    
    }catch (error){
        res.json({ message: error.message});
    }                    
};