import useParentSize from '@/hooks/useParentSize';
import { userService } from '@/services/system/user/userApi';
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
  Image,
} from 'antd';
import modal from 'antd/es/modal';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

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
  // 数据总条数
  const [total, setTotal] = useState<number>(0);
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();
  // 分页参数
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
  }>({
    pageNum: 1,
    pageSize: 20,
  });

  // 查询用户数据
  useEffect(() => {
    getUserList();
  }, [pagination]);

  // 定义数据查询操作
  const getUserList = () => {
    userService
      .queryUsers({ ...pagination }, { ...form.getFieldsValue() })
      .then((res) => {
        // 设置表格数据
        setTableData(res.data);
        // 设置数据总条数
        res.total && setTotal(res.total);
      });
  };

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
          <ManOutlined className="text-blue-400!" />
        ) : (
          <WomanOutlined className="text-pink-400!" />
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
        return (
          <Image
            src={text}
            preview={false}
            width={30}
            fallback="data:image/png;base64,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"
            className="rounded-full"
          />
        );
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
      align: 'center',
    },
    {
      dataIndex: 'status',
      title: '状态',
      key: 'status',
      width: 60,
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
      width: '10%',
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
      key: 'updatePwd',
      label: '修改密码',
      icon: <EditOutlined className="text-orange-400!" />,
      onClick: () => {},
    },
    {
      key: 'freeze',
      label: '冻结',
      icon: <LockOutlined className="text-orange-400!" />,
      onClick: () => {},
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined className="text-red-400!" />,
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

  /**
   * 分页改变事件
   * @param page 页数
   * @param pageSize 每页数量
   */
  const onPageSizeChange = (page: number, pageSize: number) => {
    setPagination({
      pageNum: page,
      pageSize: pageSize,
    });
  };

  /**
   * 表单检索
   */
  const onFinish = () => {
    getUserList();
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
          <Form form={form} onFinish={onFinish}>
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
          size="small"
          style={{ marginTop: '8px' }}
          bordered
          pagination={{
            pageSize: pagination.pageSize,
            current: pagination.pageNum,
            showQuickJumper: true,
            hideOnSinglePage: false,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            total: total,
            onChange(page, pageSize) {
              onPageSizeChange(page, pageSize);
            },
          }}
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
