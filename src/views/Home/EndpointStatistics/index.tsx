import { Card, Col, Row } from 'antd';
import style from './endpointStatistics.module.scss';

const EndpointStatistics: React.FC = () => {
  return (
    <>
      <Row gutter={[24, 32]}>
        <Col span={8}>
          <Card className={style.cardBg} bordered={false}>
            <p>端点统计</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className={style.cardBg} bordered={false}>
            <p>端点统计</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className={style.cardBg} bordered={false}>
            <p>端点统计</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className={style.cardBg} bordered={false}>
            <p>端点统计</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className={style.cardBg} bordered={false}>
            <p>端点统计</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card className={style.cardBg} bordered={false}>
            <p>端点统计</p>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default EndpointStatistics;
