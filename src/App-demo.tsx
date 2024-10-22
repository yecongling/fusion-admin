import {
  clearCache,
  persistor,
  RootState,
  setColorPrimary,
  setTheme,
} from "@stores/store";
import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// 应用组件，测试redux
const App: React.FC = () => {
  // 触发更新的钩子函数
  const dispatch = useDispatch();
  // 获取数据的钩子函数
  const global = useSelector((state: RootState) => state.global);
  const onClick = () => {
    // 触发更新状态
    dispatch(setTheme("light"));
  };

  const changeColor = () => {
    dispatch(setColorPrimary("#fseaewef"));
  };

  const clear = () => {
    dispatch(clearCache());
    persistor.purge();
  };
  return (
    <div>
      <h1>当前主题是： {global.theme}</h1>
      <Button type="primary" onClick={onClick}>
        修改主题
      </Button>

      <h1>当前主体色是： {global.colorPrimary}</h1>
      <Button type="primary" onClick={changeColor}>
        修改主体色
      </Button>
      <Button type="primary" onClick={clear}>
        清空缓存
      </Button>
    </div>
  );
};

export default App;
