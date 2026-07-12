import { Router } from "express";

import {
  addBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
} from "../controllers/book.controller";

import verifyToken from "../middleware/verifyToken";

const router = Router();

// Public Routes
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);

// Protected Routes
router.post("/add", verifyToken, addBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;