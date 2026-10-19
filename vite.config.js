import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// viteSingleFile embute JS/CSS no HTML, então o vite.html abre com duplo clique (file://).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "./",
});
