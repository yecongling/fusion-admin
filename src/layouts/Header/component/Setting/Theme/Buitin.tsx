import { BUILTIN_THEME_PRESETS } from "@/enums/constants";

/**
 * 内置主题
 * @returns 
 */
const Buitin: React.FC = () => {
  return (
    <div style={{display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      {
        BUILTIN_THEME_PRESETS.map((item) => {
          return (
            <div key={item.color}>
              <div className="outline-box">

              </div>
              <div>{item.type}</div>
            </div>
          )
        })
      }

    </div>
  );
};
export default Buitin;
