// src/models/User.ts
import { db } from "../db";
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
      throw new NotFoundError("User not found");
    }
    return user[0];
  }

  async save() {
    if (this.id) {
      const updatedUser = await db
        .update(usersTable)
        .set({ name: this.name, email: this.email })
        .where(eq(usersTable.id, this.id))
        .returning();
      return updatedUser[0];
    } else {
      const newUser = await db
        .insert(usersTable)
        .values({ name: this.name, email: this.email })
        .returning();
      this.id = newUser[0].id;
      return newUser[0];
    }
  }
}
