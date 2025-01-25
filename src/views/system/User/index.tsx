import useParentSize from '@/hooks/useParentSize';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LockOutlined,
  ManOutlined,
  MoreOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  type MenuProps,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Upload,
  type TableProps,
  Dropdown,
} from 'antd';
import modal from 'antd/es/modal';
import type React from 'react';
import { useState } from 'react';

/**
 * 系统用户维护
 * @returns
 */
const User: React.FC = () => {
  const [form] = Form.useForm();
  // 编辑窗口的打开状态
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 当前编辑的行数据
  const [currentRow, setCurrentRow] = useState(null);
  // 表格加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 当前选中的行数据
  const [selRows, setSelectedRows] = useState<any[]>([]);
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();

  // 定义表格列
  const columns: TableProps['columns'] = [
    {
      dataIndex: 'id',
      title: 'ID',
      key: 'id',
      hidden: true,
    },
    {
      dataIndex: 'username',
      title: '用户名',
      key: 'username',
      width: 80,
      align: 'left',
    },
    {
      dataIndex: 'realName',
      title: '真实名',
      key: 'realName',
      width: 80,
      align: 'left',
    },
    {
      dataIndex: 'sex',
      title: '性别',
      key: 'sex',
      width: 40,
      align: 'center',
      render: (text) => {
        return text === 1 ? (
          <ManOutlined className="text-blue-400" />
        ) : (
          <WomanOutlined className="text-pink-400" />
        );
      },
    },
    {
      dataIndex: 'avatar',
      title: '头像',
      key: 'avatar',
      width: 80,
      align: 'center',
      render: (text) => {
        return <img src={text} alt="头像" className="w-8 h-8 rounded-full" />;
      },
    },
    {
      dataIndex: 'birthday',
      title: '生日',
      key: 'birthday',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
      key: 'email',
      width: 80,
      align: 'left',
    },
    {
      dataIndex: 'status',
      title: '状态',
      key: 'status',
      width: 80,
      align: 'center',
      render: (text) => {
        return text === 1 ? (
          <Tag color="green">正常</Tag>
        ) : (
          <Tag color="gray">冻结</Tag>
        );
      },
    },
    {
      title: '操作',
      width: '14%',
      dataIndex: 'action',
      fixed: 'right',
      align: 'center',
      render(_, record) {
        return (
          <Space size={0}>
            <Button type="link" size="small" onClick={() => {}}>
              详情
            </Button>
            <Button type="link" size="small" onClick={() => {}}>
              编辑
            </Button>
            <Dropdown
              menu={{ items: more(record) }}
              placement="bottom"
              trigger={['click']}
            >
              <Button type="link" size="small" icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  // 更多操作中的选项
  const more: (row: any) => MenuProps['items'] = (row) => [
    {
      key: 'edit',
      label: '编辑',
      icon: <EditOutlined className="text-orange-400" />,
      onClick: () => {},
    },
    {
      key: 'updatePwd',
      label: '修改密码',
      icon: <EditOutlined className="text-orange-400" />,
      onClick: () => {},
    },
    {
      key: 'freeze',
      label: '冻结',
      icon: <LockOutlined className="text-orange-400" />,
      onClick: () => {},
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined className="text-red-400" />,
      onClick: () => {
        // 删除选中的行数据
        modal.confirm({
          title: '删除用户',
          icon: <ExclamationCircleFilled />,
          content: '确定删除该用户吗？数据删除后将无法恢复！',
          onOk() {},
        });
      },
    },
  ];

  /**
   * 多行选中的配置
   */
  const rowSelection: TableProps['rowSelection'] = {
    // 行选中的回调
    onChange(_selectedRowKeys, selectedRows) {
      setSelectedRows(selectedRows);
    },
    columnWidth: 32,
    fixed: true,
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
          <Form form={form}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item name="username" label="用户名" colon={false}>
                  <Input autoFocus allowClear autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="sex" label="性别" colon={false}>
                  <Select
                    allowClear
                    options={[
                      { value: '', label: '请选择', disabled: true },
                      { value: 1, label: '男' },
                      { value: 2, label: '女' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="status" label="状态" colon={false}>
                  <Select
                    allowClear
                    options={[
                      { value: '', label: '请选择', disabled: true },
                      { value: 1, label: '启用' },
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
      {/* 查询表格 */}
      <Card
        style={{ flex: 1, marginTop: '8px', minHeight: 0 }}
        styles={{ body: { height: '100%' } }}
        ref={parentRef}
      >
        {/* 操作按钮 */}
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
            新增
          </Button>
          <Upload accept=".xlsx">
            <Button type="default" icon={<PlusOutlined />}>
              批量导入
            </Button>
          </Upload>
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            disabled={selRows.length === 0}
            onClick={() => {}}
          >
            批量删除
          </Button>
        </Space>
        {/* 表格数据 */}
        <Table
          size="middle"
          style={{ marginTop: '8px' }}
          bordered
          pagination={false}
          dataSource={tableData}
          columns={columns}
          loading={loading}
          rowKey="id"
          scroll={{ y: height - 128, x: 'max-content' }}
          rowSelection={{ ...rowSelection }}
        />
      </Card>
    </>
  );
};
export default User;
