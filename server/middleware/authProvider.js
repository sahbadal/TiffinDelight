// middleware/authProvider.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";

const authProvider = async (req, res, next) => {
  const authProviderHeader = req.headers.authorization;

  if (!authProviderHeader || !authProviderHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  const providerToken = authProviderHeader.split(" ")[1];

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
