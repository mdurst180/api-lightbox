import { db } from "../db";
import logger from "../logger";
import { BadRequestError } from "../middleware/badRequestError";
import { NotFoundError } from "../middleware/notFoundError";
import { postsTable, usersTable } from "../schemas/schema";
import { eq } from "drizzle-orm";

export class Post {
  static async getAll() {
    const posts = await db.select().from(postsTable).execute();
    return posts;
  }

  static async getById(postId: number) {
    const post = await db.select().from(postsTable).where(eq(postsTable.id, postId)).execute();
    if (!post.length) {
      logger.error(`No post found for postId ${postId}`);
      throw new NotFoundError("Post not found");
    }
    return post[0];
  }

  static async create({ title, content, user_id }: { title: string; content: string; user_id: number }) {
    // First, check if the user exists
    const user = await db.select().from(usersTable).where(eq(usersTable.id, user_id)).execute();
    if (!user.length) {
      logger.error(`No user found for userId ${user_id}`);
      throw new BadRequestError("User not found");
    }

    logger.info(`Creating new post`);
    const newPost = await db.insert(postsTable).values({ title, content, user_id }).returning();
    return newPost[0];
  }

  static async update({ id, title, content, user_id }: { id: number; title: string; content: string; user_id: number }) {
    // Check if the post exists
    const post = await db.select().from(postsTable).where(eq(postsTable.id, id)).execute();
    if (!post.length) {
      logger.error(`No post found for postId ${id}`);
      throw new NotFoundError("Post not found");
    }

    // Check if the user exists
    const user = await db.select().from(usersTable).where(eq(usersTable.id, user_id)).execute();
    if (!user.length) {
      logger.error(`No user found for userId ${user_id}`);
      throw new BadRequestError("User not found");
    }

    logger.info(`Updating postId: ${id}`);
    const updatedPost = await db.update(postsTable).set({ title, content, user_id }).where(eq(postsTable.id, id)).returning();
    return updatedPost[0];
  }

  static async deleteById(postId: number) {
    logger.info(`Attempting to delete postId: ${postId}`);
    const post = await db.select().from(postsTable).where(eq(postsTable.id, postId)).execute();

    if (!post.length) {
      logger.error(`No post found for postId ${postId}`);
      throw new NotFoundError("Post not found");
    }

    await db.delete(postsTable).where(eq(postsTable.id, postId)).execute();
    logger.info(`Post with postId: ${postId} deleted successfully`);
  }
}
