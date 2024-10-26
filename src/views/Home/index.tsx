import React from 'react';
import {
  Avatar,
  Calendar,
  Card,
  Col,
  DatePicker,
  Flex,
  Row,
  Statistic,
} from 'antd';
import './home.scss';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import titleBar from '@assets/images/titlebar.jpg';
import dayjs from 'dayjs';
/**
 * 首页
 * @returns 组件内容
 */
const Home: React.FC = () => {
  /**
   *  日历切换
   * @param value
   * @param mode
   */
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <>
      <Row style={{ marginBottom: '8px' }}>
        <Col span={24}>
          <Card
            bordered={false}
            style={{
              backgroundImage: `url(${titleBar})`,
              backgroundSize: 'cover',
            }}
            styles={{ body: { padding: '24px 40px' } }}
          >
            <Row>
              <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar size={100} icon={<UserOutlined />} />
              </Col>
              <Col span={6} style={{ color: '#fff' }}>
                <h1>下午好，欢迎登录</h1>
                <h4>
                  一站式智能集成解决方案，帮助你高效与使用不同协议的不同系统进行无缝集成
                </h4>
              </Col>
              <Col span={10} style={{ color: '#fff' }}>
                这里考虑再加点什么东西
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginBottom: '8px' }}>
        <Col span={24}>
          <Card bordered={false} hoverable>
            <Row style={{ marginBottom: '16px' }}>
              <Col span={4}>
                <h3>今日核心指标</h3>
              </Col>
              <Col offset={16} span={4} style={{ textAlign: 'right' }}>
                <DatePicker variant="borderless" defaultValue={dayjs()} />
              </Col>
            </Row>
            <Row>
              <Flex style={{ width: '100%' }} justify="space-around">
                <Col span={4}>
                  <Statistic
                    title="今日UV"
                    value={11.48}
                    precision={2}
                    suffix="%"
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Col>
                <Col span={4}>
                  <Statistic
                    title="昨日UV"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Col>
                <Col span={4}>
                  <Statistic
                    title="新用户"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Col>
                <Col span={4}>
                  <Statistic
                    title="近7日UV"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Col>
                <Col span={4}>
                  <Statistic
                    title="近30日UV"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Col>
              </Flex>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={8} style={{ marginBottom: '8px' }}>
        <Col span={7}>
          <Card bordered={false} style={{ height: '100%' }}>
            下午好
          </Card>
        </Col>
        <Col span={7}>
          <Row style={{ marginBottom: '8px', height: 'calc(50% - 4px)' }}>
            <Col span={24}>
              <Card bordered={false} style={{ height: '100%' }}>
                下午好2
              </Card>
            </Col>
          </Row>
          <Row style={{ height: 'calc(50% - 4px)' }}>
            <Col span={24}>
              <Card bordered={false} style={{ height: '100%' }}>
                下午好3
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Card bordered={false}>这里是一个图表控件</Card>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={14}>
          <Card bordered={false} style={{ height: '100%' }}>
            下午好
          </Card>
        </Col>
        <Col span={10}>
          <Row gutter={8} style={{ marginBottom: '8px' }}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          {/* 日历面板 */}
          <Row>
            <Col span={24}>
              <Card bordered={false}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default Home;
