import { Router } from "express";
import { getPaymentLink } from "../controllers/paymentController.js";

const router = Router();

router.post("/", getPaymentLink);

export default router;
