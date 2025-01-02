import type { BasicOptions } from '@/types/global';
import SelectItem from '../SelectItem';
import SwitchItem from '../SwitchItem';

const modeItems: BasicOptions[] = [
  {
    label: 'static',
    value: 'static',
  },
  {
    label: 'fixed',
    value: 'fixed',
  },
  {
    label: 'auto',
    value: 'auto',
  },
  {
    label: 'autoScroll',
    value: 'autoScroll',
  },
];

/**
 * 顶栏
 */
const Header = () => {
  return (
    <>
      {/* 显示顶栏 */}
      <SwitchItem title="显示顶栏" />
      {/* 模式 */}
      <SelectItem title="模式" items={modeItems} />
    </>
  );
};
export default Header;
