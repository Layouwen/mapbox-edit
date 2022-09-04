import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

const getPath = (p) => path.resolve("./src", p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/tile-map": {
        target: "https://tile.locnavi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tile-map/, ""),
      },
    },
  },
  resolve: {
    extensions: [".vue", ".ts", ".js"],
    alias: [
      {
        find: "@/components",
        replacement: getPath("components"),
      },
    ],
  },
});
