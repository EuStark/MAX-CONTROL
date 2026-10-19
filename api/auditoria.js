import { hasSession } from "../server/auth.js";
import { ensureSchema, json } from "../server/db.js";
import { randomUUID } from "node:crypto";

export default async function handler(req, res) {
  if (!hasSession(req)) return json(res, 401, { error: "Sessão expirada. Entre novamente." });
  try {
    const db = await ensureSchema();
    if (req.method === "GET") {
      const result = await db.execute("SELECT id, acao, cliente_id, cliente_nome, cnpj, antes, depois, created_at FROM auditoria ORDER BY id DESC LIMIT 200");
      const rows = result.rows.map(row => ({ ...row, cliente: JSON.parse(row.depois || row.antes || "{}") }));
      return json(res, 200, rows);
    }
    if (req.method !== "POST") return json(res, 405, { error: "Método não permitido." });
    const body = req.body || {};
    if (body.acao !== "certificado_impresso") return json(res, 400, { error: "Ação de histórico inválida." });
    const cliente = body.cliente || {};
    await db.execute({
      sql: "INSERT INTO auditoria (acao, cliente_id, cliente_nome, cnpj, depois) VALUES (?, ?, ?, ?, ?)",
      args: ["certificado_impresso", null, String(cliente.nome || ""), String(cliente.cnpj || ""), JSON.stringify({ ...cliente, ...(body.certificado || { servicos: body.servicos || [] }) })],
    });
    return json(res, 201, { id: randomUUID() });
  } catch (error) {
    console.error("Falha na API de auditoria:", error);
    return json(res, 500, { error: error.message || "Falha ao acessar o histórico." });
  }
}
