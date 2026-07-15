import { Router } from "express";

import {
  addBook,
  getAllBooks,
  getSingleBook,
  getMyBooks,
  deleteBook,
} from "../controllers/book.controller";

import verifyToken from "../middleware/verifyToken";

const router = Router();


router.get("/", getAllBooks);
router.get("/my-books", verifyToken, getMyBooks);
router.get("/:id", getSingleBook);

router.post("/add", verifyToken, addBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;