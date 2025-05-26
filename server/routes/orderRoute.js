import express from "express";
import authUser from "../middleware/authUser.js";
import authProvider from "../middleware/authProvider.js";
import {
  placeOrderCod,
  getUserOrder,
  getAllOrders,
  placeOrderStripe,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCod);
orderRouter.get("/user", authUser, getUserOrder);
orderRouter.get("/provider", authProvider, getAllOrders);
orderRouter.post("/stripe", authUser, placeOrderStripe);

export default orderRouter;
