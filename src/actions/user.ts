import db from "@/db/drizzle";
import { user } from "@/db/schema";

export async function createUser(username: string, password: string) {
  return await db.insert(user).values({ username, password });
}

export async function authenticate() {}
