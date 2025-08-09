import { NextFunction, Request, Response } from "express";
import categoryModel from "../models/category.model";

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await categoryModel.find();
    return res.json({
      message: "Get All Category Success",
      data,
    });
  } catch (error) {
    console.log({ error });
    return res.json({
      message: "Server internal Error",
      error,
    });
  }
};
