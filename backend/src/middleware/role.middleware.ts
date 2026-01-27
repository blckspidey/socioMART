import { Response, NextFunction } from "express";

export const requireRole = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }
    next();
  };
};

