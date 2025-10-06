import jwt from "jsonwebtoken";
import AppError from "./ErrorHandler.js";

const jwtSecret = process.env.JWT_SECRET || "jwt_secret";
const jwtExpires = process.env.JWT_EXPIRES || "1d";

export function generateToken(payload) {
  try {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpires });
  } catch (err) {
    console.log(err);
    throw new AppError("Internal server error", 500);
  }
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new AppError("Invalid or Expired token", 401);
    }
    throw new AppError("Internal server error", 500);
  }
}
