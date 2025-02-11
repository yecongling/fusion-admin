import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
    }),
  ],
  // 配置分包
  build: {
    // 压缩css代码
    cssCodeSplit: true,
    // js代码压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        toplevel: true,
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        // 按文件类型进行拆分文件夹
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
          // 拆分图标库
          'ant-icons': ['@ant-design/icons'],
          echarts: ['echarts'],
          axios: ['axios'],
          logicFlow: ['@logicflow/core','@logicflow/extension'],
        },
      },
    },
  },
  // 配置路径别名解析
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  // css预处理器
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss";`,
      },
    },
  },
  // 服务器配置以及代理
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8090/fusion',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
