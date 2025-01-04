import {
  DeleteOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import useParentSize from '@/hooks/useParentSize';
import {
  App,
  Button,
  Card,
  Col,
  ConfigProvider,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  type TableProps,
} from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import { addRole, editRole, getRoleList } from '@/services/system/role/roleApi';
import RoleInfoModal from './RoleInfoModal';

/**
 * 系统角色维护
 * @returns
 */
const Role: React.FC = () => {
  const { modal } = App.useApp();
  // 检索表单
  const [form] = Form.useForm();
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();
  // 编辑弹窗窗口打开关闭
  const [openEditModal, setOpenEditorModal] = useState<boolean>(false);

  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 当前编辑的行数据
  const [currentRow, setCurrentRow] = useState(null);
  // 表格加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 当前选中的行数据
  const [selRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    // 查询角色数据
    queryRoleData();
  }, []);

  // 表格的列配置
  const columns: TableProps['columns'] = [
    {
      title: '编码',
      width: 160,
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '名称',
      width: 160,
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '类型',
      width: 120,
      dataIndex: 'roleType',
      key: 'roleType',
      align: 'center',
      render(value) {
        switch (value) {
          case 0:
            return '系统角色';
          case 1:
            return '普通角色';
          default:
            return '';
        }
      },
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
    {
      title: '描述',
      width: 160,
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      width: '10%',
      dataIndex: 'action',
      fixed: 'right',
      align: 'center',
      render(_, record) {
        return (
          <Space>
            <Button type="link" size="small" onClick={() => {}}>
              用户
            </Button>
            <Button type="link" size="small">
              授权
            </Button>
            <Dropdown>
              <Button type="link" size="small">
                更多
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  /**
   * 查询角色数据
   * @param params 参数
   */
  const queryRoleData = async (params?: any) => {
    setLoading(true);
    // 获取表单查询条件
    const formCon = params || form.getFieldsValue();
    // 拼接查询条件，没有选择的条件就不拼接
    const queryCondition: Record<string, any> = {};
    for (const item of Object.keys(formCon)) {
      if (formCon[item] || formCon[item] === '') {
        queryCondition[item] = formCon[item];
      }
    }
    // 调用查询
    getRoleList(queryCondition)
      .then((response) => {
        setTableData(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 检索表单提交
  const onFinish = (values: any) => {
    queryRoleData(values);
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
  };

  /**
   * 新增角色
   */
  const onAddRoleClick = () => {
    setCurrentRow(null);
    setOpenEditorModal(true);
  };

  /**
   * 取消
   */
  const onCancel = () => {
    setOpenEditorModal(false);
  };

  /**
   * 点击确定的回调
   * @param roleData 角色数据
   */
  const onEditOk = async (roleData: Record<string, any>) => {
    try {
      if (currentRow == null) {
        // 新增数据
        await addRole(roleData);
      } else {
        // 编辑数据
        await editRole(roleData);
      }
      // 操作成功，关闭弹窗，刷新数据
      setOpenEditorModal(false);
      queryRoleData();
    } catch (error) {
      modal.error({
        title: '操作失败',
        content: `原因：${error}`,
      });
    }
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
                <Form.Item name="roleCode" label="角色编码" colon={false}>
                  <Input autoFocus allowClear autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="roleName" label="角色名称" colon={false}>
                  <Input allowClear autoComplete="off" />
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
        {/* 查询表格 */}
        <Card
          style={{ flex: 1, marginTop: '8px' }}
          styles={{ body: { height: '100%' } }}
          ref={parentRef}
        >
          {/* 操作按钮 */}
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddRoleClick}>
              新增
            </Button>
            <Button type="default" icon={<PlusOutlined />}>
              批量导入
            </Button>
            <Button type="default" danger icon={<DeleteOutlined />}>
              批量删除
            </Button>
          </Space>
          {/* 表格数据 */}
          <Table
            size="small"
            style={{ marginTop: '8px' }}
            bordered
            pagination={false}
            dataSource={tableData}
            columns={columns}
            loading={loading}
            rowKey="id"
            scroll={{ y: height - 128 }}
            rowSelection={{ ...rowSelection }}
          />
        </Card>
      </ConfigProvider>

      {/* 编辑弹窗 */}
      <RoleInfoModal
        visible={openEditModal}
        currentRow={currentRow}
        onCancel={onCancel}
        onOk={onEditOk}
      />
    </>
  );
};
export default Role;
