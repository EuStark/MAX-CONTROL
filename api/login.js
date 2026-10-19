import { timingSafeEqual } from "node:crypto";
import { clearSessionCookie, hasSession, passwordConfigured, sessionCookie } from "../server/auth.js";
import { json } from "../server/db.js";

export default function handler(req, res) {
  if (req.method === "GET") return json(res, 200, { authenticated: hasSession(req), configured: passwordConfigured() });
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearSessionCookie());
    return json(res, 200, { ok: true });
  }
  if (req.method !== "POST") return json(res, 405, { error: "Método não permitido." });
  if (!passwordConfigured()) return json(res, 503, { error: "Configure APP_PASSWORD com pelo menos 12 caracteres nas variáveis da Vercel." });
  const expected = Buffer.from(process.env.APP_PASSWORD);
  const received = Buffer.from(String(req.body?.password || ""));
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return json(res, 401, { error: "Senha incorreta." });
  res.setHeader("Set-Cookie", sessionCookie());
  return json(res, 200, { authenticated: true });
}
