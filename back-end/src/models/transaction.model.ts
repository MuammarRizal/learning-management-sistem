import mongoose from "mongoose";

const transactionModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Berelasi dengan tabel User dengan mengambil id nya
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionModel);
