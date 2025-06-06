import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  changeProductStock,
} from "../controllers/productController.js";
import authProvider from "../middleware/authProvider.js";
import upload from "../config/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(["images"]), authProvider, addProduct);
productRouter.get("/list", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/stock", authProvider, changeProductStock);

export default productRouter;
