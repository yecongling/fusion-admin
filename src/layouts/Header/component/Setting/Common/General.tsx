import SwitchItem from '../SwitchItem';

/**
 * 通用
 * @returns
 */
const General: React.FC = () => {
  return (
    <>
      {/* 语言 */}
      
      {/* 动态标题 */}
      <SwitchItem title="动态标题" />
      {/* 水印 */}
      <SwitchItem title="水印" />
      {/* 定时检查更新 */}
      <SwitchItem title="定时检查更新" />
    </>
  );
};
export default General;
