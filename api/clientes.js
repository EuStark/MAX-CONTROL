import { hasSession } from "../server/auth.js";
import { cleanClient, ensureSchema, json, validateClient } from "../server/db.js";
import { randomUUID } from "node:crypto";

function audit(acao, cliente, antes = null, depois = null) {
  return {
    sql: "INSERT INTO auditoria (acao, cliente_id, cliente_nome, cnpj, antes, depois) VALUES (?, ?, ?, ?, ?, ?)",
    args: [acao, cliente.id, cliente.nome, cliente.cnpj, antes ? JSON.stringify(antes) : null, depois ? JSON.stringify(depois) : null],
  };
}

export default async function handler(req, res) {
  if (!hasSession(req)) return json(res, 401, { error: "Sessão expirada. Entre novamente." });
  try {
    const db = await ensureSchema();
    if (req.method === "GET") {
      const result = await db.execute("SELECT id, nome, cnpj, endereco AS end, cidade AS cid, created_at, updated_at FROM clientes ORDER BY nome COLLATE NOCASE");
      return json(res, 200, result.rows);
    }

    if (req.method === "POST") {
      const cliente = cleanClient(req.body);
      const invalid = validateClient(cliente);
      if (invalid) return json(res, 400, { error: invalid });
      cliente.id = randomUUID();
      try {
        await db.batch([
          { sql: "INSERT INTO clientes (id, nome, cnpj, endereco, cidade) VALUES (?, ?, ?, ?, ?)", args: [cliente.id, cliente.nome, cliente.cnpj, cliente.endereco, cliente.cidade] },
          audit("cliente_criado", cliente, null, cliente),
        ], "write");
      } catch (error) {
        if (/unique|constraint/i.test(error.message)) return json(res, 409, { error: "Já existe um cliente salvo com esse CNPJ. Selecione-o para atualizar." });
        throw error;
      }
      return json(res, 201, cliente);
    }

    const id = String(req.query?.id || "");
    if (!id) return json(res, 400, { error: "Identificador do cliente ausente." });
    const found = await db.execute({ sql: "SELECT id, nome, cnpj, endereco, cidade FROM clientes WHERE id = ?", args: [id] });
    const row = found.rows[0];
    if (!row) return json(res, 404, { error: "Cliente não encontrado." });
    const antes = { id: row.id, nome: row.nome, cnpj: row.cnpj, endereco: row.endereco, cidade: row.cidade };

    if (req.method === "PATCH") {
      const cliente = cleanClient(req.body);
      const invalid = validateClient(cliente);
      if (invalid) return json(res, 400, { error: invalid });
      cliente.id = id;
      try {
        await db.batch([
          { sql: "UPDATE clientes SET nome = ?, cnpj = ?, endereco = ?, cidade = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", args: [cliente.nome, cliente.cnpj, cliente.endereco, cliente.cidade, id] },
          audit("cliente_atualizado", cliente, antes, cliente),
        ], "write");
      } catch (error) {
        if (/unique|constraint/i.test(error.message)) return json(res, 409, { error: "Outro cliente já está salvo com esse CNPJ." });
        throw error;
      }
      return json(res, 200, cliente);
    }

    if (req.method === "DELETE") {
      await db.batch([
        { sql: "DELETE FROM clientes WHERE id = ?", args: [id] },
        audit("cliente_apagado", antes, antes, null),
      ], "write");
      return json(res, 200, { ok: true });
    }
    return json(res, 405, { error: "Método não permitido." });
  } catch (error) {
    console.error("Falha na API de clientes:", error);
    return json(res, 500, { error: error.message || "Falha ao acessar o banco." });
  }
}
