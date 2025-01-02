/**
 * 全局的状态（如系统设置、主题等）
 */

export interface GlobalState {
  // 主题
  theme: 'dark' | 'light';
  // 侧边栏收缩
  collapse: boolean;
  // 侧边栏未收缩下的宽度
  menuWidth: number | string;
  // 默认颜色
  colorPrimary: string;
  // 是否展开锁屏
  screenLock: boolean;
}

// 定义初始全局状态
export const initGlobalState: GlobalState = {
  // 主题
  theme: 'light',
  // 侧边栏是否收缩
  collapse: false,
  menuWidth: 220,
  // 系统默认主体色
  colorPrimary: '#1677ff',
  // 默认不锁屏
  screenLock: false,
};

// 菜单状态（独立出来，不做持久化）
export interface MenuState {
  // 菜单
  menus: any[];
}

export const initMenuState: MenuState = {
  // 菜单
  menus: [],
};