import { verifyToken } from "../utils/jwtServices.js";
import AppError from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  try {
    let authHeader = req.headers.authorization;
    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError("Invalid Token Format", 401);
    }
    let token = authHeader.split(" ")[1];
    let decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      return next(err);
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid or Expired Token", 401));
    }
    return next(new AppError("Authencation failed-Token Error", 401));
  }
}

export default authMiddleware;
