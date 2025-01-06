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

    /**
     * 设置整个状态对象（针对后续状态对象跟着操作员走，存储于数据库中）
     * @param state 原有状态
     * @param action 整个状态对象
     * @returns 新的对象
     */
    setPreferences(state: Preferences, action: { payload: Preferences }) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
