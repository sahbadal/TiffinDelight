import Provider from "../models/ProviderModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } from "../config/envConfig.js";

// provider register : /api/provider/register
export const registerProvider = async (req, res) => {
  try {
    const { name, email, password, kitchenName } = req.body;

    if (!name || !email || !password || !kitchenName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existProvider = await Provider.findOne({ email });
    if (existProvider) {
      return res
        .status(400)
        .json({ success: false, message: "Provider already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = new Provider({
      name,
      email,
      password: hashedPassword,
      kitchenName,
    });

    await provider.save();

    const providerToken = jwt.sign({ id: provider._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("provider_token", providerToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Provider registered successfully",
      provider: {
        name: provider.name,
        email: provider.email,
        kitchenName: provider.kitchenName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// provider login : /api/provider/login
export const loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const provider = await Provider.findOne({ email });
    if (!provider) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const providerToken = jwt.sign({ id: provider._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("provider_token", providerToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Provider logged in successfully",
      provider: {
        name: provider.name,
        email: provider.email,
        kitchenName: provider.kitchenName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// provider is-auth : /api/provider/is-auth
export const checkProviderAuth = async (req, res) => {
  try {
    // const { providerId } = req.body;
    const provider = await Provider.findById(req.providerId).select(
      "-password"
    );
    return res.status(200).json({ success: true, provider });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// provider logout : /api/provider/logout
export const logoutProvider = async (req, res) => {
  try {
    res.clearCookie("provider_token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    });

    res
      .status(200)
      .json({ success: true, message: "Provider logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
