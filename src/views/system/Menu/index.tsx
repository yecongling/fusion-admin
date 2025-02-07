import {
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  addMenu,
  deleteMenu,
  deleteMenuBatch,
  getAllMenus,
  updateMenu,
} from '@/services/system/menu/menuApi';
import {
  App,
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  type TableProps,
  Tag,
  Upload,
} from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import MenuInfoModal from './MenuInfoModal';
import './menu.scss';
import useParentSize from '@/hooks/useParentSize';
import { addIcon } from '@/utils/utils';

/**
 * 系统菜单维护
 */
const Menu: React.FC = () => {
  const { modal } = App.useApp();
  const [form] = Form.useForm();
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
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();

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
      width: 140,
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '路径',
      width: 140,
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '类型',
      width: 80,
      dataIndex: 'menuType',
      key: 'menuType',
      align: 'center',
      render(value) {
        switch (value) {
          case 0:
            return '目录';
          case 1:
            return '子菜单';
          default:
            return '';
        }
      },
    },
    {
      title: '图标',
      width: 80,
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      render(value) {
        return addIcon(value);
      },
    },
    {
      title: '序号',
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
      render(value) {
        if (value === 1) {
          return <Tag color="green">启用</Tag>;
        }
        return <Tag color="gray">停用</Tag>;
      },
    },
    {
      title: '操作',
      width: '10%',
      dataIndex: 'operation',
      fixed: 'right',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Space size={0}>
            <Button
              size="small"
              type="link"
              style={{ color: '#fa8c16' }}
              onClick={() => {
                setCurrentRow(record);
                setOpenEditorModal(true);
              }}
            >
              修改
            </Button>
            <Button
              size="small"
              variant="link"
              color="danger"
              onClick={() => delMenu(record.id)}
            >
              删除
            </Button>
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
    columnWidth: 32,
    fixed: true,
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
    for (const item of Object.keys(formCon)) {
      if (formCon[item] || formCon[item] === 0) {
        queryCondition[item] = formCon[item];
      }
    }

    // 调用查询
    getAllMenus(queryCondition)
      .then((response) => {
        // 内部数据需要处理，内部的children如果没有数据，需要转变为null
        const data = transformMenuData(response);
        setTableData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * 转换菜单数据，children没有数据的转换为null
   * @param data
   */
  const transformMenuData = (data: any) => {
    return data.map((item: any) => {
      if (!item.children || item.children.length === 0) {
        item.children = null;
      } else {
        item.children = transformMenuData(item.children);
      }
      return item;
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
        // 调用删除接口，删除成功后刷新页面数据
        deleteMenuBatch(selRows.map((item: any) => item.id)).then(() => {
          queryMenuData();
        });
      },
    });
  };

  /**
   * 删除菜单
   * @param id 菜单ID
   */
  const delMenu = (id: string) => {
    modal.confirm({
      title: '删除菜单',
      icon: <ExclamationCircleFilled />,
      content: '确定删除菜单吗？数据删除后将无法恢复！',
      onOk() {
        // 调用删除接口，删除成功后刷新页面数据
        deleteMenu(id).then(() => {
          queryMenuData();
        });
      },
    });
  };

  /**
   * 新增按钮点击
   */
  const onAddMenuClick = () => {
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
  const onEditOk = async (menuData: Record<string, any>) => {
    // 请求后台进行数据保存
    try {
      if (currentRow == null) {
        // 新增数据
        await addMenu(menuData);
      } else {
        // 编辑数据
        await updateMenu(menuData);
      }
      // 操作成功，关闭弹窗，刷新数据
      closeEditModal();
      queryMenuData();
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
                <Form.Item name="name" label="菜单名称" colon={false}>
                  <Input autoFocus allowClear autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="menuType" label="菜单类型" colon={false}>
                  <Select
                    allowClear
                    options={[
                      { value: '', label: '请选择', disabled: true },
                      { value: 0, label: '一级菜单' },
                      { value: 1, label: '子菜单' },
                      { value: 2, label: '按钮权限' },
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
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddMenuClick}
          >
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
            onClick={deleteBatch}
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
          scroll={{ y: height - 128 }}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

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
