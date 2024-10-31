import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginMockServer } from 'rspack-plugin-mock/rsbuild';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import path from 'path';

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
        config.additionalData = `@use "${path.resolve(__dirname, 'src/assets/styles/variables.scss')}" as *;`;
      },
    }),
    // mock 插件
    pluginMockServer({
      // 表示拦截以路径/api开头的
      prefix: '/api',
    }),
    // 启动图片压缩
    pluginImageCompress(),
  ],
  // 配置html模板
  html: {
    favicon: path.resolve(__dirname, './src/assets/svg/vite.svg'),
    title: 'fusionAdmin',
  },
  // 配置路径别名
  source: {
    alias: {
      // '@': path.resolve(__dirname, './src'),
      '@views': path.resolve(__dirname, './src/views'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@enums': path.resolve(__dirname, './src/enums'),
      '@context': path.resolve(__dirname, './src/context'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@type': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@router': path.resolve(__dirname, './src/router'),
    },
  },
  dev: {
    // 按需编译
    lazyCompilation: true,
  },
  // 构建产物相关配置
  output: {},
  // 构建优化相关
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      // 下面的部分单独分包
      forceSplitting: {
        axios: /node_modules[\\/]axios/,
        react: /node_modules[\\/]react/,
        antd: /node_modules[\\/]antd/,
        redux: /node_modules[\\/]redux/,
        lodash: /node_modules[\\/]lodash/,
        echarts: /node_modules[\\/]echarts/,
        antdIcons: /node_modules[\\/]@ant-design\/icons/
      }
    },
  },
  // 服务相关
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/integration',
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
