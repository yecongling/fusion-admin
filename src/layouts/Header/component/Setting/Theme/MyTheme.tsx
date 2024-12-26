import { THEME_PRESET } from '@/enums/constants';
import "./theme.scss";

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
      }}
    >
      {THEME_PRESET.map((item) => {
        return (
          <div
            key={item.name}
            style={{
              width: '100%',
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
                className="outline-box-active outline-box"
              >
                {item.icon}
              </div>
              <div>{item.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MyTheme;
