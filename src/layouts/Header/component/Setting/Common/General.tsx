import SelectItem from '../SelectItem';
import SwitchItem from '../SwitchItem';
import { SUPPORT_LANGUAGES } from '@/enums/constants';

/**
 * 通用
 * @returns
 */
const General: React.FC = () => {
  return (
    <>
      {/* 语言 */}
      <SelectItem title="语言" items={SUPPORT_LANGUAGES} disabled/>
      {/* 动态标题 */}
      <SwitchItem title="动态标题" disabled/>
      {/* 水印 */}
      <SwitchItem title="水印" disabled/>
      {/* 定时检查更新 */}
      <SwitchItem title="定时检查更新" disabled/>
    </>
  );
};
export default General;
