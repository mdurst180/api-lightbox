// src/models/User.ts
import { db } from "../db";
import { usersTable } from "../schemas/schema";
import { eq } from "drizzle-orm";
import logger from "../logger";

export class User {
  id: number | null;
  name: string;
  email: string;

  constructor(name: string, email: string, id: number | null = null) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  // Get all users
  static async getAll() {
    try {
      logger.debug("Fetching all users");
      const users = await db.select().from(usersTable).execute();
      return users;
    } catch (error) {
      logger.error("Error fetching all users", error);
      throw new Error("Error fetching all users");
    }
  }

  // Get user by id
  static async getById(userId: number) {
    try {
      const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).execute();
      if (!user.length) {
        throw new Error("User not found");
      }
      return user[0];
    } catch (error) {
      logger.error(`Error fetching user with ID: ${userId}`, error);
      throw error;
    }
  }

  // Save a new user (create)
  async save() {
    try {
      if (this.id) {
        // Update if the user has an ID
        const updatedUser = await db
          .update(usersTable)
          .set({ name: this.name, email: this.email })
          .where(eq(usersTable.id, this.id))
          .returning();
        return updatedUser[0];
      } else {
        // Insert new user if there is no ID
        const newUser = await db
          .insert(usersTable)
          .values({ name: this.name, email: this.email })
          .returning();
        this.id = newUser[0].id;
        return newUser[0];
      }
    } catch (error) {
      logger.error(`Error saving user ${JSON.stringify(this)}`, error);
      throw new Error("Unable to save user");
    }
  }
}
