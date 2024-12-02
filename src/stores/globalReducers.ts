import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState, initGlobalState } from "./reducers";

// 全局 Slice
export const globalSlice = createSlice({
    // slice名称
    name: 'global',
    // 初始状态
    initialState: initGlobalState,
    // reducer
    reducers: {
      // 设置主题
      setTheme(state: GlobalState, action: PayloadAction<'dark' | 'light'>) {
        state.theme = action.payload;
      },
      // 设置收缩
      setCollapse(state: GlobalState, action: PayloadAction<boolean>) {
        state.collapse = action.payload;
      },
      // 设置主体色
      setColorPrimary(state: GlobalState, action: PayloadAction<string>) {
        state.colorPrimary = action.payload;
      },
      // 设置未收缩菜单栏宽度
      setMenuWidth(state: GlobalState, action: PayloadAction<number | string>) {
        state.menuWidth = action.payload;
      },
  
      // 设置屏幕锁定
      setScreenLock(state: GlobalState, action: PayloadAction<boolean>) {
        state.screenLock = action.payload;
      },
  
      // 清空缓存
      clearCache(state: GlobalState) {
        state.theme = 'light';
        state.collapse = false;
        state.colorPrimary = '#1677ff';
      },
    },
  });