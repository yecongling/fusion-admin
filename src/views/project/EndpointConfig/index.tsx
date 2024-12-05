import {
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { MyIcon } from '@components/MyIcon';
import {
  Card,
  Col,
  Dropdown,
  Input,
  Row,
  Space,
  Tooltip,
  Tree,
  theme,
} from 'antd';
import type { DataNode } from 'antd/es/tree';
import type React from 'react';
import { ReactNode, useState } from 'react';

const { useToken } = theme;

/**
 * 端点配置模块
 */
const EndpointConfig: React.FC = () => {
  const { token } = useToken();
  // 鼠标hover的节点
  const [hoveredKey, setHoveredKey] = useState<string | null>();
  // 树结构数据
  const [treeData, setTreeData] = useState<ConfigTypeNode[]>([
    {
      title: 'web服务',
      key: 'http',
      type: 'type',
      children: [
        {
          title: 'HTTP',
          key: 'list',
          type: 'isConfig',
          icon: <SettingOutlined />,
        },
        {
          title: 'SOAP',
          key: 'soap',
          type: 'isConfig',
          icon: <MyIcon type="fusion-EMR" />,
        },
      ],
    },
  ]);
  // 树节点选中事件
  const onTreeSelect = (selectedKeys: React.Key[], info: any) => {
    console.log(info);
  };

  /**
   * 树节点渲染
   * @param nodeData 节点数据
   * @returns
   */
  const treeTitleRender = (nodeData: ConfigTypeNode) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onMouseEnter={() => {
        setHoveredKey(nodeData.key as string);
      }}
      onMouseLeave={() => {
        setHoveredKey(null);
      }}
    >
      <span className="tree-title">
        {nodeData.icon && (
          <span className="ant-tree_iconEle" style={{ marginRight: '8px' }}>
            {nodeData.icon as ReactNode}
          </span>
        )}

        <span>{nodeData.title as React.ReactNode}</span>
      </span>
      {hoveredKey === nodeData.key && (
        <Space style={{ marginLeft: '8px' }} size={8}>
          <Tooltip title="编辑">
            <EditOutlined style={{ color: '#fa8c16' }} />
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
    </div>
  );

  // 查询后台返回的数据需要进行处理才能丢给treeData渲染
  return (
    <Row gutter={8} style={{ height: '100%' }}>
      <Col span={6}>
        {/* 左边端点分类 */}
        <Card style={{ height: '100%' }} title="端点分类列表">
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            {/* 检索 */}
            <Input.Search placeholder="请输入名称检索" />
            {/* 树结构 */}
            <Tree
              blockNode
              defaultExpandAll
              treeData={treeData}
              onSelect={onTreeSelect}
              titleRender={treeTitleRender}
            />
          </Space>
        </Card>
      </Col>
      <Col span={18}>
        {/* 右边端点列表 */}
        <Card style={{ flex: 1, minWidth: 0, height: '100%' }}>
          <div>列表</div>
        </Card>
      </Col>
    </Row>
  );
};
export default EndpointConfig;

/**
 * 树节点数据类型
 */
interface ConfigTypeNode extends DataNode {
  // 节点类型（用于区分是分类还是配置）
  type: string;
  children?: ConfigTypeNode[];
}
