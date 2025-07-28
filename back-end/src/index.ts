import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.route";
import connectDB from "./utils/database";
import paymentRoutes from "./routes/payment.route";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Buku Bersama API",
  });
});

app.use("/api", paymentRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Environment : ", process.env.NODE_ENV);
});

export default app;
