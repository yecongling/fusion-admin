import type { BasicOptions } from '@/types/global';
import { Select } from 'antd';
import classNames from 'classnames';

/**
 * 选择项
 * @returns
 */
const SelectItem: React.FC<SelectItemProps> = (props) => {
  const { title, disabled, placeholder, items } = props;

  return (
    <div
      className={classNames('select-item', {
        'pointer-events-none opacity-50': disabled,
      })}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        {title}
      </span>
      {/* Select组件 */}
      <Select value="" options={items} placeholder={placeholder} />
    </div>
  );
};
export default SelectItem;

export interface SelectItemProps {
  title?: string;
  disabled?: boolean;
  placeholder?: string;
  items?: BasicOptions[];
}
