import { Router } from "express";

import {
  getDetalleSubastasBySubastaID,
  getDetalleSubastasByTransporteID,
  getDetalleSubastasBySubTransID,
  addDetalleSubasta,
} from "../controllers/detalleSubastaController.js";

const router = Router();

router
  .get("/subasta/:subId", getDetalleSubastasBySubastaID)
  .get("/transporte/:transId", getDetalleSubastasByTransporteID)
  .get("/:subId/:transId", getDetalleSubastasBySubTransID)
  .get("/")
  .post("/", addDetalleSubasta)
  .put("/")
  .delete("/");

export default router;
