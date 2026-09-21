import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken, validAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (!validAdminCredentials(username, password)) return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, await createAdminToken(username), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
