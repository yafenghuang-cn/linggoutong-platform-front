import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      port: 8000,
      open: true,
      host: "0.0.0.0",
      strictPort: false,
      cors: true,
      proxy: {
        [`/${env.VITE_APP_BASE_API || "api"}`]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => {
            const apiPrefix = env.VITE_APP_BASE_API || "api";
            return path.replace(new RegExp(`^/${apiPrefix}`), "");
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      // 优化模块解析
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    css: {
      preprocessorOptions: {
        scss: { api: "modern-compiler" },
      },
    },
  };
});
