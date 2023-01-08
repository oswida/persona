import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  base: "https://oswida.github.io/persona/app/dist/",
  plugins: [vanillaExtractPlugin(), solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
