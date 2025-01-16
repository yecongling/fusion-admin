import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { menuSlice } from "./menuReducers";
import { type Category, preferencesSlice } from "./preferencesReducers";

// 组合reducer（这里还可以添加其他的reducer）
const rootReducer = combineReducers({
  menuState: menuSlice.reducer,
  preferences: preferencesSlice.reducer,
});

// 持久化存储配置
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["menuState"],
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

// 导出菜单的更新函数
export const { setMenus } = menuSlice.actions;

// 导出全局设置的更新函数
export const { updateSetting, resetPreferences, setPreferences } = preferencesSlice.actions;

// 自定义接受三个独立参数的action
export const updatePreferences = (category: Category, key: any, value: any) =>
  updateSetting({ category, key, value });
