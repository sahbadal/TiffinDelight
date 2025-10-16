import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} from "../config/envConfig.js";

//Login Admin: /api/admin/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminToken = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      return res
        .status(200)
        .json({ success: true, message: "Login successful", adminToken });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//admin isauth : /api/admin/is-auth
export const isAdminAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Logout user : /api/user/logout
// export const adminLogout = async (req, res) => {
//   try {
//     res.clearCookie("adminToken", {
//       httpOnly: true,
//       secure: NODE_ENV === "production",
//       sameSite: NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 0,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Logout successful",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
