# Publicar na Vercel com SQLite hospedado

O projeto usa o Turso, serviço de SQLite/libSQL hospedado, para manter os clientes e o histórico disponíveis entre acessos e dispositivos. A tabela é criada automaticamente na primeira chamada à API.

## Configuração

1. Crie uma conta e um banco no [Turso](https://turso.tech/).
2. Copie a URL do banco e crie um token de autenticação.
3. Importe este projeto na Vercel e mantenha `npm run build` como comando de build e `dist` como diretório de saída.
4. Em **Settings → Environment Variables**, cadastre:
   - `TURSO_DATABASE_URL`: URL do banco, no formato `libsql://...turso.io`.
   - `TURSO_AUTH_TOKEN`: token criado para o banco.
   - `APP_PASSWORD`: senha para entrar no sistema, com pelo menos 12 caracteres.
5. Faça um novo deploy após salvar as variáveis.

O acesso aos dados é feito pelas funções `/api` da Vercel. A senha protege essas rotas; o token do banco fica somente no servidor e não é enviado ao navegador. O histórico registra criação, atualização e exclusão de clientes, além da impressão dos certificados.

Os campos do certificado começam vazios toda vez que a página é aberta. Clientes salvos e o histórico continuam no banco hospedado.
