import { THEME_PRESET } from '@/enums/constants';
import classNames from 'classnames';
import "./theme.scss";
import SwitchItem from '../SwitchItem';

/**
 * 主题
 * @returns
 */
const MyTheme: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {THEME_PRESET.map((item) => {
        return (
          <div
            key={item.name}
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                cursor: 'pointer',
                flexDirection: 'column',
              }}
              onClick={() => {}}
            >
              <div
                className={classNames('outline-box', {
                  'outline-box-active': item.selected,
                })}
              >
                {item.icon}
              </div>
              <div style={{textAlign: 'center', fontSize: '12px', lineHeight: '16px', color: 'rgb(113, 113, 122)', marginTop: '8px'}}>{item.name}</div>
            </div>
          </div>
        );
      })}
      {/* 深色侧边栏 */}
      <SwitchItem style={{marginTop: '1.5rem'}} title='深色侧边栏'/>
      {/* 深色顶栏 */}
      <SwitchItem title='深色顶栏'/>
    </div>
  );
};
export default MyTheme;
