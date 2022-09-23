import { validationResult } from "express-validator";

export const voidFieldPerson = (req, res, next) => {
    const {
        nombre,
        apellido_p,
        apellido_m,
        direccion,
        pais,
        ciudad,
        num_identificador,
      } = req.body;
    
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
    next();
  };
  