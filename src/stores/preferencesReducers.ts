import { createSlice } from "@reduxjs/toolkit";
import type { Preferences } from "./storeState";
import { defaultPreferences } from "@/config/defaultPreferences";

// 定义category和key的类型
export type Category = keyof Preferences;
export type SettingKey<T extends Category> = keyof Preferences[T];

/**
 * 全局设置slice
 */
export const preferencesSlice = createSlice({
  // Slice名称
  name: "preferences",
  // 初始值
  initialState: defaultPreferences,
  // reducers
  reducers: {
    updateSetting(
      state: Preferences,
      action: { payload: { category: Category; key: any; value: any } }
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
    // 重置偏好设置
    resetPreferences() {
      return defaultPreferences;
    },
  },
});
