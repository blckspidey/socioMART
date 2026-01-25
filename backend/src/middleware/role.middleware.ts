import { Response, NextFunction } from "express";

export const requireRole = (role: "customer" | "seller" | "admin") => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
