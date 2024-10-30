import { Button, Card, Col, Row, DatePicker } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

/**
 * 首页
 * @returns 组件内容
 */
const Home: React.FC = () => {
  return (
    <>
      <Row gutter={8}>
        <Col span={12}>
          <Card style={{ height: '300px' }}>欢迎</Card>
        </Col>
        <Col span={12}>
          <Card
            style={{ height: '300px' }}
            styles={{ header: { borderBottom: 'none' } }}
            title="快捷菜单"
            extra={
              <Button color="default" variant="filled" size="small">
                配置
              </Button>
            }
          >
            菜单
          </Card>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: '8px' }}>
        <Col span={12}>
          <Card
            style={{ height: '300px' }}
            styles={{ header: { borderBottom: 'none' } }}
            title="引擎状态"
          >
            欢迎
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={{ height: '300px' }}
            styles={{ header: { borderBottom: 'none' } }}
            title="terminal统计"
          >
            菜单
          </Card>
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: '8px' }}>
        <Col span={8}>
          <Card
            style={{ height: '300px' }}
            styles={{ header: { borderBottom: 'none' } }}
            title="请求占比"
          >
            欢迎
          </Card>
        </Col>
        <Col span={16}>
          <Card
            style={{ height: '300px' }}
            styles={{ header: { borderBottom: 'none' } }}
            title="每日消息统计"
            extra={<RangePicker />}
          >
            菜单
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Home;
