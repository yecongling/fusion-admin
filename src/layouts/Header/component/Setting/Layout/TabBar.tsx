import SelectItem from '../SelectItem';
import SwitchItem from '../SwitchItem';

/**
 * 标签栏
 */
const TabBar: React.FC = () => {
  return (
    <>
      {/* 启用标签栏 */}
      <SwitchItem title="启用标签栏" />
      {/* 持久化标签 */}
      <SwitchItem title="持久化标签" />
      {/* 启动拖拽排序 */}
      <SwitchItem title="启动拖拽排序" />
      {/* 启用纵向滚轮响应 */}
      <SwitchItem title="启用纵向滚轮响应" />
      {/* 显示标签栏图标 */}
      <SwitchItem title="显示标签栏图标" />
      {/* 显示更多按钮 */}
      <SwitchItem title="显示更多按钮" />
      {/* 显示最大化按钮 */}
      <SwitchItem title="显示最大化按钮" />
      {/* 标签页风格 */}
      <SelectItem title="标签页风格" />
    </>
  );
};
export default TabBar;
