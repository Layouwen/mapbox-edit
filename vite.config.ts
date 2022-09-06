import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";

const getPath = (p) => path.resolve("./src", p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        TDesignResolver({
          library: "vue-next",
        }),
      ],
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: "vue-next",
        }),
      ],
    }),
  ],
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
        find: "@",
        replacement: getPath("./"),
      },
    ],
  },
});
