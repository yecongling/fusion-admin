import { assignRoleUser, getRoleUser } from '@/services/system/role/roleApi';
import {
  CloseOutlined,
  ManOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  type TableProps,
} from 'antd';
import { useEffect, useState } from 'react';
import AddUser from './AddUser';

/**
 * 给角色分配用户
 * @returns
 */
const RoleUserDrawer: React.FC<RoleUserDrawerProps> = ({
  open,
  roleId,
  onCancel,
}) => {
  // 用户表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 添加用户弹窗的打开关闭
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  // 检索表单
  const [form] = Form.useForm();
  // 当前选中的行数据
  const [selRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    if (!open) return;
    // 获取当前角色已经分配的用户
    getRoleUser(roleId).then((res) => {
      // 设置表格数据
      setTableData(res);
    });
  }, [open]);

  /**
   * 定义表格的列
   */
  const columns: TableProps['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      hidden: true,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      width: 80,
      align: 'center',
      hidden: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 80,
      align: 'left',
    },
    {
      title: '实名',
      dataIndex: 'realName',
      width: 80,
      align: 'left',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 80,
      align: 'center',
      render: (text) => {
        return text === 1 ? <ManOutlined /> : <WomanOutlined />;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        return (
          <Button type="link" danger size="small" onClick={() => {}}>
            移除用户
          </Button>
        );
      },
    },
  ];

  /**
   * 表单检索
   * @param values
   */
  const onFinish = (values: any) => {
    console.log('values', values);
  };

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
    selectedRowKeys: selRows.map((item) => item.id),
  };

  /**
   * 打开添加用户弹窗
   */
  const addUser = () => {
    setOpenAddUser(true);
  };

  /**
   * 取消添加用户
   */
  const cancelAddUser = () => {
    setOpenAddUser(false);
  };

  /**
   * 处理确定按钮的点击事件
   */
  const handleOk = () => {};

  return (
    <>
      <Drawer
        title="分配用户"
        width={920}
        open={open}
        closeIcon={false}
        extra={
          <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
        }
        onClose={onCancel}
        classNames={{ footer: 'text-right', body: 'flex flex-col' }}
      >
        <Card>
          <Form form={form} onFinish={onFinish}>
            <Row gutter={12}>
              <Col span={6}>
                <Form.Item
                  className="mb-0"
                  name="username"
                  label="用户名"
                  colon={false}
                >
                  <Input autoFocus allowClear autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  className="mb-0"
                  name="realName"
                  label="姓名"
                  colon={false}
                >
                  <Input allowClear autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  className="mb-0"
                  name="sex"
                  label="性别"
                  colon={false}
                >
                  <Select
                    allowClear
                    options={[
                      { value: '', label: '请选择', disabled: true },
                      { value: 1, label: '男' },
                      { value: 0, label: '女' },
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
        <Card
          className="mt-2 flex-1 min-h-0"
          styles={{ body: { height: '100%' } }}
        >
          <Space>
            <Button type="primary" onClick={addUser} icon={<PlusOutlined />}>
              添加用户
            </Button>
            <Button disabled={selRows.length === 0}>批量操作</Button>
          </Space>
          {/* 表格数据 */}
          <Table
            className="mt-2"
            size="small"
            columns={columns}
            dataSource={tableData}
            bordered
            rowKey="id"
            scroll={{ x: 'max-content' }}
            rowSelection={{ ...rowSelection }}
          />
        </Card>
      </Drawer>
      {/* 添加用户弹窗 */}
      <AddUser
        roleId={roleId}
        open={openAddUser}
        onCancel={cancelAddUser}
        onOk={handleOk}
      />
    </>
  );
};

export default RoleUserDrawer;

export interface RoleUserDrawerProps {
  open: boolean;
  // 角色id
  roleId: string;
  // 点击取消的回调
  onCancel: (e: any) => void;
}
