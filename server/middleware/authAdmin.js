import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} from "../config/envConfig.js";

const authAdmin = async (req, res, next) => {
  const { adminToken } = req.cookies;
  if (!adminToken) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const tokenDecode = jwt.verify(adminToken, JWT_SECRET);
    if (tokenDecode.email === ADMIN_EMAIL) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default authAdmin;
