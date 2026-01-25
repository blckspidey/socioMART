import { Request, Response } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import { z } from "zod";

/**
 * Zod Schemas
 */
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["customer", "seller"]).optional(), // admin not allowed from frontend
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/**
 * Register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || "customer",
    });

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }

    res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * Login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.issues });
    }

    res.status(500).json({ message: "Login failed" });
  }
};
