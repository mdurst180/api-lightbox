// src/controllers/UserController.ts
import { Request, Response } from "express";
import { User } from "../models/User";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.getAll();
  return res.status(200).json(users);
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const user = await User.getById(userId); // If user is not found, it will throw a NotFoundError
  return res.status(200).json(user);
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;
  const user = new User(name.trim(), email.trim());
  await user.save(); // This will throw an error if saving fails
  return res.status(201).json(user);
};
