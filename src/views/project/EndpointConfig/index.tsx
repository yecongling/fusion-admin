import {
  AppstoreAddOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { MyIcon } from '@/components/MyIcon';
import {
  addEndpointType,
  queryEndpointConfigType,
  updateEndpointType,
} from '@/services/project/endpointTypeConfig/endpointTypeApi';
import { addIcon } from '@/utils/utils';
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Empty,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
  Tree,
  theme,
} from 'antd';
import type { DataNode } from 'antd/es/tree';
import type React from 'react';
import { useEffect, useState } from 'react';
import EndpointTypeModal from './EndpointTypeModal';

const { useToken } = theme;

/**
 * 端点配置模块
 */
const EndpointConfig: React.FC = () => {
  const { token } = useToken();
  // 鼠标hover的节点
  const [hoveredKey, setHoveredKey] = useState<string | null>();
  // 树结构数据
  const [treeData, setTreeData] = useState<ConfigTypeNode[]>([]);
  // 树结构展开的节点
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  // 类型编辑窗口
  const [openTypeModal, setOpenTypeModal] = useState<boolean>(false);
  // 当前编辑的类型数据
  const [typeData, setTypeData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    queryData();
  }, []);

  /**
   * 检索
   * @param params 参数
   */
  const queryData = (params?: string) => {
    // 调用查询
    queryEndpointConfigType(params).then((response) => {
      // 内部数据需要进行处理，其中的icon需要处理成对应的组件
      const expanded: string[] = [];
      const data = transformData(response, expanded);
      setTreeData(data);
      setExpandedKeys(expanded);
    });
  };

  /**
   * 数据转换，处理其中的icon
   * @param data 数据
   */
  const transformData = (data: any[], expanded: string[]): any[] => {
    return data.map((item: any) => {
      // 转为树节点需要的key
      item.key = item.id;
      if (item.icon) {
        item.icon =
          item.icon.indexOf('fusion') > -1 ? (
            <MyIcon type={item.icon} />
          ) : (
            addIcon(item.icon)
          );
      }
      if (item.type === 'type') {
        expanded.push(item.key as string);
      }
      // 分类节点，需要处理children数据
      if (item.children) {
        transformData(item.children, expanded);
      }
      return item;
    });
  };

  /**
   * 类型编辑
   */
  const onEditType = (nodeData: ConfigTypeNode) => {
    setTypeData(nodeData);
    setOpenTypeModal(true);
  };

  /**
   * 树节点渲染
   * @param nodeData 节点数据
   * @returns
   */
  const treeTitleRender = (nodeData: ConfigTypeNode) => (
    <span
      style={{
        display: 'inline-flex',
        justifyContent: 'space-between',
        width: '90%',
      }}
      onMouseEnter={() => {
        setHoveredKey(nodeData.key as string);
      }}
      onMouseLeave={() => {
        setHoveredKey(null);
      }}
    >
      <span className="tree-title">{nodeData.typeName as React.ReactNode}</span>
      {hoveredKey === nodeData.key && (
        <Space style={{ marginLeft: '8px' }} size={8}>
          <Tooltip title="编辑">
            <EditOutlined
              style={{ color: '#fa8c16' }}
              onClick={() => onEditType(nodeData)}
            />
          </Tooltip>
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                { key: 'addSibling', label: '添加同级' },
                { key: 'addSub', label: '添加下级' },
              ],
            }}
          >
            <PlusOutlined style={{ color: token.colorPrimary }} />
          </Dropdown>
          <Tooltip title="更多">
            <EllipsisOutlined />
          </Tooltip>
        </Space>
      )}
    </span>
  );

  // 树节点选中事件
  const onTreeSelect = (selectedKeys: React.Key[], info: any) => {
    console.log(info);
  };

  // 新增分类
  const onAddTypeClick = () => {
    setOpenTypeModal(true);
  };

  /**
   * 类型数据确定
   * @param typeData 类型数据
   */
  const onTypeEditOk = async (typeData: Record<string, any>) => {
    // 请求后台数据保存
    if (typeData.id) {
      // 编辑
      await updateEndpointType(typeData);
    } else {
      // 新增
      await addEndpointType(typeData);
    }
    // 操作成功，关闭弹窗，刷新数据
    setOpenTypeModal(false);
    queryData();
  };

  // 查询后台返回的数据需要进行处理才能丢给treeData渲染
  return (
    <>
      <Row gutter={8} style={{ height: '100%' }}>
        <Col span={6}>
          {/* 左边端点分类 */}
          <Card style={{ height: '100%' }} title="端点分类列表">
            <Space
              direction="vertical"
              size={8}
              style={{ width: '100%', minHeight: 0 }}
              styles={{ item: { flex: 1, overflowY: 'auto' } }}
            >
              {/* 检索 */}
              <Input.Search placeholder="请输入名称检索" autoFocus />
              {/* 树结构 */}
              {/* 如果没有数据则显示为空，手动添加 */}
              {treeData.length === 0 ? (
                <Empty description="暂无分类！">
                  <Button type="primary" onClick={onAddTypeClick}>
                    新增分类
                  </Button>
                </Empty>
              ) : (
                <Tree
                  blockNode
                  showIcon
                  defaultExpandAll
                  expandedKeys={expandedKeys}
                  treeData={treeData}
                  onSelect={onTreeSelect}
                  titleRender={treeTitleRender}
                />
              )}
            </Space>
          </Card>
        </Col>
        <Col span={18}>
          {/* 右边端点列表 */}
          <Card
            style={{ flex: 1, minWidth: 0, height: '100%' }}
            styles={{
              body: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <Row style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Col span={24}>
                <Divider orientation="left">
                  <SettingOutlined style={{ marginRight: '8px' }} />
                  基础信息
                </Divider>
                <Form>
                  <Form.Item label="类型名称">
                    <Input placeholder="请输入类型名称" />
                  </Form.Item>
                </Form>
                <Divider orientation="left">
                  <AppstoreAddOutlined style={{ marginRight: '8px' }} />
                  端点配置
                </Divider>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Divider style={{ margin: '8px 0' }} />
                <Space>
                  <Button>新增</Button>
                  <Button>修改</Button>
                  <Button type="primary">保存</Button>
                  <Button>取消</Button>
                  <Button danger>删除</Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* 类型编辑窗口 */}
      <EndpointTypeModal
        open={openTypeModal}
        onCancel={() => setOpenTypeModal(false)}
        onOk={onTypeEditOk}
        data={typeData}
      />
    </>
  );
};
export default EndpointConfig;

/**
 * 树节点数据类型
 */
interface ConfigTypeNode extends DataNode {
  // 节点类型（用于区分是分类还是配置）
  type: string;
  // 类型名
  typeName: string;
  children?: ConfigTypeNode[];
}
