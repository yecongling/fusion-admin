import { createRoot } from 'react-dom/client';
import App from './App';
import '@assets/styles/global.scss'; // 引入 Sass 文件
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from '@stores/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin, App as AntdApp } from 'antd';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <BrowserRouter>
          <AntdApp style={{ height: '100%' }}>
            <App />
          </AntdApp>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  );
} else {
  console.error('Root element not found');
}
