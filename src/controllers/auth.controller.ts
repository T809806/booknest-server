import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { usersCollection } from "../config/db";
import { User } from "../types/user.types";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    // 1. Get Data From Request Body
    const { name, email, password, photoURL } = req.body;

    // 2. Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // 3. Check Existing User
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create User Object
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      photoURL,
      createdAt: new Date(),
    };

    // 6. Save User
    const result = await usersCollection.insertOne(newUser);

    // 7. Success Response
    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      insertedId: result.insertedId,
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    // 1. Get Data
    const { email, password } = req.body;

    // 2. Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // 3. Find User
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 4. Compare Password
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // 5. Generate JWT
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    // 6. Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};