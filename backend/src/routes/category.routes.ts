import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller";
import { protect } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.post("/", protect, requireRole("seller"), createCategory);
router.get("/", protect, requireRole("seller"), getCategories);

export default router;
