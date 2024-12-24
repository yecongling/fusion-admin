import SwitchItem from '../SwitchItem';

/**
 * 快捷键
 * @returns
 */
const Shortcut: React.FC = () => {
  return (
    <>
      <SwitchItem title="快捷键" disabled/>
      {/* 全局搜索 */}
      <SwitchItem title="全局搜索" shortcut="⌘ + K" disabled/>
      {/* 退出登录 */}
      <SwitchItem title="退出登录" shortcut="⌥ + Q" disabled/>
      {/* 锁定屏幕 */}
      <SwitchItem title="锁定屏幕" shortcut="⌥ + L" disabled/>
    </>
  );
};
export default Shortcut;
