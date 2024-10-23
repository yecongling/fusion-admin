import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginMockServer } from "rspack-plugin-mock/rsbuild";
import path from "path";

export default defineConfig({
  plugins: [
    // 表示将react和router相关的包拆分为单独的chunk
    pluginReact({
      splitChunks: {
        react: true,
        router: true,
      },
    }),
    pluginSass({
      // sass文件默认注入全局的变量文件
      sassLoaderOptions(config) {
        config.additionalData = `@use "@assets/styles/variables.scss";`;
      },
    }),
    // mock 插件
    pluginMockServer({
      // 表示拦截以路径/api开头的
      prefix: "/api",
    }),
  ],
  // 配置使用html模板
  html: {
    template: path.resolve(__dirname, "./public/index.html"),
  },
  // 配置路径别名
  source: {
    alias: {
      "@views": path.resolve(__dirname, "./src/views"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@enums": path.resolve(__dirname, "./src/enums"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@type": path.resolve(__dirname, "./src/types"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@router": path.resolve(__dirname, "./src/router")
    },
  },
  dev: {
    // 按需编译
    lazyCompilation: true
  },
  // 服务相关
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:8080/integration",
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
