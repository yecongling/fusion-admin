import { Layout, Spin } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 中间主内容区域
 * @returns
 */
const Content: React.FC = () => {
  return (
    <Layout.Content
      className="dis-fl fd-c"
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px',
      }}
    >
      <Suspense
        fallback={
          <div className="dis-fl jc-ct ai-ct" style={{ height: '100vh' }}>
            <Spin size="large" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout.Content>
  );
};
export default Content;
