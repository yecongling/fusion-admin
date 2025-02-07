import { useEffect, useRef } from 'react';
import LogicFlow from '@logicflow/core';
import { Control, MiniMap, Menu } from '@logicflow/extension';
import '@logicflow/core/dist/index.css';
import '@logicflow/extension/lib/style/index.css';

/**
 * 项目设计界面
 * @returns
 */
const Designer: React.FC = () => {
  // 逻辑流程图对象
  const refContainer = useRef(null);
  const data = {
    // 节点
    nodes: [
      {
        id: '21',
        type: 'rect',
        x: 300,
        y: 100,
        text: 'rect node',
      },
      {
        id: '50',
        type: 'circle',
        x: 500,
        y: 100,
        text: 'circle node',
      },
    ],
    // 边
    edges: [
      {
        type: 'bezier',
        sourceNodeId: '50',
        targetNodeId: '21',
      },
    ],
  };
  useEffect(() => {
    if (!refContainer.current) {
      return;
    }
    const lf = new LogicFlow({
      container: refContainer.current,
      grid: true,
      plugins: [MiniMap, Control, Menu],
    });
    lf.render(data);
    lf.translateCenter();
    (lf.extension.miniMap as MiniMap).show();
  }, []);

  return (
    <div className="w-full flex flex-auto">
      {/* 左边可收缩部分 */}
      <div className="w-[300px] h-full border-r-[1px] border-solid border-[#ddd]">左边列表</div>
      {/* 右边设计部分 */}
      <div className="flex-1 h-full">
        {/* 画布 */}
        <div className="w-full h-full" ref={refContainer} />
      </div>
    </div>
  );
};
export default Designer;
