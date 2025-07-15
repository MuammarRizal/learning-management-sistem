import { Router } from "express"
import { handlePayment } from "../controllers/payment.controller";

const paymentRoutes = Router();
paymentRoutes.post('/payment-midtrans', handlePayment)

export default paymentRoutes