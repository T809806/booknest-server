import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { booksCollection } from "../config/db";
import { Book } from "../types/book.types";

// =======================
// Add Book
// =======================
export const addBook = async (
  req: Request,
  res: Response
) => {
  try {
    const book: Book = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await booksCollection.insertOne(book);

    return res.status(201).json({
      success: true,
      message: "Book added successfully.",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Add Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================
// Get All Books
// =======================
export const getAllBooks = async (
  req: Request,
  res: Response
) => {
  try {

    const search = String(req.query.search || "");

    const category = String(req.query.category || "");
    const author = String(req.query.author || "");

    const sort = String(req.query.sort || "latest");

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const query: any = {};

    // Search
    if (search) {

      query.title = {
        $regex: search,
        $options: "i"
      };

    }

    // Filter
    if (category) {

      query.category = category;

    }

    if (author) {
  query.author = author;
}

    // Sorting
    let sortOption = {};

    if (sort === "price_asc") {

      sortOption = {
        price: 1
      };

    }

    else if (sort === "price_desc") {

      sortOption = {
        price: -1
      };

    }

    else {

      sortOption = {
        createdAt: -1
      };

    }

    const books = await booksCollection
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await booksCollection.countDocuments(query);

    return res.status(200).json({

      success: true,

      total,

      currentPage: page,

      totalPages: Math.ceil(total / limit),

      books

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error"

    });

  }

};
 

// =======================
// Get Single Book
// =======================
export const getSingleBook = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const book = await booksCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("Get Single Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================
// Delete Book
// =======================
export const deleteBook = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const result = await booksCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};