import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { env } from "../../config/env.js";


export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET!, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET!) as JwtPayload;
};
