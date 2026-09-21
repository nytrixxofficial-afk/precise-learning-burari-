import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "replace-this-secret-before-deploying");
export const ADMIN_COOKIE = "precise_admin";

export async function createAdminToken(username: string) {
  return new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifyAdminToken(token: string | undefined) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function validAdminCredentials(username: string, password: string) {
  return username === (process.env.ADMIN_USERNAME || "admin") && password === (process.env.ADMIN_PASSWORD || "precise2026");
}
