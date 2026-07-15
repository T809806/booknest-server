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
    
    const { name, email, password, photoURL } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      photoURL,
      createdAt: new Date(),
    };

  
    const result = await usersCollection.insertOne(newUser);

   
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
    
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

   
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

  
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

   
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    
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