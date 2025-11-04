import jwt from "jsonwebtoken";
import { envRequired } from "./env";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, envRequired("JWT_SECRET"), { expiresIn: "1h" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, envRequired("JWT_SECRET"), { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, envRequired("JWT_SECRET"));
};
