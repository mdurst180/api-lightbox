import { db } from "../db";
import { usersTable } from "../schemas/schema";
import { Request, Response } from "express";
import logger from '../logger';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    logger.info('Fetching all users');
    const users = await db.select().from(usersTable).execute();
    return res.status(200).json(users);
  } catch (error) {
    logger.error(`Error fetching users.`, error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Internal Server Error" });
  }
}

export const createUser = async (req: Request, res: Response) => {
  console.log("Creating user");
  const { name, email }: { name: string; email: string } = req.body;

  // basic validation
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "validation_error", message: "Name is required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      error: "validation_error",
      message: "Email is missing or invalid",
    });
  }

  try {
    await db.insert(usersTable).values({ name: name.trim(), email: email.trim() });

    return res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    console.log("Error while creating user", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Unable to add" });
  }
};
