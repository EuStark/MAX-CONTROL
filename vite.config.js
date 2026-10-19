import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Mantém o front-end em um único index.html para a publicação estática.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "./",
});
