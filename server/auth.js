import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "cert_session";
const maxAge = 60 * 60 * 12;

function signature(timestamp) {
  return createHmac("sha256", process.env.APP_PASSWORD || "").update(timestamp).digest("hex");
}

export function hasSession(req) {
  const password = process.env.APP_PASSWORD;
  if (!password) return false;
  const raw = req.headers.cookie || "";
  const value = raw.split(";").map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  if (!value) return false;
  const [timestamp, received] = value.split(".");
  if (!timestamp || !received || !/^\d+$/.test(timestamp)) return false;
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (age < 0 || age > maxAge) return false;
  const expected = signature(timestamp);
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function sessionCookie() {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${cookieName}=${timestamp}.${signature(timestamp)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${cookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secure}`;
}

export function passwordConfigured() {
  return Boolean(process.env.APP_PASSWORD && process.env.APP_PASSWORD.length >= 12);
}
