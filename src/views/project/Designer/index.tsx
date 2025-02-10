import { useEffect, useRef } from 'react';
import LogicFlow from '@logicflow/core';
import { Control, MiniMap, Menu } from '@logicflow/extension';
import '@logicflow/core/lib/style/index.css';
import '@logicflow/extension/lib/style/index.css';
import { useNavigate } from 'react-router-dom';
import './designer.scss';

/**
 * 项目设计界面
 * @returns
 */
const Designer: React.FC = () => {
  const navigate = useNavigate();
  // 逻辑流程图对象
  const refContainer = useRef(null);
  const lf = useRef<LogicFlow>();
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
    lf.current = new LogicFlow({
      container: refContainer.current,
      grid: false,
      plugins: [MiniMap, Control, Menu],
    });
    // 移除撤销控制功能
    (lf.current.extension.control as Control).removeItem('undo');
    (lf.current.extension.control as Control).removeItem('redo');
    // 添加控制选项
    (lf.current.extension.control as Control).addItem({
      text: '返回',
      key: 'return',
      title: '返回',
      iconClass: 'lf-control-undo',
      onClick: () => {
        navigate('/project/design');
      },
    });

    lf.current.render(data);
    lf.current.translateCenter();
    (lf.current.extension.miniMap as MiniMap).show();
  }, []);

  /**
   * 鼠标按下时进行拖拽行为的绑定
   * @param e
   */
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const type = (e.target as HTMLElement).getAttribute('data-type');
    if (type) {
      lf.current?.dnd.startDrag({
        type,
        text: `${type}节点`,
      });
    }
  };

  return (
    <div className="w-full flex flex-auto">
      {/* 左边可收缩部分 */}
      <div
        className="w-[300px] h-full border-r-[1px] border-solid border-[#ddd] fixed z-20"
        onMouseDown={onMouseDown}
      >
        左边列表，可收缩
      </div>
      {/* 右边设计部分 */}
      <div className="w-full h-full">
        {/* 画布 */}
        <div className="w-full h-full" ref={refContainer} />
      </div>
    </div>
  );
};
export default Designer;
