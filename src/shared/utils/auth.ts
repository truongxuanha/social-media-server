import jwt from "jsonwebtoken";
import { envRequired } from "./env";
import { User } from "@/domain/entities/user.entity";

export const generateToken = (user: Omit<User, "password">) => {
  console.log("Generating token for user:", user);
  return jwt.sign({ id: user.id, role: user.role }, envRequired("JWT_SECRET"), {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, envRequired("JWT_SECRET"), { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, envRequired("JWT_SECRET"));
};
