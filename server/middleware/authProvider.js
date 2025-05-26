// middleware/authProvider.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";

const authProvider = async (req, res, next) => {
  const providerToken = req.cookies.provider_token;

  if (!providerToken) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(providerToken, JWT_SECRET);
    if (decoded.id) {
      req.providerId = decoded.id;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Failed to decode token" });
  }
};

export default authProvider;
