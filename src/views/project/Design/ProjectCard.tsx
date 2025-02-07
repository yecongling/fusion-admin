import {
  EditOutlined,
  NodeIndexOutlined,
  EllipsisOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Card, Button, Dropdown, type MenuProps } from 'antd';
import './design.scss';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 项目组件
 * @returns
 */
const ProjectCard: React.FC<ProjectCardProps> = memo((props) => {
  const { id, name, onEditProject } = props;
  const navigate = useNavigate();
  /**
   * 下拉菜单
   */
  const dropdownItems: MenuProps['items'] = [
    {
      label: '复制',
      icon: <CopyOutlined className="text-blue-500" />,
      key: 'copy',
      onClick: () => {
        console.log('复制');
      },
    },
    {
      label: '导出',
      icon: <ExportOutlined className="text-orange-400" />,
      key: 'export',
      onClick: () => {
        console.log('导出');
      },
    },
    {
      label: '删除',
      icon: <DeleteOutlined className="text-red-500" />,
      key: 'delete',
      onClick: () => {
        console.log('删除');
      },
    },
  ];

  /**
   * 项目流程设计
   */
  const designProject = () => {
    // 跳转到流程设计界面
    navigate(`/project/designer/${id}`);
  };

  /**
   * 编辑项目
   */
  const editProject = () => {
    onEditProject?.(id);
  };

  return (
    <Card
      key={id}
      styles={{ body: { padding: '0px' } }}
      className="projectList"
    >
      <div className="px-3 pt-[14px] pb-3 h-[50px] flex items-center">
        {name}
      </div>
      <div className="h-[166px] px-3 relative">内容</div>
      <div className="h-10 py-[10px] px-3 text-[12px] text-[#646a73]">底部</div>
      <div className="operateButton">
        <Button className="w-[85px]" icon={<EditOutlined />} onClick={editProject}>
          编辑
        </Button>
        <Button
          className="w-[85px]"
          type="primary"
          icon={<NodeIndexOutlined />}
          onClick={designProject}
        >
          设计
        </Button>
      </div>
      <div className="dropdownItems">
        <Dropdown
          menu={{ items: dropdownItems }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>
    </Card>
  );
});
export default ProjectCard;

/**
 * 项目组件属性
 */
export interface ProjectCardProps {
  /**
   * 项目id
   */
  id: string;
  /**
   * 项目名称
   */
  name: string;
  /**
   * 项目封面
   */
  background?: string;
  /**
   * 项目类型
   */
  type?: number;

  /**
   * 编辑项目
   * @param projectId 项目id
   */
  onEditProject?: (projectId: string) => void;
}
