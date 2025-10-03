import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);

export default router;
