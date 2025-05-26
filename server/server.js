import express from "express";
import { PORT } from "./config/envConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import providerRouter from "./routes/providerRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();

// Database connection
await connectDB();
// Cloudinary connection
await connectCloudinary();

const allowOrigins = [
  "http://localhost:5173",
  "https://tiffin-delight-nine.vercel.app",
];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: allowOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/provider", providerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});
