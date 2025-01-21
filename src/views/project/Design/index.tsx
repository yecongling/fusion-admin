import { Card, Segmented, type SegmentedProps, Input } from 'antd';
import { useEffect, useState } from 'react';

const { Search } = Input;

/**
 * 项目设计
 */
const Design: React.FC = () => {
  // 选中的分类
  const [type, setType] = useState<string>('');

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
      name: '项目1'
    }
  ]);

  useEffect(() => {
    queryProject();
  }, []);

  /**
   * 查询项目
   * @param projectName 项目名称
   */
  const queryProject = (projectName?: string) => {

  }

  /**
   * 分段控制器切换
   * @param value 值
   */
  const onSegmentedChange = (value: string) => {
    console.log('Value:', value);
  };
  return (
    <Card className="w-full h-full">
      <h2 className="mb-2 text-lg font-bold">项目列表</h2>
      {/* 卡片列表和筛选框 */}
      <div className="flex flex-row justify-between">
        <Segmented<any>
          options={segmentedOptions}
          onChange={onSegmentedChange}
        />
        <div className='w-[300]'>
          {/* 检索 */}
          <Search
            placeholder="请输入检索内容"
          />
        </div>
      </div>
      {/* 项目列表 */}
      <div className='flex flex-wrap mt-2'>
        {projects.map((item) => (
          <div key={item.id} className="w-[300px] h-[200px] mr-4 mb-4">
            <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default Design;
