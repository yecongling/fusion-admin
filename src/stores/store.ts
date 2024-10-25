import { GlobalState, initGlobalState } from './reducers';
import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// 全局 Slice
const globalSlice = createSlice({
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
    // 设置菜单
    setMenus(state: GlobalState, action: PayloadAction<any[]>) {
      state.menus = action.payload;
    },
    // 设置未收缩菜单栏宽度
    setMenuWidth(state: GlobalState, action: PayloadAction<number | string>) {
      state.menuWidth = action.payload;
    },

    // 清空缓存
    clearCache(state: GlobalState) {
      state.theme = 'dark';
      state.collapse = false;
      state.colorPrimary = '#1677ff';
      state.menus = [];
    },
  },
});

// 组合reducer（这里还可以添加其他的reducer）
const rootReducer = combineReducers({
  global: globalSlice.reducer,
});

// 持久化存储配置
const persistConfig = {
  key: 'root',
  storage,
};

// 持久化reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 配置store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// 定义RootState
export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
export const {
  setTheme,
  setCollapse,
  setColorPrimary,
  setMenus,
  clearCache,
  setMenuWidth,
} = globalSlice.actions;
