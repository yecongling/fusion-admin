import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { globalSlice } from './globalReducers';
import { menuSlice } from './menuReducers';
import { globalSettingSlice } from './globalSettingReducers';

// 组合reducer（这里还可以添加其他的reducer）
const rootReducer = combineReducers({
  globalState: globalSlice.reducer,
  menuState: menuSlice.reducer,
  globalSetting: globalSettingSlice.reducer
});

// 持久化存储配置
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['menuState']
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
// 持久化store
export const persistor = persistStore(store);
export const {
  setTheme,
  setCollapse,
  setColorPrimary,
  clearCache,
  setMenuWidth,
  setScreenLock,
} = globalSlice.actions;

// 导出菜单的更新函数
export const { setMenus } = menuSlice.actions; 

// 导出全局设置的更新函数
export const { updateSetting } = globalSettingSlice.actions;
