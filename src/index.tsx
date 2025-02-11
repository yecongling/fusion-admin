import { createRoot } from 'react-dom/client';
import '@/styles/global.scss'; // 引入 Sass 文件
import { BrowserRouter } from 'react-router-dom';
import GlobalConfigProvider from './GlobalConfigProvider';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <GlobalConfigProvider />
    </BrowserRouter>
  );
} else {
  console.error('Root element not found');
}
