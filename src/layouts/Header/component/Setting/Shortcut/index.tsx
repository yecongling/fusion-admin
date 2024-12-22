import SwitchItem from '../SwitchItem';

/**
 * 快捷键
 * @returns
 */
const Shortcut: React.FC = () => {
  return (
    <>
      <SwitchItem title="快捷键" />
      {/* 全局搜索 */}
      <SwitchItem title="全局搜索" shortcut="⌘ + K" />
      {/* 退出登录 */}
      <SwitchItem title="退出登录" shortcut="⌥ + Q" />
      {/* 锁定屏幕 */}
      <SwitchItem title="锁定屏幕" shortcut="⌥ + L" />
    </>
  );
};
export default Shortcut;
