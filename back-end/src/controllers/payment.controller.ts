import { Request, Response } from "express";
import transactionModel from "../models/transaction.model";

export const handlePayment = async (req: Request, res: Response) => {
  const body = req.body;
  const orderId = body.order_id;

  try {
    switch (body.transaction_status) {
      case "capture":
      case "settlement":
        await transactionModel.findByIdAndUpdate(orderId, {
          status: "success",
        });
        break;
      case "deny":
      case "cancel":
      case "expire":
      case "failure":
        await transactionModel.findByIdAndUpdate(orderId, {
          status: "failed",
        });
        break;

      default:
        break;
    }

    return res.json({
      message: "Handle Payment Success",
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Handle Payment Failed",
      error,
    });
  }
};
