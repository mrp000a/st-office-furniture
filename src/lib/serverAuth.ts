import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { UserRole } from "@/generated/prisma";

export async function getSession() {
  return await getServerSession(authOptions as any);
}

export async function getUserId(sessionPromise: Promise<any>) {
  const session = await sessionPromise;
  if (!session) throw { status: 401, message: "Unauthorized, Please Log In" };
  const id = session.user?.id;
  return id;
}

export async function getRole(sessionPromise: Promise<any>) {
  const session = await sessionPromise;
  if (!session) throw { status: 401, message: "Unauthorized, Please Log In" };
  const role = session.user?.role;
  return role;
}

export async function requireRole(
  sessionPromise: Promise<any>,
  roles: UserRole[] | UserRole,
) {
  const session = await sessionPromise;
  if (!session) throw { status: 401, message: "Unauthorized" };
  const role = session.user?.role;
  const allowed = Array.isArray(roles) ? roles : [roles];
  console.log({ role, allowed });
  if (!allowed.includes(role)) throw { status: 403, message: "Forbidden" };
  return session;
}
