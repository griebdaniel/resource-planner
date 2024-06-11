"use server";

import db from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { redirect } from "next/navigation";
import { User } from "@/types/models";

export async function createUser(userArg: User) {
  await db.insert(user).values(userArg);
}

export async function findUsers() {
  return await db.select().from(user);
}

export async function deleteUser(username: string) {
  if (username === null) {
    await db.delete(user).where(isNull(user.username));
  } else {
    await db.delete(user).where(eq(user.username, username));
  }
}

export async function authenticate(username: string, password: string) {
  const res = await db
    .select()
    .from(user)
    .where(and(eq(user.username, username), eq(user.password, password)));

  if (res.length > 0) {
    const sessionData = { username, role: res[0].role };
    const token = await new SignJWT(sessionData)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.SESSION_SECRET));

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });

    return { user: res[0].username, role: res[0].password };
  }

  return null;
}

export async function signOut() {
  cookies().set("session", "");

  redirect("/login");
}
