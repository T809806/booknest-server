import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import verifyToken from "../middleware/verifyToken";

const router = Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route",
    user: (req as any).user,
  });
});

export default router;