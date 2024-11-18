import { db } from "../db";
import logger from "../logger";
import { NotFoundError } from "../middleware/notFoundError";
import { postsTable, usersTable } from "../schemas/schema";
import { eq } from "drizzle-orm";


export class User {
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

  static async create({ name, email }: { name: string; email: string; }) {
    logger.info(`Creating new user`);
    const newUser = await db.insert(usersTable).values({ name, email }).returning();
    return newUser[0];
  }

  static async update({ id, name, email }: { id: number; name: string; email: string; }) {
    logger.info(`Updating userId: ${id}`);
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).execute();
    if (!user.length) {
      logger.error(`No user found for userId ${id}`);
      throw new NotFoundError("User not found");
    }
    const updatedUser = await db.update(usersTable).set({ name, email }).where(eq(usersTable.id, id)).returning();
    return updatedUser[0];
  }

  static async deleteById(userId: number) {
    logger.info(`Attempting to delete userId: ${userId}`);
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).execute();

    if (!user.length) {
      logger.error(`No user found for userId ${userId}`);
      throw new NotFoundError("User not found");
    }

    // Delete all posts associated with the user
    await db.delete(postsTable).where(eq(postsTable.user_id, userId)).execute();
    logger.info(`All posts for userId: ${userId} deleted successfully`);

    await db.delete(usersTable).where(eq(usersTable.id, userId)).execute();
    logger.info(`User with userId: ${userId} deleted successfully`);
  }
}
