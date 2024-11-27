import { Card, Col, Row } from 'antd';
import type React from 'react';

/**
 * 端点配置模块
 */
const EndpointConfig: React.FC = () => {
  return (
    <Row gutter={8} style={{ height: '100%' }}>
      <Col span={6}>
        {/* 左边端点分类 */}
        <Card style={{ height: '100%' }}>
          <div>分类</div>
        </Card>
      </Col>
      <Col span={18}>
        {/* 右边端点列表 */}
        <Card style={{ flex: 1, minWidth: 0, height: '100%' }}>
          <div>列表</div>
        </Card>
      </Col>
    </Row>
  );
};
export default EndpointConfig;
