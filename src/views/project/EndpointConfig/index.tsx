import { Card, Col, Row } from 'antd';
import React from 'react';

/**
 * 端点配置模块
 */
const EndpointConfig: React.FC = () => {
  return (
    <Row gutter={8} style={{height: '100%' }}>
      <Col span={6}>
        {/* 左边端点分类 */}
        <Card style={{ height: '100%' }}></Card>
      </Col>
      <Col span={18}>
        {/* 右边端点列表 */}
        <Card style={{ flex: 1, minWidth: 0, height: '100%' }}></Card>
      </Col>
    </Row>
  );
};
export default EndpointConfig;
