import jwt from "jsonwebtoken";
import { JWT_SECRET, ADMIN_EMAIL } from "../config/envConfig.js";

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const adminToken = authHeader.split(" ")[1];

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
