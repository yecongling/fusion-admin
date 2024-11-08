import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { getAllMenus } from '@services/system/menu/menuApi';
import {
  App,
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TableProps,
  theme,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import MenuInfoModal from './MenuInfoModal';

const { useToken } = theme;

/**
 * 系统菜单维护
 */
const Menu: React.FC = () => {
  const { modal } = App.useApp();
  const [form] = Form.useForm();
  // 使用主题
  const { token } = useToken();
  // 编辑弹窗窗口打开关闭
  const [openEditModal, setOpenEditorModal] = useState<boolean>(false);

  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 当前编辑的行数据
  const [currentRow, setCurrentRow] = useState(null);
  // 表达加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 当前选中的行数据
  const [selRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    queryMenuData();
  }, []);

  // 定义表格列
  const columns: TableProps['columns'] = [
    {
      title: '名称',
      width: 160,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '组件',
      width: 160,
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '路径',
      width: 160,
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '类型',
      width: 80,
      dataIndex: 'menuType',
      key: 'menuType',
      align: 'center',
    },
    {
      title: '图标',
      width: 80,
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
    },
    {
      title: '顺序',
      width: 80,
      dataIndex: 'sortNo',
      key: 'sortNo',
      align: 'center',
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
    {
      title: '操作',
      width: '120px',
      dataIndex: 'operation',
      fixed: 'right',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined style={{ color: token.colorPrimary }} />}
              type="text"
              onClick={() => {
                setCurrentRow(record);
                setOpenEditorModal(true);
              }}
            />
            <Tooltip title="添加下级">
              <Button icon={<PlusOutlined />} type="text" onClick={() => {}} />
            </Tooltip>
            <Button danger icon={<DeleteOutlined />} type="text" />
          </Space>
        );
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
  };

  /**
   * 检索表单提交
   * @param values  检索表单条件
   */
  const onFinish = (values: any) => {
    queryMenuData(values);
  };

  /**
   * 查询菜单数据
   */
  const queryMenuData = async (params?: any) => {
    setLoading(true);
    // 获取表单查询条件
    const formCon = params || form.getFieldsValue();
    // 拼接查询条件，没有选择的条件就不拼接
    const queryCondition: Record<string, any> = {};
    Object.keys(formCon).forEach((item: string) => {
      if (formCon[item] || formCon[item] === 0) {
        queryCondition[item] = formCon[item];
      }
    });

    // 调用查询
    getAllMenus(queryCondition)
      .then((response) => {
        setTableData(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * 批量删除选中的菜单
   */
  const deleteBatch = () => {
    modal.confirm({
      title: '批量删除',
      icon: <ExclamationCircleFilled />,
      content: '确定批量删除菜单吗？数据删除后将无法恢复！',
      onOk() {
        console.log('批量删除', selRows);
        // 调用删除接口，删除成功后刷新页面数据
      },
    });
  };

  /**
   * 新增按钮点击
   */
  const addMenu = () => {
    setCurrentRow(null);
    setOpenEditorModal(true);
  };

  /**
   * 关闭编辑弹窗
   */
  const closeEditModal = () => {
    setOpenEditorModal(false);
  };

  /**
   * 弹窗点击确定的回调函数
   * @param menuData 编辑的菜单数据
   */
  const onEditOk = (menuData: Record<string, any>) => {
    // 请求后台进行数据保存（这里需要判定是编辑操作还是新增操作 - 根据currentRow 是否有数据来判定操作状态）
    if (currentRow == null) {
      // 保存数据
    } else {
      // 编辑数据
    }
  };

  return (
    <>
      <Flex vertical flex="auto">
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
              initialValues={{ menu_type: '', status: '' }}
              onFinish={onFinish}
            >
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item name="title" label="菜单名称" colon={false}>
                    <Input autoFocus allowClear autoComplete="off" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="menu_type" label="菜单类型" colon={false}>
                    <Select
                      allowClear
                      options={[
                        { value: '', label: '请选择', disabled: true },
                        { value: 1, label: '一级菜单' },
                        { value: 2, label: '子菜单' },
                        { value: 3, label: '按钮权限' },
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
        <Card style={{ flex: 1, marginTop: '8px' }}>
          {/* 操作按钮 */}
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={addMenu}>
              新增
            </Button>
            <Button type="default" icon={<PlusOutlined />}>
              批量导入
            </Button>
            <Button
              type="default"
              danger
              icon={<DeleteOutlined />}
              disabled={selRows.length === 0}
              onClick={deleteBatch}
            >
              批量删除
            </Button>
          </Space>
          {/* 表格数据 */}
          <Table
            size="small"
            style={{ marginTop: '8px' }}
            bordered
            dataSource={tableData}
            columns={columns}
            loading={loading}
            rowKey="id"
            rowSelection={{ ...rowSelection }}
          />
        </Card>
      </Flex>
      {/* 新增、编辑弹窗 */}
      <MenuInfoModal
        visible={openEditModal}
        currentRow={currentRow}
        onCancel={closeEditModal}
        onOk={onEditOk}
      />
    </>
  );
};
export default Menu;
