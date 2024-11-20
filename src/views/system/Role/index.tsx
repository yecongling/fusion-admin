import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import React from 'react';

/**
 * 系统角色维护
 * @returns
 */
const Role: React.FC = () => {
  // 检索表单
  const [form] = Form.useForm();

  // 检索表单提交
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      {/* 菜单检索条件栏 */}
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
          },
        }}
      >
        <Card>
          <Form
            form={form}
            initialValues={{ menuType: '', status: '' }}
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item name="name" label="角色名称" colon={false}>
                  <Input autoFocus allowClear autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="status" label="状态" colon={false}>
                  <Select
                    allowClear
                    options={[
                      { value: '', label: '请选择', disabled: true },
                      { value: 1, label: '正常' },
                      { value: 0, label: '停用' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  >
                    检索
                  </Button>
                  <Button
                    type="default"
                    icon={<RedoOutlined />}
                    onClick={() => {
                      form.resetFields();
                    }}
                  >
                    重置
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>
      </ConfigProvider>
    </>
  );
};
export default Role;
