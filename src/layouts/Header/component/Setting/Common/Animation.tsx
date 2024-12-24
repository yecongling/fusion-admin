import SwitchItem from '../SwitchItem';

const Animation: React.FC = () => {
  return (
    <>
      {/* 页面切换进度条 */}
      <SwitchItem title="页面切换进度条" disabled />
      {/* 页面切换loading */}
      <SwitchItem title="页面切换loading" disabled />
      {/* 页面切换动画 */}
      <SwitchItem title="页面切换动画" disabled />
    </>
  );
};
export default Animation;
