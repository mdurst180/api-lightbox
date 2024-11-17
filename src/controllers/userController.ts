// src/controllers/UserController.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import logger from "../logger";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAll();
    return res.status(200).json(users);
  } catch (error) {
    logger.error("Error fetching users.", error);
    return res.status(500).json({ error: "server_error", message: "Error fetching users" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    logger.debug(`Fetching user with ID: ${userId}`);
    const user = await User.getById(userId);
    return res.status(200).json(user);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: "not_found", message: "User not found" });
    }
    logger.error(`Error fetching user with ID: ${userId}`, error);
    return res.status(500).json({ error: "server_error", message: "Error fetching user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email }: { name: string; email: string } = req.body;

  try {
    logger.info(`Creating user with request ${JSON.stringify(req.body)}`);
    const user = new User(name.trim(), email.trim());
    await user.save(); // Save the new user to the database
    logger.info(`Created user ${JSON.stringify(user)} from request ${JSON.stringify(req.body)}`);
    return res.status(201).json(user);
  } catch (error) {
    logger.error(`Error while creating user with request: ${JSON.stringify(req.body)}`, error);
    return res.status(500).json({ error: "server_error", message: "Unable to add user" });
  }
};
