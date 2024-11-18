// src/controllers/UserController.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import logger from "../logger";
import { NotFoundError } from "../middleware/errorNotFound";

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

// Create or update a user
export const createOrUpdateUser = async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;
  const id = req.params.userId ? Number(req.params.userId) : null;
  const user = new User(name.trim(), email.trim(), id);
  try {
    await user.save();
  }
  catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: "not_found", message: "User not found" });
    } else {
      return res.status(500).json({ error: "server_error", message: "An unexpected error occurred" });
    }
  }
  return res.status(201).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  try {
    await User.deleteById(userId);
  }
  catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: "not_found", message: "User not found" });
    } else {
      return res.status(500).json({ error: "server_error", message: "An unexpected error occurred" });
    }
  }
  return res.status(204).send();
};