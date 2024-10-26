import { Layout } from 'antd';
import React from 'react';
import LeftMenu from './LeftMenu';
import Header from './Header';
import Content from './Content';

/**
 * 系统整体布局
 */
const Layouts: React.FC = () => {
  return (
    <>
      <Layout style={{ height: '100%' }}>
        {/* 左边菜单区域 */}
        <LeftMenu />
        <Layout>
          {/* 顶部区域 */}
          <Header />
          {/* 中间主内容区域 */}
          <Content />
        </Layout>
      </Layout>
    </>
  );
};
export default Layouts;
