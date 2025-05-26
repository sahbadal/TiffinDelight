import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // body nahi
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Failed to decode token" });
  }
};

export default authUser;
