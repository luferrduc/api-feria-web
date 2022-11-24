import { createPayment } from "../services/paymentService.js";

export const getPaymentLink = async (req, res) => {
  try {
    const payment = await createPayment(req, res);
    res.json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create payment" });
  }
};
