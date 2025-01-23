import { Card, Segmented, type SegmentedProps, Input } from 'antd';
import { useEffect, useState } from 'react';
import './design.scss';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores/store';
import ProjectCard from './ProjectCard';

const { Search } = Input;

/**
 * 项目设计
 */
const Design: React.FC = () => {
  // 选中的分类
  const [type, setType] = useState<string>('1');
  const { theme } = useSelector((state: RootState) => state.preferences);

  // 分段控制器选项
  const segmentedOptions: SegmentedProps['options'] = [
    {
      label: '全部',
      value: '',
    },
    {
      label: '集成项目',
      value: '1',
    },
    {
      label: '接口项目',
      value: '2',
    },
  ];

  // 项目列表数据
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      name: '项目1',
    },
    {
      id: 2,
      name: '项目2',
    },
    {
      id: 3,
      name: '项目3',
    },
    {
      id: 4,
      name: '项目4',
    },
    {
      id: 5,
      name: '项目5',
    },
    {
      id: 6,
      name: '项目6',
    },
    {
      id: 7,
      name: '项目7',
    },
  ]);

  // 根据类型进行检索
  useEffect(() => {
    queryProject();
  }, [type]);

  /**
   * 查询项目
   * @param projectName 项目名称
   */
  const queryProject = (projectName?: string) => {};

  /**
   * 分段控制器切换
   * @param value 值
   */
  const onSegmentedChange = (value: string) => {
    setType(value);
  };

  return (
    <div className="flex-1 pt-6 pr-6 pl-6 overflow-scroll bg-[#f5f6f7]">
      <div className="mb-[20px] text-[18px] font-bold">项目列表</div>
      {/* 卡片列表和筛选框 */}
      <div className="flex flex-row justify-between mb-[20px]">
        <Segmented<any>
          options={segmentedOptions}
          onChange={onSegmentedChange}
          value={type}
        />
        <div className="w-[300]">
          {/* 检索 */}
          <Search placeholder="请输入检索内容" />
        </div>
      </div>
      {/* 项目列表 */}
      <div className="flex flex-wrap mt-2">
        {/* 新建项目 */}
        <Card
          styles={{ body: { padding: '0px' } }}
          className="projectList addProject"
        >
          <p>
            <PlusOutlined
              className="text-[64px]"
              style={{ color: theme.colorPrimary }}
            />
            <span className="addTitle">新增项目</span>
          </p>
        </Card>
        {/* 项目列表 */}
        {projects.map((item) => (
          <ProjectCard
            key={item.id}
            id={item.id}
            name={item.name}
            cover={item.cover}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};
export default Design;
