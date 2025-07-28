import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import { AuthenticatedRequest } from "../types/verifyToken.type";

export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY ?? "";

    const decoded = verify(token, secretKey) as { data: { id: string } };

    const user = await userModel.findById(
      decoded.data.id,
      "_id name email role"
    );
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token or user not found" });
    }

    // Tambahkan data user ke request
    req.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
