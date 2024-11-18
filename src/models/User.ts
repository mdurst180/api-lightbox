// src/models/User.ts
import { db } from "../db";
import logger from "../logger";
import { NotFoundError } from "../middleware/errorNotFound";
import { usersTable } from "../schemas/schema";
import { eq } from "drizzle-orm";


export class User {
  id: number | null;
  name: string;
  email: string;

  constructor(name: string, email: string, id: number | null = null) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  static async getAll() {
    const users = await db.select().from(usersTable).execute();
    return users;
  }

  static async getById(userId: number) {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).execute();
    if (!user.length) {
      logger.error(`No user found for userId ${userId}`);
      throw new NotFoundError("User not found");
    }
    return user[0];
  }

  async save() {
    if (this.id) {
      logger.info(`Updating userId: ${this.id}`);
      const user = await db.select().from(usersTable).where(eq(usersTable.id, this.id)).execute();
      if (!user.length) {
        logger.error(`No user found for userId ${this.id}`);
        throw new NotFoundError("User not found");
      }
      const updatedUser = await db
        .update(usersTable)
        .set({ name: this.name, email: this.email })
        .where(eq(usersTable.id, this.id))
        .returning();
      return updatedUser[0];
    } else {
      logger.info(`Creating new user`);
      const newUser = await db
        .insert(usersTable)
        .values({ name: this.name, email: this.email })
        .returning();
      this.id = newUser[0].id;
      return newUser[0];
    }
  }

  static async deleteById(userId: number) {
    logger.info(`Attempting to delete userId: ${userId}`);
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).execute();

    if (!user.length) {
      logger.error(`No user found for userId ${userId}`);
      throw new NotFoundError("User not found");
    }

    await db.delete(usersTable).where(eq(usersTable.id, userId)).execute();
    logger.info(`User with userId: ${userId} deleted successfully`);
  }
}
