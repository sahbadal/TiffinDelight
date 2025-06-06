import express from "express";
import {
  adminLogout,
  isAdminAuth,
  loginAdmin,
} from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/is-auth", authAdmin, isAdminAuth);
adminRouter.get("/logout", adminLogout);

export default adminRouter;
