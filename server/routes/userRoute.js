import express from "express";
import {
  registerUser,
  loginUser,
  checkAuth,
  logoutUser,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/is-auth", authUser, checkAuth);
userRouter.get("/logout", authUser, logoutUser);

export default userRouter;
