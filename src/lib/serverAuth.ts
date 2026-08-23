import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getSession() {
  return await getServerSession(authOptions as any);
}

export async function requireRole(
  sessionPromise: Promise<any>,
  roles: string[] | string,
) {
  const session = await sessionPromise;
  if (!session) throw { status: 401, message: "Unauthorized" };
  const role = session.data?.user?.role;
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(role)) throw { status: 403, message: "Forbidden" };
  return session;
}
