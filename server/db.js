import { createClient } from "@libsql/client";

let client;
let schemaReady;

export function getDb() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("Configure TURSO_DATABASE_URL e TURSO_AUTH_TOKEN nas variáveis da Vercel.");
  }
  if (!client) client = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
  return client;
}

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = getDb().batch([
      `CREATE TABLE IF NOT EXISTS clientes (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        cnpj TEXT NOT NULL UNIQUE,
        endereco TEXT NOT NULL DEFAULT '',
        cidade TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS auditoria (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        acao TEXT NOT NULL,
        cliente_id TEXT,
        cliente_nome TEXT NOT NULL DEFAULT '',
        cnpj TEXT NOT NULL DEFAULT '',
        antes TEXT,
        depois TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
    ], "write").catch(error => { schemaReady = null; throw error; });
  }
  await schemaReady;
  return getDb();
}

export function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8").send(JSON.stringify(body));
}

export function cleanClient(body = {}) {
  return {
    nome: String(body.nome || "").trim(),
    cnpj: String(body.cnpj || "").trim(),
    endereco: String(body.endereco ?? body.end ?? "").trim(),
    cidade: String(body.cidade ?? body.cid ?? "").trim(),
  };
}

export function validateClient(client) {
  if (!client.nome || !client.cnpj) return "Preencha pelo menos a empresa e o CNPJ.";
  if (client.nome.length > 200 || client.cnpj.length > 30 || client.endereco.length > 500 || client.cidade.length > 200) return "Um ou mais campos excedem o tamanho permitido.";
  return null;
}
