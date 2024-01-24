import jwt from "jsonwebtoken";
import User from "../models/user.js";
const SECRET_KEY = "NOTESAPI";

export const authenticateUser = async (req, res, next) => {
  try {
    console.log("req.headers.authorization", req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded?.id) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    req.user = user;
    next();
  } catch (err) {
    throw err;
  }
};
