import { Switch } from 'antd';
import type { ReactNode } from 'react';
import './switchItem.scss';

/**
 * 切换组件
 * @returns SwitchItem
 */
const SwitchItem: React.FC<SwitchItemProps> = (props) => {
  const { title, disabled, shortcut, style } = props;
  return (
    <div className="switch-item" style={style}>
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
      {shortcut && (
        <span
          style={{
            opacity: '0.6',
            fontSize: '12px',
            lineHeight: '16px',
            marginLeft: 'auto',
            marginRight: '8px',
          }}
        >
          {shortcut}
        </span>
      )}
      {/* 切换 */}
      <Switch disabled={disabled}/>
    </div>
  );
};
export default SwitchItem;

export interface SwitchItemProps {
  title?: string;
  disabled?: boolean;
  shortcut?: ReactNode | string;
  children?: ReactNode;
  style?: React.CSSProperties;
}
