import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import { Request, Response } from "express";
import { AuthRequest, SignInType } from "../types/authRequest.type";
import TransactionModel from "../models/transaction.model";
import axios from "axios";
import transactionModel from "../models/transaction.model";
import jwt from "jsonwebtoken";

export const signUpAction = async (req: Request, res: Response) => {
  const MIDTRANS_URL = process.env.MIDTRANS_DEVELOPMENT || "";
  const MIDTRANS_AUTH_STRING = Buffer.from(
    `${process.env.MIDTRANS_SERVER_KEY}:`
  ).toString("base64");
  try {
    const body: AuthRequest = req.body;

    const hashPassword = bcrypt.hashSync(body.password, 12);

    const user = new userModel({
      name: body.name,
      email: body.email,
      password: hashPassword,
      photo: "https://google.com",
      role: "manager",
    });

    // action payment gateway midtrans
    const transaction = new TransactionModel({
      user: user._id,
      price: 2800000,
      email: user.email,
    });

    const dataMidtrans = {
      transaction_details: {
        order_id: transaction._id.toString(),
        gross_amount: transaction.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      callbacks: {
        finish: `${
          process.env.NODE_ENV === "development"
            ? process.env.LOCAL_URL
            : process.env.PRODUCTION_URL
        }/success-checkout`,
      },
    };

    const configMidtrans = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${MIDTRANS_AUTH_STRING}`,
      },
    };

    const midtrans = await axios.post(
      MIDTRANS_URL,
      dataMidtrans,
      configMidtrans
    );
    const resMidtrans = midtrans.data;

    await user.save();
    await transaction.save();

    return res.json({
      message: "Sign Up Success",
      data: {
        email: body.email,
        name: body.name,
        midtrans_payment_url: resMidtrans.redirect_url,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signInAction = async (req: Request, res: Response) => {
  const body: SignInType = req.body;

  try {
    const existingUser = await userModel
      .findOne()
      .where("email")
      .equals(body.email);

    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const comparePassword = bcrypt.compareSync(
      body.password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.json(400).json({
        message: "Email / Password incorrect",
      });
    }

    const isValidUser = await transactionModel.findOne({
      user: existingUser._id,
      status: "success",
    });

    if (existingUser.role !== "student" && !isValidUser) {
      return res.status(400).json({
        message: "User not verified",
      });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Secret Key is Undefined");
    }
    const token = jwt.sign(
      {
        data: {
          id: existingUser._id.toString(),
        },
      },
      secretKey,
      {
        expiresIn: "1 days",
      }
    );

    return res.json({
      message: "User Logged in Success",
      data: {
        name: existingUser.name,
        email: existingUser.email,
        token,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
