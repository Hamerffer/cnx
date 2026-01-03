// db/queries/user.ts
import { db } from "@/db/db";
import { userTable } from "@/db/schema";

export const saveUser = async (user: any) => {
  await db
    .insert(userTable)
    .values(user)
    .onConflictDoUpdate({
      target: userTable.id,
      set: user,
    });
};

export const getUser = async () => {
  const res = await db.select().from(userTable).limit(1);
  return res[0] ?? null;
};

export const clearUser = async () => {
  await db.delete(userTable);
};
