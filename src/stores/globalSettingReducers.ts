import { createSlice } from "@reduxjs/toolkit";
import { type GlobalSetting, initGlobalSetting } from "./storeState";

// 定义category和key的类型
type Category = keyof GlobalSetting;
type SettingKey<T extends Category> = keyof GlobalSetting[T];

/**
 * 全局设置slice
 */
export const globalSettingSlice = createSlice({
  // Slice名称
  name: "globalSetting",
  // 初始值
  initialState: initGlobalSetting,
  // reducers
  reducers: {
    updateSetting<T extends Category>(
      state: GlobalSetting,
      action: { payload: { category: T; key: SettingKey<T>; value: any } }
    ) {
      const { category, key, value } = action.payload;
      return {
        ...state,
        [category]: {
          ...state[category],
          [key]: value,
        },
      };
    },
  },
});
