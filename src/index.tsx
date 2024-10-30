import { createRoot } from 'react-dom/client';
import App from './App';
import '@assets/styles/global.scss'; // 引入 Sass 文件
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from '@stores/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';
import { StrictMode } from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
