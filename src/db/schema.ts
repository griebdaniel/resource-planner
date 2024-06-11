import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  username: text("username").unique(),
  password: text("password"),
  role: text("role"),
});
