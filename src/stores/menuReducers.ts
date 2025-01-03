import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initMenuState, type MenuState } from "./storeState";

// 菜单slice
export const menuSlice = createSlice({
    // slice名称
    name: 'menu',
    // 初始值
    initialState: initMenuState,
    reducers: {
        // 设置菜单
        setMenus(state: MenuState, action: PayloadAction<any[]>) {
            state.menus = action.payload;
        },
    }
})