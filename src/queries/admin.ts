import db from "@/db/drizzle";
import { user } from "@/db/schema";

export async function findUsers() {
  return await db.select().from(user);
}
