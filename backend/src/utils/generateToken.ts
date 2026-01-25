import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  role: "customer" | "seller" | "admin";
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
