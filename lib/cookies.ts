import { cookies } from "next/headers";

export function setAuthCookie(token: string) {
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function removeAuthCookie() {
  cookies().set("auth_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}

export function getAuthCookie() {
  return cookies().get("auth_token")?.value;
}
