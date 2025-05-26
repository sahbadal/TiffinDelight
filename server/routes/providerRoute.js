import express from "express";
import {
  registerProvider,
  loginProvider,
  logoutProvider,
  checkProviderAuth,
} from "../controllers/providerController.js";
import authProvider from "../middleware/authProvider.js";

const providerRouter = express.Router();

providerRouter.post("/register", registerProvider);
providerRouter.post("/login", loginProvider);
providerRouter.get("/is-auth", authProvider, checkProviderAuth);
providerRouter.get("/logout", authProvider, logoutProvider);

export default providerRouter;
