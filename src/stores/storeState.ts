import { theme } from "antd";
/**
 * 全局的状态（如系统设置、主题等）
 */

export interface GlobalState {
  // 主题
  theme: "dark" | "light";
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
  theme: "light",
  // 侧边栏是否收缩
  collapse: false,
  menuWidth: 220,
  // 系统默认主体色
  colorPrimary: "#1677ff",
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

/**
 * 全局设置（包括上面的GlobalState会改造成下面这个）
 */
export interface GlobalSetting {
  // 外观
  theme: {
    // 布局
    layout: string;
    // 内容
    content: string;
    // 显示侧边栏
    showSidebar: boolean;
  };
  // 布局
  layout?: {
    content?: string;
  };
  // 快捷键
  shortCuts?: {
    // 刷新
    refresh?: string;
  };
  // 通用
  common?: {
    // 锁屏
    screenLock?: boolean;
  };
}

/**
 * 默认全局设置
 */
export const initGlobalSetting: GlobalSetting = {
  // 外观
  theme: {
    // 布局
    layout: "side",
    // 内容
    content: "content",
    // 侧边栏
    showSidebar: true,
  },
};
